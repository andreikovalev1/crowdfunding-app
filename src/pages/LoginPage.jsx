import React, { useState, useEffect } from "react";
import styles from "./LoginPage.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation, useRegisterMutation } from "../api/authApi";
import { setCredentials } from "../store/slices/authSlice";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
    });
    const [isRegister, setIsRegister] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading: isLoginLoading }] = useLoginMutation();
    const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();

    const isLoading = isLoginLoading || isRegisterLoading;

    useEffect(() => {
        setErrorMessage("");
    }, [isRegister]);

    const handleChange = (e) =>  {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errorMessage) setErrorMessage("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        try{
            if(isRegister) {
                const newUser = await register({
                    email: formData.email,
                    username: formData.username,
                    password: formData.password,
                }).unwrap();
                console.log("Registered user:", newUser);
                setIsRegister(false);
            } else {
                  const userData = await login({
                    username: formData.username,
                    password: formData.password,
                  }).unwrap();
                  dispatch(setCredentials({user: userData, token: userData.token }));
                  navigate("/");
              }  
        } catch (error) {
            setErrorMessage(error.data?.message || "Something went wrong. Please try again");
        }
    };

    return (
        <div className={styles.wrapper}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1 className={styles.title}>{isRegister ? "Registration" : "Login"}</h1>
                {errorMessage && <div className={styles.errorBox}>{errorMessage}</div>}

                <input 
                name="username"
                type="text"
                placeholder="Введите имя пользователя"
                value={formData.username}
                onChange={handleChange}
                className={styles.input}
                required
                />

                <input 
                name="password"
                type="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className={styles.input}
                required
                />

                {isRegister && (<input 
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.input}
                    required
                    />
                )}

                <button type="submit" className={styles.submitBtn} disabled={isLoading}>
                    {isLoading ? "Processing..." : (isRegister ? "Create account" : "Sign In")}
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