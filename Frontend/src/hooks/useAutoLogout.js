// useAutoLogout.js
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';

const INACTIVITY_LIMIT = 1800000; // 1 hour in milliseconds

export const useAutoLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  let inactivityTimer;

  const resetTimer = () => {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(handleAutoLogout, INACTIVITY_LIMIT);
  };

  const handleAutoLogout = () => {
    localStorage.removeItem('token');
    dispatch(logoutUser());
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('../');
  };

  useEffect(() => {
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('click', resetTimer);

    resetTimer();

    return () => {
      clearTimeout(inactivityTimer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('click', resetTimer);
    };
  }, []);

  return { showModal, handleCloseModal };
};

export default useAutoLogout;
