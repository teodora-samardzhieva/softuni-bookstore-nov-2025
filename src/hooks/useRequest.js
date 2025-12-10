import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext.jsx";

const BASE_URL = 'https://europe-west4-bookstore-nov-2025.cloudfunctions.net/server';
export default function useRequest(url, initState) {

    const {user, isAuthenticated} = useContext(UserContext);
    // or state, setState
    const [data, setData] = useState(initState);
    
    // differ request
    const request = async (url, method, data, config={}) => {
        if (!url) {
            return {}; 
        } // needed (for guest users to remove the 403 request err)

        let options = {};
        
        if (method) {
            options.method = method;
        }
        
        if (data) {
            options.headers = {
                'content-type': 'application/json',
            };

            options.body = JSON.stringify(data);
        }
        
        // console.log(isAuthenticated);
        
        if(config?.accessToken || isAuthenticated) {
            options.headers = {
                ...options.headers,
                'X-Authorization': config?.accessToken || user.accessToken
            }
        }

        const response = await fetch(`${BASE_URL}${url}`, options);

        if (!response.ok) {
            throw response.statusText;
        }

        if(response.status === 204) {
            return {}
        }

        const result = await response.json();

        return result;
    }

    // първоначален request(onMount)
    useEffect(() => {
        if(!url) return;
        request(url)
            .then(result => setData(result))
            .catch(error => alert(error));
    }, [url]);

    return {
        request,
        data,
        setData
    }
}