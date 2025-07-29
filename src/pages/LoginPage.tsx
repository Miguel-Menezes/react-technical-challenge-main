import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import whatTheTruckLogo from '../assets/what_the_truck_logo.svg';
import balancaMarquesLogo from '../assets/balanca_marques_logo.svg';

export default function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) navigate('/documents');
    else setError('Utilizador ou palavra-passe inválidos. Introduza corretamente os dados de acesso');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="grid grid-cols-1 xl:grid-cols-2 w-full max-w-5xl h-[768px] border border-gray-dark">
        <div className="hidden xl:block bg-white p-5"></div>

        <div className="bg-gray p-5 flex flex-col justify-center">
          <div className="flex justify-center mb-10">
            <img src={whatTheTruckLogo} alt="Logo" />
          </div>

          {!error ? (
            <div className="text-center text-gray-dark text-sm mb-4">
              <h2>Bem-vindo(a)!</h2>
              <p>Introduza as suas credenciais de acesso:</p>
            </div>
          ) : (
            <div className="text-center text-error text-sm mb-4 max-w-xs mx-auto">
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-sm mx-auto">
            <input
              type="text"
              placeholder="O seu email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full p-2 rounded bg-white placeholder:text-gray-dark border ${error ? 'border-error' : 'border-gray-soft'} focus:outline-none focus:border-gray-dark`}
              required
            />

            <input
              type="password"
              placeholder="Palavra-passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-2 rounded bg-white placeholder:text-gray-dark border ${error ? 'border-error' : 'border-gray-soft'} focus:outline-none focus:border-gray-dark`}
              required
            />

            <button
              type="submit"
              className="w-full bg-red text-white py-2 rounded hover:bg-gray-dark transition-colors"
            >
              Entrar
            </button>
          </form>

          <div className="flex justify-center mt-10">
            <img src={balancaMarquesLogo} alt="Logo" />
          </div>
        </div>
      </div>
    </div>
  );
}
