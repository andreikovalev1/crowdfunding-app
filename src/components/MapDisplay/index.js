import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import styles from './style.module.css';

const AutoFitBounds = ({ locations }) => {
    const map = useMap();
    useEffect(() => {
        if (locations && locations.length > 0) {
            const bounds = locations.map(loc => [
                loc.address.coordinates.lat, 
                loc.address.coordinates.lng
            ]);
            map.fitBounds(bounds, { padding: [50, 50], maxZoom: 10 });
        }
    }, [locations, map]);
    return null;
};

const MapResizer = () => {
    const map = useMap();
    useEffect(() => {
        const container = map.getContainer();
        const resizeObserver = new ResizeObserver(() => map.invalidateSize());
        if (container) resizeObserver.observe(container);
        return () => container && resizeObserver.unobserve(container);
    }, [map]);
    return null;
};

const MapDisplay = ({ locations = [] }) => {
    const defaultPos = [50, 10];
    const worldBounds = [[-90, -180], [90, 180]];

    return (
        <div className={styles.mapWrapper}>
            <MapContainer 
                center={defaultPos} 
                zoom={3}
                minZoom={2}
                maxBounds={worldBounds}
                maxBoundsViscosity={1.0}
                scrollWheelZoom={true}

                style={{ height: "100%", width: "100%" }}
            >
                <MapResizer />
                <AutoFitBounds locations={locations} />
                
                <TileLayer
                    attribution='&copy; OpenStreetMap'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                    noWrap={true}
                    bounds={worldBounds}
                />
                
                {locations?.map((loc) => (
                    <Marker 
                        key={loc.id} 
                        position={[loc.address.coordinates.lat, loc.address.coordinates.lng]}
                        eventHandlers={{
                            click: (e) => {
                                e.target._map.flyTo(e.latlng, 10, {
                                    duration: 1.5
                                });
                            },
                        }}
                    >
                        <Popup>
                            <strong>{loc.company.name}</strong> <br />
                            {loc.address.city}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MapDisplay;