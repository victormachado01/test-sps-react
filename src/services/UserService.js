import axios from "axios";
import AuthService from "./AuthService";
const url = process.env.REACT_APP_SERVER_URL;

const UserService = {
    async login(email, password) {
        try {
            const response = await axios.post(`${url}/login`, { email, password });

            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                return { token: response.data.token, error: null };
            } else {
                return { token: null, error: "Credenciais inválidas" };
            }

        } catch (error) {
            console.error(error);
            return { token: null, error: error.message };
        }
    },

    async list() {
        const token = AuthService.getToken();

        if (!token) {
            return [];
        }

        try {
            const response = await axios.get(`${url}/users`, {
                headers: {
                    Authorization: `${token}`
                },
            })

            if (response.data && response.data.length > 0) {
                return response.data;
            } else {
                console.error("Resposta de api invállida", response.data);
                return [];
            }
        } catch (error) {
            console.log(error);
            return { error: error.message };
        }
    },

    async create(data) {
        const token = AuthService.getToken();

        try {
            const response = await axios.post(`${url}/users`, data, {
                headers: {
                    Authorization: `${token}`
                },
            });

            return response.data;
        } catch (error) {
            console.log(error);
            return { error: error.message };
        }
    },

    async update(id, data) {
        const token = AuthService.getToken();

        try {
            const response = await axios.put(`${url}/users/${id}`, data, {
                headers: {
                    Authorization: `${token}`
                },
            });

            return response.data;
        } catch (error) {
            console.log(error);
            return { error: error.message };
        }
    },


    async delete(id) {
        const token = AuthService.getToken();

        try {
            const response = await axios.delete(`${url}/users/${id}`, {
                headers: {
                    Authorization: `${token}`
                },
            });

            return response.data;
        } catch (error) {
            console.log(error);
            return { error: error.message };
        }
    }

}

export default UserService;
