import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import {signupUser, LoginUser, checkAuthStatus} from '../helpers/api-communicator'
type User = {
    name: string,
    email: string,
}

type userAuth = {
    isLoggedIn: boolean,
    user: User | null,
    login: (email: string, password: string) => Promise <void>
    signup: (name:string, email: string, password: string) => Promise <void>
    logout: () => Promise <void>
}


const AuthContext = createContext<userAuth | null>(null);
// now we need to create a provider for the context which wrap all the childrens     
export const AuthProvider = ({ children } : {children:ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn ] = useState(false);

    useEffect(() => {
        //Fetch if user's cookies are valid then skip login
        async function checkStatus() {
            const data = await checkAuthStatus();
            if (data) {
                setUser({email:data.email, name:data.name})
                setIsLoggedIn(true);
            }
        }
        checkStatus();
    })

    const login = async(email: string, password: string) => { 
        const data = await LoginUser(email, password);
        if (data) {
            setUser({ email: data.email, name: data.name });
            setIsLoggedIn(true);
        }
    }
    const signup = async(name: string, email: string, password: string) => {
        const data = await signupUser(name, email, password);
        console.log(data)
        if (data) {
            setUser({email: data.email, name: data.name})
            setIsLoggedIn(true);
            console.log(isLoggedIn)
        }
    }
    const logout = async(): Promise<void> =>{}

    const value = {
        user, 
        isLoggedIn,
        login,
        signup,
        logout
    } 

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

} 

export const useAuth = () => useContext(AuthContext);