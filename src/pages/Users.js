import React, { useEffect, useState } from "react";
import UserService from "../services/UserService";
import Navbar from "../components/Navbar/Navbar";
import Modal from "../components/Modal/Modal";

export default function Users() {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const getUsers = async () => {
        try {
            const response = await UserService.list();
            if (response && Array.isArray(response)) {
                setUsers(response);
            }
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const handleEdit = (user) => {
        setIsEditing(true);
        setSelectedUser(user.id);
        setName(user.name);
        setType(user.type);
        setEmail(user.email);
        setPassword("");
        setIsModalOpen(true);
    };

    const updateUser = async () => {
        try {
            await UserService.update(selectedUser, { name, type, email });
            closeModal();
            getUsers();
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
        }
    };

    const addUser = async () => {
        try {
            const response = await UserService.create({ name, type, email, password });
            if (response && response.id) {
                setUsers([...users, response]);
            }
            closeModal();
            getUsers();
        } catch (error) {
            console.error("Erro ao adicionar usuário:", error);
        }
    };

    const removeUser = async (id) => {
        try {
            await UserService.delete(id);
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error("Erro ao remover usuário:", error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsEditing(false);
        setSelectedUser(null);
        setName("");
        setType("");
        setEmail("");
        setPassword("");
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <main className="w-full h-screen flex flex-col">
            <Navbar />
            <section className="w-full flex-1 flex flex-col justify-start items-center gap-4 p-6 text-center">
                <div className="w-4/5 max-w-[1200px] p-6 bg-gray-200 rounded-xl shadow-md gap-4 flex flex-col items-center justify-center">
                    <div className="w-full flex flex-col md:flex-row justify-between items-center">
                        <h1 className="text-2xl font-medium text-primary w-full md:w-auto text-start md:text-center">Usuários</h1>
                        <button
                            className="btn btn-primary text-white text-lg w-full md:w-auto"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Novo Usuário
                        </button>
                    </div>
                    <div className="overflow-x-auto w-full rounded-lg shadow-md">
                        <table className="min-w-full">
                            <thead>
                                <tr className="bg-gray-500 text-white">
                                    <th className="px-4 py-2">Id</th>
                                    <th className="px-4 py-2">Nome</th>
                                    <th className="px-4 py-2">Cargo</th>
                                    <th className="px-4 py-2">Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={user.id} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                                        <td className="px-4 py-2 w-1/4 text-center">{index + 1}</td>
                                        <td className="px-4 py-2 w-1/4 text-center">{user.name}</td>
                                        <td className="px-4 py-2 w-1/4 text-center">{user.type}</td>
                                        <td className="px-4 py-2 text-center flex items-center justify-center gap-4">
                                            <button
                                                className="btn btn-info text-white"
                                                onClick={() => handleEdit(user)}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className="btn btn-error text-white"
                                                onClick={() => removeUser(user.id)}
                                            >
                                                Excluir
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {isModalOpen && (
                <Modal>
                    <div className="p-6 bg-gray-100 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">{isEditing ? "Editar Usuário" : "Novo Usuário"}</h2>
                        <input
                            type="text"
                            placeholder="Nome"
                            className="input bg-white w-full mb-3"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Cargo"
                            className="input bg-white w-full mb-3"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="input bg-white w-full mb-3"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        {!isEditing && (
                            <input
                                type="password"
                                placeholder="Senha"
                                className="input bg-white w-full mb-3"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        )}

                        <div className="flex justify-end gap-2">
                            <button className="btn btn-error text-white" onClick={closeModal}>
                                Cancelar
                            </button>
                            <button
                                className="btn btn-primary text-white"
                                onClick={isEditing ? updateUser : addUser}
                            >
                                {isEditing ? "Atualizar" : "Criar"}
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </main>
    );
}
