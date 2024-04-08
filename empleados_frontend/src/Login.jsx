/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { jwtDecode } from 'jwt-decode';

export default function Login() {

  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    const storedRememberMe = localStorage.getItem('rememberMe');

    if (storedRememberMe === 'true' && storedUsername && storedPassword) {
      setUsername(storedUsername);
      setPassword(storedPassword);
      setRememberMe(true);

    } 

    const token = localStorage.getItem('token');
    if (token) {
      
      checkTokenExpiration();
      navigate('/dashboard');
    }
  }
  , [navigate]);

  const checkTokenExpiration = async () => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const expirationTime = decodedToken.exp * 1000;
    const currentTime = new Date().getTime();
    if (currentTime >= expirationTime) {
      refreshToken();
    }
  }

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const newToken = await axios.post('http://localhost:8000/api/token/refresh/', {
      refresh: refreshToken,
    });
    localStorage.setItem('token', newToken.data.access);
    localStorage.setItem('refreshToken', newToken.data.refresh);
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setError('');
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setError('');
  }

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  }



  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username');
    const password = data.get('password');

    if (!username || !password) {
      setError('Usuerio y contraseña son requeridos.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/token/', {
        username,
        password,
      })

      if (response.status === 200)
      {
        if(rememberMe)
        {
          localStorage.setItem('username', username);
          localStorage.setItem('password', password);
          localStorage.setItem('rememberMe', rememberMe)
      } else {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        localStorage.removeItem('token');
      }
      const token = response.data.access;
      const refreshToken = response.data.refresh;
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      navigate('/dashboard');
    }
    }
    catch (error) {
      setError('Usuario o contraseña incorrectos.');
      return;
    }
    setError('');

  };


  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar sesión
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Usuario"
              name="username"
              value={username}
              autoComplete="username"
              autoFocus
              onChange={handleUsernameChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              value = {password}
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handlePasswordChange}
            />
              {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={handleRememberMeChange}
                color="primary"
              />
            }
            label="Remember me"
          />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
  );
}


