import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

export const Logout = () => {
    const { onLogout } = useContext(AuthContext);

    useEffect(() => {
        onLogout();
        localStorage.setItem('auth', JSON.stringify({}))
    }, [onLogout]);

    return <Navigate to="/login" /> 
};