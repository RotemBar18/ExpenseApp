// src/hooks/useAuth.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../redux/actions/userActions';
import { fetchUserPreferences } from '../redux/actions/preferenceAction';
import { getUserIdFromToken } from '../utils/jwtService';

const useAuth = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const user = useSelector((state) => state.user);
  const preferences = useSelector((state) => state.preferences);
  
  const userId = user?.Id || getUserIdFromToken(token);

  // Fetch user and preferences if not loaded
  useEffect(() => {
    if (token && !user.Id) {
      dispatch(fetchUserData(userId, token));
    }
    if (token && userId && !preferences.DefaultCategories) {
      dispatch(fetchUserPreferences(userId, token));
    }
  }, [dispatch, token, userId, user.Id, preferences.DefaultCategories]);

  return { user, preferences, userId, token };
};

export default useAuth;
