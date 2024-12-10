import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function TopBarUser() {
    const { userData, isUserAvailable, logout } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div>
            {isUserAvailable ? (
                <div className="flex items-center gap-4">
                    <span>{userData?.name}</span>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <button onClick={() => navigate('/user/auth')}>Login</button>
            )}
        </div>
    );
}
