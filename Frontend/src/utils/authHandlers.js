import { login, signup } from './authService';
import { createDefaultPreferences } from './authService';

export const handleAuthSubmit = async (event,action, email, password, name, navigate, setAction) => {
    event.preventDefault();
    try {
        if (action === "Login") {
            const response = await login(email, password);
            if (response.success) {
                navigate("/main");
            } else {
                alert(response.message || "Invalid email or password.");
            }
        } else {
            const response = await signup(name, password, email);
            if (response.success) {
                setAction("Login");
                console.log(response)
                createDefaultPreferences(email)
                alert("Sign-up successful! Please log in.");
            } else {
                alert(response.message || "Sign-up failed. Please try again.");
            }
        }
    } catch (error) {
        alert("An error occurred. Please try again.");
    }
};
