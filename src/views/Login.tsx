import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Login.css';

type Email = string;
type Password = string;
type Warning = string;

type User = {
    email: string;
    password: string;
};

const Login = () => {
    const [email, setEmail] = useState<Email>('');
    const [password, setPassword] = useState<Password>('');
    const [warning, setWarning] = useState<Warning>('');

    const navigate = useNavigate();

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const url = 'https://api.homologation.cliqdrive.com.br/auth/login/';

        const userData: User = {
            email: email.toLowerCase(),
            password: password,
        };

        try {
            const response = await axios.post(url, userData, {
                headers: {
                    'Accept': 'application/json;version=v1_web',
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {

                setWarning('');

                const body = response.data;

                localStorage.setItem('token', body.tokens.access);

                const accessToken = body.tokens.access;

                console.log('Token successfully stored in LocalStorage');

                navigate('/homeProfile', { state: { object: accessToken } });

            }
        }
        catch (error: any) {

            if (error.response) {

                const statusError = error.response.status;

                if (statusError === 400) {
                    setWarning('Please fill all the fields');
                }
                else if (statusError === 401) {
                    setWarning('Incorrect email or password');
                }
                else {
                    setWarning('An unexpected error occurred');
                }
            }

            console.log('ERROR IN REQUEST: ', error);
        }
    };

    return (
        <div className="login-box">
            <div className="logo">
                <h1>b2b<span>It</span></h1>
            </div>

            <form>
                <div className="input-container">
                    <div className="input-area">
                        <label>E-mail</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="@gmail.com"
                        />
                    </div>

                    <div className="input-area">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="********"
                        />
                    </div>

                    <div className="warning">{warning}</div>
                </div>

                <button type="submit" onClick={handleSubmit}>Sign In</button>
            </form>
        </div>
    );
};

export default Login;
