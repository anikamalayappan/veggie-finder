import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Login = ({ onLogin }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('username:', username);
        console.log('password:', password);

        try {
            const res = await fetch('/auth/login', { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json', }, body: JSON.stringify({ "username": username, "password": password }), });
            if (res.ok) {
                onLogin();
                navigate('/');
            }
            else {
                console.log("invalid credentials");
                alert("invalid credentials, please try again!");
                let data = await res.json();
                console.log(data.message);
            }
        }
        catch (err) {
            alert("server error!");
            console.error('login error:', err);
        }
    };

    return (
        <div class="h-screen flex items-center justify-center bg-pink-100">
            <form onSubmit={handleSubmit} class="bg-pink-200 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" >username</label>
                    <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">password</label>
                    <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" class="rounded bg-pink-50 p-2">log in</button>
            </form>
        </div>
    );
};

export default Login;