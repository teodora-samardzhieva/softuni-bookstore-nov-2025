import { createContext, useState } from "react";
import { useNavigate } from "react-router";
import useRequest from "../hooks/useRequest.js";

const UserContext = createContext({
    isAuthenticated: false,
    user: {
        'username': '',
        'email': '',
        'password': '',
        '_createdOn': 0,
        '_id': '',
        'accessToken': ''
    },
    registerHandler() {},
    loginHandler() {},
    logoutHandler() {}
});

export function UserProvider({children}) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const {
        request
    } = useRequest();

    // Register new user
    const registerHandler = async (username, email, password) => {
        const newUser = {
            username,
            email,
            password
        };
        // Register Api call
        const result = await request("/users/register", "POST", newUser);

        // Login user after register
        setUser(result);
        navigate("/"); // redirect after registration
    };

    const loginHandler = async (email, password) => {
        const result = await request("/users/login", "POST", {
            email,
            password
        });

        setUser(result);
    };

    const logoutHandler = () => {
        return request('/users/logout')
            .finally(() => setUser(null));
    };

    const userContextValues = {
        user,
        isAuthenticated: !!user?.accessToken,
        registerHandler,
        loginHandler,
        logoutHandler,
    };

    return ( 
        <UserContext.Provider value={userContextValues} >
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;