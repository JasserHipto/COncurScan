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
  const navigate = useNavigate(); // Utiliser useNavigate pour la navigation
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('user_email', email);
    formdata.append('user_password', password);
    const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };
    fetch(`${BASE_URL}/${api_version}/token`, requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error('');
        }
      })
      .then((token) => {
        localStorage.setItem('token', token);
        // Afficher la boîte de dialogue de succès avec le bouton "Ok" masqué
        Swal.fire({
          icon: 'success',
          text: 'Top, connexion établie!',
          customClass: {
            popup: 'my-custom-modal',
          },
          width: '30%', // Définir la largeur du modal
          showConfirmButton: false, // Masquer le bouton "Ok"
          timer: 1000, // Fermer automatiquement après 10 secondes
          //timerProgressBar: true // Afficher une barre de progression du temps restant
        }).then(() => {
          navigate('/Dashboard');
        });
      })
      .catch((error) => {
        // Afficher la boîte de dialogue d'erreur
        Swal.fire({
          icon: 'error',
          //title: 'Erreur de connexion',
          text: 'Merci de vérifier vos paramètres de connexion!',
          width: '30%',
          confirmButtonText: "Ok, j'ai compris!",
          confirmButtonColor: '#0095E8',
        });
        setError(error.message);
      });
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
