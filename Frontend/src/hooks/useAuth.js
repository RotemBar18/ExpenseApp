// useAuth.js
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


  useEffect(() => {
    if (token && !user.Id) {
      console.log('Fetching user data...');
      dispatch(fetchUserData(userId, token));
    }

    if (
      token &&
      userId &&
      (preferences.loading || // If preferences are still loading
       !preferences.DefaultCategories || // If DefaultCategories are missing
       (Array.isArray(preferences.DefaultCategories) && preferences.DefaultCategories.length === 0)) // If DefaultCategories is empty array
    ) {
      console.log('Fetching user preferences...');
      dispatch(fetchUserPreferences(userId, token));
    }
  }, [dispatch, token, userId, user.Id, preferences.DefaultCategories]);

  return { user, preferences, userId, token };
};

export default useAuth;
