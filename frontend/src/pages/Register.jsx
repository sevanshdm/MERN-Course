import {useState, useEffect} from 'react'
import { FaUser } from 'react-icons/fa'

function Register() {
    const[formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '', //confirm password
    })

    const {name, email, password, password2} = formData

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
                            value={password} 
                            placeholder='Enter your password' 
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