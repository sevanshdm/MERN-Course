import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'

// Get user from localStorage(json.parse because local storage can only have strings)
const user = JSON.parse(localStorage.getItem('user'))

// get jwt and save it to local storage

// this state pertains to the user part of your state, or authentication
const initialState = {
    user: user ? user : null,
    isError: false, // if you get an error back from the server, you can make this true.Then show a message etc...
    isSuccess: false, // same thing as above.
    isLoading: false, // If you wanna show a spinner or something like that.
    message: '' 
}

// Register user (Async Thunk Function)                   user gets passed in from the register page/component
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => { // takes in a string with the action, and an async function
    try {
        return await authService.login(user) // register is created in authService.js
    } catch (error) {
        const message = (error.response && 
            error.response.data && 
            error.response.data.message) || 
            error.message || 
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
}) 

// Login user (Async Thunk Function)                   user gets passed in from the register page/component
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => { // takes in a string with the action, and an async function
    try {
        return await authService.register(user) // register is created in authService.js
    } catch (error) {
        const message = (error.response && 
            error.response.data && 
            error.response.data.message) || 
            error.message || 
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
}) 

export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout() // found in authService.js line 19
})

//create a slice
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    // these reducers won't be asynchronous or thunk functions. Those go in a function called extraReducers, just below.
    reducers: {
        reset: (state) => { //Reset the state to the default values.
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    //extraReducers accounts for the pending, fulfilled, and rejected state when you make a register(line21), because extraReducers is async.
    extraReducers: (builder) => { 
        builder
            .addCase(register.pending, (state) => { // decide what to do when the register is in pending state.
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => { //you also get data back when fulfilled(like tokens etc), so you'll need an action. 
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload // this is what's returned from register function on line 21
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload // the value for this payload comes from what is passed from line 28
                state.user = null
            })
            .addCase(login.pending, (state) => { // decide what to do when the login is in pending state.
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => { //you also get data back when fulfilled(like tokens etc), so you'll need an action. 
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload // this is what's returned from the backend
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload // payload will be the error message
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })

    }
})

export const { reset } = authSlice.actions
export default authSlice.reducer