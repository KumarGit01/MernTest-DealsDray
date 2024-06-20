import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Import the CSS file

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Only for signup
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const url = isLogin ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/signup';
      const res = await axios.post(url, { userName, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userName', res.data.userName);
      navigate('/Dashbord'); // Use navigate to redirect after successful login/signup
    } catch (err) {
      alert(`Invalid ${isLogin ? 'login' : 'signup'} details`);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Login' : 'Signup'}</h2>
      <form onSubmit={handleAuth}>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Gmail"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {!isLogin && (
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />
        )}
        <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
      </form>
      <button className="toggle-button" onClick={() => setIsLogin(!isLogin)}>
        Switch to {isLogin ? 'Signup' : 'Login'}
      </button>
    </div>
  );
};

export default Auth;
