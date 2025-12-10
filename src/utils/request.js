const BASE_URL = 'https://europe-west4-bookstore-nov-2025.cloudfunctions.net/server/jsonstore';

export default async function request(url, method, data) {
    let options = {};

    if(method) {
        options.method = method;
    }

    if(data) {
        options.headers = {
            'content-type': 'application/json',
        };

        options.body = JSON.stringify(data);
    }

    const response = await fetch(`${BASE_URL}${url}`, options);
    
    if(!response.ok) {
        throw response.statusText;
    }
    
    const result = await response.json();

    return result;
}