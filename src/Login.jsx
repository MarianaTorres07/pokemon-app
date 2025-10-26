import { useState } from 'react';

function Login({ onLogin }) {
  const [formData, setFormData] = useState({email: '', password: '' });


  return (
    <div className="login-container">
      <h2>Login</h2>
    </div>
  );
}

export default Login;