import React, { useState } from 'react';
import './LoginSignup.css'


const LoginSignup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        console.log("!!!", name, email, password);
        // debugger;
        event.preventDefault();

        // Process the form data here
    };

    return (
        <div className='loginsignup'>
            <div className="loginsignup-container">
                <h1>Sign Up</h1>
                <form className="loginsignup-fields" onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        placeholder='Name'
                        name='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input 
                        type="email" 
                        placeholder='Email Address'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type='submit'>Continue</button>
                </form>
                <p className="loginsignup-login">
                    Already have an account? <a href="/login">Login here</a>
                </p>
                <div className="loginsignup-agree">
                    <label>
                        <input 
                            type="checkbox"
                            name="terms"
                            id="terms"
                        />
                        By continuing, I agree to the terms of use & privacy policy
                    </label>
                </div>
            </div>
        </div>
    );
}

export default LoginSignup;
