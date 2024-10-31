import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../redux/actions/userActions';
import { getUserIdFromToken } from '../utils/jwtService';

const useAuth = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const user = useSelector((state) => state.user);
  const preferences = useSelector((state) => state.preferences);
  const userId = user?.Id || getUserIdFromToken(token);


  useEffect(() => {
    if (token && !user.Id) {
      dispatch(fetchUserData(userId, token));
    }

    if (
      token &&
      userId &&
      (preferences.loading ||
        !preferences.DefaultCategories ||
        (Array.isArray(preferences.DefaultCategories) && preferences.DefaultCategories.length === 0))
    ) {
    }
  }, [dispatch, token, userId, user.Id, preferences]);

  return { user, preferences, userId, token };
};

export default useAuth;
