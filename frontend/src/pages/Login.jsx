import {useState, useEffect} from 'react'
import { FaSignInAlt } from 'react-icons/fa'
//useSelector selects something from the state, dispatch, dispatches functions like register(), the async thunk funct. or reset()
import {useSelector, useDispatch} from 'react-redux' 
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {login, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {
    const[formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const {email, password} = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    //Select what you want from your state
    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }
        if(isSuccess || user) { //user checks if user is already logged in, like looking for tokens etc...
            navigate('/') //navigate to dashboard
        }

        dispatch(reset()) //reset is from authSlice.js line 38

    }, [user, isError, isSuccess, message, navigate, dispatch]) //If anything in this dependency array changes, it will fire off useEffect()

    // this allows you to type in the input boxes.
    const onChange = (e) => {
        setFormData((prevState)=> ({
            ...prevState,
            //from props of each <input>, set's them to what is being inputed
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email,
            password
        }

        dispatch(login(userData))
    }

    if(isLoading) {
        return <Spinner/>
    }

    return (
        <>
            <section className='heading'>
                <h1>
                    <FaSignInAlt/> Login
                </h1>
                <p>Login and start setting goals</p>
            </section>

            <section className='form'>
                <form onSubmit={onSubmit}>
                    
                    <div className='form-group'>
                        <input 
                            type="email" 
                            className='form-control' 
                            id='email' 
                            name='email'
                            value={email} 
                            placeholder='Enter your email' 
                            onChange={onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <input 
                            type="password" 
                            className='form-control' 
                            id='password' 
                            name='password'
                            value={password} 
                            placeholder='Enter your password' 
                            onChange={onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <button type='submit' className='btn btn-block'>Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login