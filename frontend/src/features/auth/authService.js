// The service is strictly for making HTTP requests, sending the data back, and setting any data in local storage.

import axios from 'axios'

const API_URL = '/api/users/' // proxy is defined in the frontend package.json which adds the (http://localhost:5000) in front

// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL, userData) // post request to API_URL, then send your data

    // Check that axios put the data in the object called data
    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data)) // set the item called user and pass it through json.stringify() because you have to put strings in local storage.
    }

    return response.data
}

// Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData) // post request to API_URL, then send your data

    // Check that axios put the data in the object called data
    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data)) // set the item called user and pass it through json.stringify() because you have to put strings in local storage.
    }

    return response.data
}

// Logout user
const logout = () => {
    localStorage.removeItem('user')
}

// Any functions you want to export go in here.
const authService = {
    register,
    logout,
    login,
}

export default authService