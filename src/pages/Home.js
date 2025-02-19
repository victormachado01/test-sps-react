import React from "react";
import Navbar from "../components/Navbar/Navbar";

import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    return (
        <main className="w-full h-screen flex flex-col">

            <Navbar />

            <section className="w-full flex-1 flex flex-col justify-center items-center gap-4 p-4 text-center">
                <h1 className="text-3xl text-slate-600 font-medium">Bem-vindo(a) ao SPS Group!</h1>
                <span className="text-lg text-slate-500">Neste painel você pode gerenciar os usuarios da empresa de forma simples e rápida.</span>

                <button
                    className="btn btn-neutral hover:scale-105 transition-transform"
                    onClick={() => navigate("/users")}
                >
                    Começar!
                </button>
            </section>

        </main>
    );
}
