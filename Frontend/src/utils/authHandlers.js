import { login, signup } from './authService';
import { fetchUserData } from '../redux/actions/userActions';
import { getUserIdFromToken } from './jwtService';

export const handleAuthSubmit = async (event, action, email, password, name, navigate, dispatch, setAction) => {
    event.preventDefault();
    localStorage.removeItem('selectedBoard');
    localStorage.removeItem('preferences');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');

    try {
      if (action === "Login") {
       
        const response = await login(email, password);
  
  
        if (response.success) {
          const { token,refreshToken } = response;
          const userId = getUserIdFromToken(token)
  
          localStorage.setItem('token', token);
          localStorage.setItem('refreshToken', refreshToken);

          dispatch(fetchUserData(userId, token));
          
          alert('Login successful!');
          navigate("/main");
        } else {
          alert(response.message || "Invalid email or password.");
        }
      } else {
        const response = await signup(name, password, email);
        if (response.success) {
          setAction("Login");
          alert("Sign-up successful! Please log in.");
        } else {
          alert(response.message || "Sign-up failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  };
  
