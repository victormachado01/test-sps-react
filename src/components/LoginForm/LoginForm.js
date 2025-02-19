import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        console.log("Email:", email);
        console.log("Senha:", password);

        try {
            const response = await AuthService.login(email, password);
            console.log("Resposta da API:", response);

            if (response.token) {
                localStorage.setItem("token", response.token);
                navigate('/');
            } else {
                alert('Token não recebido na resposta da API');
            }
        } catch (error) {
            console.error("Erro ao fazer login:", error.response?.data || error.message);
            alert('Email ou senha inválidos');
        }
    };

    return (
        <div className="w-full md:w-1/3 md:max-w-[450px] bg-[#0C0068] p-6 rounded-xl flex flex-col items-center justify-center gap-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                <img
                    alt="SPS Group"
                    className="w-40 mx-auto"
                    src="https://www.spsgroup.com.br/wp-content/uploads/2024/03/SPSConstultoria_007.png"
                />
                <span className="hidden md:flex text-3xl font-medium text-white"> - </span>
                <span className="text-2xl text-white">Painel Admin</span>
            </div>
            <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
                <input
                    type="email"
                    placeholder="Email"
                    className="input bg-white w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    className="input bg-white w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    className="btn btn-info border-none text-lg text-white w-full"
                    type='submit'
                >
                    Entrar
                </button>
            </form>
        </div>
    )
}