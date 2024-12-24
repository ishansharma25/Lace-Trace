import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        try {
          const res = await axios.get('/profile');
          setUser(res.data);
        } catch (error) {
          setUser(null);
        } finally {
          setLoading(false);
        }
      };
/*
    const fetchUserProfile = async () => {
        try {
            const response = await axios.get('/profile');
            if (response.data) {
                setUser(response.data);
                localStorage.setItem('user', JSON.stringify(response.data));
            } else {
                setUser(null);
                localStorage.removeItem('user');
            }
        } catch (err) {
            console.error("Error fetching user profile:", err);
            setUser(null);
            localStorage.removeItem('user');
        }
    };
*/
    useEffect(() => {
        checkAuth();
      }, []);

      const login = async (credentials) => {
        console.log("Logging in...");
        try {
          const res = await axios.post('/login', credentials);
          console.log("Login response:", res.data);
          setUser(res.data);
          return true;
        } catch (error) {
          console.log("Login error:", error);
          return false;
        }
      };
/*
    const login = (userData, token) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('authToken', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    };*/

    /*const logout = async () => {
        try {
            await axios.post('/logout');
        } catch (err) {
            console.error("Error logging out:", err);
        }
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
        delete axios.defaults.headers.common['Authorization'];
    };*/
    const logout = async () => {
        console.log("Logging out...");
        try {
          await axios.post('/logout');
          setUser(null);
        } catch (error) {
          console.error('Logout error', error);
        }
      };
    return (
        <UserContext.Provider value={{ user, setUser, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}


/*import axios from "axios";
import { createContext,useEffect,useState } from "react";

export const UserContext=createContext({})
export function UserContextProvider({children})
{
    const[user,setUser]=useState(null);
    useEffect(()=>
    {
        if(!user)
        {
            axios.get('/profile').then(({data})=>
            {
               setUser(data) 
            })
        }
    },[])
    return(
           
        <UserContext.Provider value={{user, setUser}}>

            {children}
        </UserContext.Provider>
    )
}*/