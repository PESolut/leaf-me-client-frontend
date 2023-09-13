import React,{ useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterComponent.css'


const RegisterComponent = () => {
    const navigate = useNavigate();
    const [registerDetails, setRegisterDetails] = useState({
        email: '',
        password: '',
        address: '',
        name: ''
    })

    const handleRegisterDetailsChange = (event) => {
        setRegisterDetails({...registerDetails, [event.target.id]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        //post request here
    }

    const handleLoginButton = (event) => {
        navigate("/login")
    }

    return (

        <div className='register'>
            <h2>Welcome!</h2>
            <form onSubmit={handleSubmit} className='register--form'>
                <div className='register--form--email'>
                    <label htmlFor="email">Email Address</label>
                    <input type="text" id="email" value={registerDetails.email} onChange={handleRegisterDetailsChange} />
                    <div className='register--form--line'></div>
                </div>
                <div className='register--form--password'>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={registerDetails.password} onChange={handleRegisterDetailsChange} />
                    <div className='register--form--line'></div>
                </div>
                <div className='register--form--name'>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" value={registerDetails.name} onChange={handleRegisterDetailsChange} />
                    <div className='register--form--line'></div>
                </div>
                <div className='register--form--address'>
                    <label htmlFor="name">Address</label>
                    <input type="text" id="address" value={registerDetails.address} onChange={handleRegisterDetailsChange} />
                    <div className='register--form--line'></div>
                </div>

                <button type='submit' className='register--form--submit--button'>Submit</button>
            </form>

            <button onClick={handleLoginButton} className='register--form--login--button'>Login</button>
            <div className='filler--register'></div>

            
        </div>
    );
};

export default RegisterComponent;