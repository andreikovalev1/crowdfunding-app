import React, { useState } from "react";
import styles from "./LoginPage.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../api/authApi";
import { setCredentials } from "../store/slices/authSlice";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
    });
    const [isRegister, setIsRegister] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();

    const handleChange = (e) =>  {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,

        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const userData = await login({
                username: formData.username,
                password: formData.password,
            }).unwrap();
            dispatch(setCredentials({user: userData, token: userData.token }));
            alert("Success! Welcome, " + userData.firstName);
            navigate("/")
        } catch (error) {
            alert("Failed to login: " + (error.data?.message || "Check your credentials"));
        }
    };

    return (
        <div className={styles.wrapper}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1>{isRegister ? "Registration" : "Login"}</h1>

                <input 
                name="username"
                type="text"
                placeholder="Введите имя пользователя"
                value={formData.username}
                onChange={handleChange}
                required
                />

                <input 
                name="password"
                type="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
                />

                {isRegister && (<input 
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    />
                )}

                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Loading..." : (isRegister ? "Create account" : "Login")}
                </button>

                <p className={styles.toggleText}>
                    {isRegister ? "Already have an account" : "No account"}{" "}
                    <span onClick={() => setIsRegister(!isRegister)}>
                        {isRegister ? "Login" : "Registration"}
                    </span>
                </p>
            </form>
        </div>
    )
};
export default LoginPage;