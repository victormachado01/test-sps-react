import axios from "axios";

const AuthService = {
    async login(email, password) {
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/login`, { email, password });

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

    async logout() {
        localStorage.removeItem("token");
    },

    getToken() {
        return localStorage.getItem("token");
    },

    isAuthenticated() {
        return !!this.getToken();
    }
};

export default AuthService;