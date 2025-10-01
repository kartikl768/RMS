import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    
    // Simple client-side validation
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    setIsSubmitting(true);

    try {
      // The `await` and `post` call need to be in a properly formed `try` block.
      const response = await axios.post('http://localhost:5109/api/Auth/login', {
        email,
        password,
      });

      // Correctly extract the data from the response.
      const { token, userId, email: userEmail, role, expiresAt } = response.data;

      // Store token and user info securely in localStorage (as requested)
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('userId', userId.toString());
      localStorage.setItem('userEmail', userEmail);
      localStorage.setItem('userRole', role.toString());
      localStorage.setItem('tokenExpiry', expiresAt);
      
      navigate('/dashboard');
      
    } catch (err) {
      // Improve error handling to provide better feedback.
      if (axios.isAxiosError(err) && err.response) {
        // Handle specific API error responses (e.g., from server)
        setError(err.response.data.message || 'Login failed. Please check your credentials.');
      } else {
        // Handle network errors or other unexpected issues
        setError('An unexpected error occurred. Please try again.');
        console.error(err);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>
        <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
