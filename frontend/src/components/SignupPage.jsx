import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth.slice';



const SignupPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const createNewUser = async () => {
      const values = { username: 'newuser', password: '123456' };
      const response = await axios.post('/api/v1/signup', values);
      const newUser = response.data;
      dispatch(authActions.setCredentials(newUser.token, values));
    }

    createNewUser();
  });
};

export default SignupPage;
