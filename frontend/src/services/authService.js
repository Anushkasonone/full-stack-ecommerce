import api from "./api";

export const loginUser = async (email, password) => {
    const response = await api.post("/auth/login", {
        email: email.trim(),
        password: password
    });

    return response.data;
};

export const registerUser = async (name, email, password) => {
    const response = await api.post("/auth/register", {
        name,
        email: email.trim(),
        password
    });

    return response.data;
};