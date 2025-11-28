import { createContext } from "react";

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
    registerHandler(){},
    loginHandler(){},
    logoutHandler(){}
});

export default UserContext;