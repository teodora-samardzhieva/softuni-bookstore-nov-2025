import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import UserContext from "../../context/UserContext.jsx";

export default function Logout() {
    const {logoutHandler} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        logoutHandler()
            .finally(() => navigate('/'));
    }, []);

    return null;
}