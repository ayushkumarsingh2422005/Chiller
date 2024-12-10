import React, { createContext, useEffect, useState } from 'react';

export const OrganizationContext = createContext();

export const OrganizationProvider = ({ children }) => {
    const [organizationData, setOrganizationData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isOrganizationAvailable, setIsOrganizationAvailable] = useState(false);

    const fetchOrganizationData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setIsOrganizationAvailable(false);
                setLoading(false);
                return;
            }

            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/organization/data`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                localStorage.removeItem('token');
                setIsOrganizationAvailable(false);
                setOrganizationData(null);
                setLoading(false);
                return;
            }

            const text = await response.text();
            const data = text ? JSON.parse(text) : null;

            if (data) {
                setOrganizationData(data);
                setIsOrganizationAvailable(true);
            } else {
                localStorage.removeItem('token');
                setIsOrganizationAvailable(false);
                setOrganizationData(null);
            }
        } catch (error) {
            console.error('Error fetching organization data:', error);
            localStorage.removeItem('token');
            setIsOrganizationAvailable(false);
            setOrganizationData(null);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setOrganizationData(null);
        setIsOrganizationAvailable(false);
    };

    useEffect(() => {
        fetchOrganizationData();
    }, []);

    const value = {
        organizationData,
        loading,
        isOrganizationAvailable,
        fetchOrganizationData,
        logout
    };

    return (
        <OrganizationContext.Provider value={value}>
            {children}
        </OrganizationContext.Provider>
    );
};

export default OrganizationProvider; 