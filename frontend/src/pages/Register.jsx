import {useState, useEffect} from 'react'
//useSelector selects something from the state, dispatch, dispatches functions like register(), the async thunk funct. or reset()
import {useSelector, useDispatch} from 'react-redux' 
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import {register, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {
    const[formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '', //confirm password
    })

    const {name, email, password, password2} = formData

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

        if(password !== password2){
            toast.error('Passwords do not match')
        } else {
            const userData = { // this all comes from the form
                name, 
                email, 
                password,
            }

            dispatch(register(userData)) // dispatching register() from authSlice.js line 19. Then passing in user from same file. same line
        }
    }

    if(isLoading){
        return <Spinner/>
    }

    return (
        <>
            <section className='heading'>
                <h1>
                    <FaUser/> Register
                </h1>
                <p>Please create an account</p>
            </section>

            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input 
                            type="text" 
                            className='form-control' 
                            id='name' 
                            name='name'
                            value={name} 
                            placeholder='Enter your name' 
                            onChange={onChange}
                        />
                    </div>
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
                        <input 
                            type="password" 
                            className='form-control' 
                            id='password2' 
                            name='password2'
                            value={password2} 
                            placeholder='Confirm password' 
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

export default Register