import React, { useContext, useEffect, useState } from 'react';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [authuser, setauthuser] = useState(null);
    const [isloggedin, setisloggedin] = useState(false);

    const logout = () => {
        setauthuser(null);
        setisloggedin(false);
        localStorage.removeItem('user'); // Remove token from localStorage
    };

    const handle = () => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setauthuser(JSON.parse(savedUser));
            setisloggedin(true);
        }
    };

    useEffect(() => {
        handle();
    }, []); // Empty dependency array ensures this runs only once on mount

    const value = {
        authuser,
        setauthuser,
        isloggedin,
        setisloggedin,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
