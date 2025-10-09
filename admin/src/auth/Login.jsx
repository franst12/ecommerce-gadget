import { useState } from 'react';
import { useNavigate } from 'react-router';
import { authLogin } from '../routes/route';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(email, password);
      const response = await authLogin('api/auth', 'login', { email, password });
      const token = response.token;
      console.log(token);
      localStorage.setItem('token', token);
      navigate('/admin/dashboard');
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center rounded bg-teal-700 w-[500px] h-[350px] mx-auto mt-56">
        <form method="post" onSubmit={handleSubmit} className=" text-slate-800 flex flex-col items-center justify-content-center gap-5">
          <input className="bg-white py-1 w-100 p-2 rounded " onChange={(e) => setEmail(e.target.value)} value={email} type="email" name="email" id="email" />
          <input className="bg-white py-1 w-100 p-2 rounded" onChange={(e) => setPassword(e.target.value)} value={password} type="password" name="password" id="password" />
          <button type="submit" className="btn bg-primary p-2 w-100 text-white">
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
