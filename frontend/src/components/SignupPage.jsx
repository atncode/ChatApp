import { useEffect } from 'react';
import { useCreateNewUserMutation } from '../api';



const SignupPage = () => {
  const [ creareNewUser ] = useCreateNewUserMutation();


  useEffect(() => {
    const handleSignup = async () => {
      const values = { username: 'testuser', password: '111111' };
      await creareNewUser(values).unwrap();
    };
  
    handleSignup();
  });

}

export default SignupPage;
