import React, { createContext, useEffect, useState } from 'react';

// Create Context
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);  // Store user data
    const [loading, setLoading] = useState(true);   // Manage loading state
    const [isUserAvailable, setIsUserAvailable] = useState(false); // Check if user is logged in

    const fetchUserData = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token'); // Get token from localStorage (or cookie/session storage)

            if (!token) {
                setIsUserAvailable(false); // User is not logged in
                return;
            }

            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/data`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Include Bearer token
                },
            });

            if (!response.ok) {
                setIsUserAvailable(false); // User data fetch failed
                throw new Error('Failed to fetch user data');
            }

            const data = await response.json();
            // console.log(data);
            setUserData(data);
            setIsUserAvailable(true); // User is available
        } catch (error) {
            console.error('Error fetching user data:', error);
            setUserData(null); // Clear user data on error
            setIsUserAvailable(false); // User is not available
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData(); // Fetch user data when the component mounts
    }, []);

    return (
        <UserContext.Provider value={{ userData, loading, isUserAvailable, fetchUserData }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
