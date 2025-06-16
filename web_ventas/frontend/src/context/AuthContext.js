import { createContext, useState } from "react"
import jwt_decode from "jwt-decode"

const AuthContext = createContext();

const [isAuthenticated, setAuthenticated] = useState(false)


export default AuthContext;

export const AuthProvider = ({children}) => {

    const [authTokens, setAuthTokens] = useState({})
    const [user, setUser] = useState()

    const loginUser = async(user, pwd) => {
        try 
        {
            const response = await fetch('/auth/token/', {
                'Method': 'POST',
                'Headers': {'Content-Type':'application/json'},
                'body': JSON.stringify({username: user, password:pwd})
            })
            const data = await response.json()
            setAuthTokens(data)
            setUser(jwt_decode(data.access).username)
            localStorage.setItem('authTokens': JSON.stringify(data))

        }catch(error)
        {
            throw (error)
        }
    }

    const contextData = {

    }

    return(
        <AuthContext.Provider value={{'name':'Ema'}}>

        </AuthContext.Provider>
    )
}