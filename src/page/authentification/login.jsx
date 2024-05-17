// login.jsx
import React, { useState } from 'react';
import { Grid, Button, Box, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { BASE_URL, api_version } from './config';
import logo from '../../images/logos/logo.png';
import logo_2 from '../../images/logos/logo-2.png';
import './login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/${api_version}/token`, {
        method: 'POST',
        body: JSON.stringify({ user_email: email, user_password: password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        Swal.fire({
          icon: 'success',
          text: 'Top, connexion établie!',
          customClass: {
            popup: 'my-custom-modal',
          },
          width: '30%',
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          navigate('/Pioche');
        });
      } else {
        throw new Error('Erreur de connexion');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: 'Merci de vérifier vos paramètres de connexion!',
        width: '30%',
        confirmButtonText: "Ok, j'ai compris!",
        confirmButtonColor: '#0095E8',
      });
      setError(error.message);
    }
  };

  return (
    <Grid container className="centered-container">
      <Grid item xs={6} className="grid-left centered-item">
        <img alt="Logo" src={logo} className="logo-1" />
        <h1 className="titre-1">Connexion à votre compte</h1>
        <p className="text-gray">Saisissez votre e-mail professionnel</p>
        <div className="separator separator-content my-14">
          <span className="text">...et bon travail</span>
        </div>
        <Box>
          <form className="form" onSubmit={handleSubmit}>
            <TextField
              className="form-control"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
            />
            <TextField
              className="form-control"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
            <Button className="button-submit" variant="contained" type="submit">
              Connexion
            </Button>
          </form>
        </Box>
      </Grid>
      <Grid item xs={6} className="grid-right centered-item">
        <img alt="Logo" className="logo-2" src={logo_2} />
        <h1 className="titre-2">The lead generation 🧢</h1>
      </Grid>
    </Grid>
  );
};

export default Login;
