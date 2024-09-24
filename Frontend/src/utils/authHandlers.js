import { login, signup } from './authService';
import { createDefaultPreferences } from './authService';
import { fetchUserData } from '../redux/actions/userActions';
import { getUserIdFromToken } from './jwtService';
import { fetchUserPreferences } from '../redux/actions/preferenceAction';
import { fetchUserReports } from '../redux/actions/reportsActions';

export const handleAuthSubmit = async (event, action, email, password, name, navigate, dispatch, setAction) => {
    event.preventDefault();
    try {
      if (action === "Login") {
        const response = await login(email, password);
  
  
        if (response.success) {
          const { token } = response;
          const userId = getUserIdFromToken(token)
  
          localStorage.setItem('token', token);

          dispatch(fetchUserData(userId, token));
          dispatch(fetchUserPreferences(userId, token));
          dispatch(fetchUserReports(userId,token))
          
          alert('Login successful!');
          navigate("/main");
        } else {
          alert(response.message || "Invalid email or password.");
        }
      } else {
        const response = await signup(name, password, email);
        if (response.success) {
          setAction("Login");
          console.log(response)
          createDefaultPreferences(email);
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
  
