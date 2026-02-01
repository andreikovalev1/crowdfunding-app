import React from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import LocationCard from '../../components/LocationCard';
import ShopLocationCard from '../../components/ShopLocationCard';

const ShopPage = () => {
    const location = useLocation();
    const [searchParams] = useSearchParams();
    
    const cityQuery = searchParams.get('location');

    const resultsFromState = location.state?.results || [];
    const selectedId = location.state?.selectedId;

    return (
        <div>
            <h2>Shop in {cityQuery}</h2>
            <div className="list">
                {resultsFromState.map(item => (
                    <div 
                        key={item.id} 
                    >
                        <ShopLocationCard 
                            key={item.id}
                            loc={item}
                            isSelected={item.id === selectedId}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShopPage;