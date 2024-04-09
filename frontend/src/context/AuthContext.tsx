import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

type User = {
    name: string,
    email: string,
}

type userAuth = {
    isLoggedIn: boolean,
    user: User | null,
    login: (email: string, password: string) => Promise <void>
    signin: (name:string, email: string, password: string) => Promise <void>
    logout: () => Promise <void>
}


const AuthContext = createContext<userAuth | null>(null);
// now we need to create a provider for the context which wrap all the childrens     
export const AuthProvider = ({ children } : {children:ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        //Fetch if user's cookies are valid then skip login
    })

    const login = (email: string, password: string) => { 
        console.log(email, password)
    }
    const signin = (name: string, email: string, password: string) => {
        console.log(email, password)
    }
    const logout = ()=>{}

    const value = {
        user, 
        isLoggedIn,
        login,
        signin,
        logout
    } 

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

} 

export const useAuth = () => useContext(AuthContext);