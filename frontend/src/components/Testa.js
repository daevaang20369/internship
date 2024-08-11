import React, { useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';

const Testa = () => {
    const { authuser, isloggedin } = useAuth();

    useEffect(() => {
        console.log(isloggedin);
    }, [authuser]); // Dependency array to trigger the effect when isloggedin changes

    return (
        <div>{isloggedin ? 'Logged In' : 'Logged Out'}</div>
    );
}

export default Testa;
