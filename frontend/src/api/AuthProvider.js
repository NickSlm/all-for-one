import {useContext, createContext} from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'))
    const navigate = useNavigate();
    const loginAction = async (data) => {
        try {
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                header: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const res = await response.json();
            if (res.data){
                setUser(res.data.user);
                setToken(res.data.access_token);
                localStorage.setItem('token', res.data.token);
                navigate('/profile');
                return;
            }
            throw new Error(res.message);
        }catch(err) {
            console.error(err);
        }
    };
    
    const logOut = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("site");
        navigate('/login')
    };

  return <AuthContext.Provider value={{token, user, loginAction, logOut}}>{children}</AuthContext.Provider>  
};


export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};