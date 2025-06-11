import React from 'react';
import { Link } from 'react-router';
import AuthorizationForm from './AuthorizationForm.jsx';
import avatar from '../assets/avatar.jpg';


const Card = () => {
  return (
    <div className="card shadow-sm">
      <div className="card-body row p-5">
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
          <img src={avatar} className="rounded-circle" alt="Войти" />
        </div>
        <AuthorizationForm />
      </div>
      <div className="card-footer p-4">
        <div className="text-center">
          <span>Нет аккаунта? </span>
          <Link to="/signup">Регистрация</Link>
        </div>
      </div>
      <div>
      </div>
    </div>
  );
}

export default Card;
