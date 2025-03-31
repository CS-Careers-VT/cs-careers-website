import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@config/firebase';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in:", userCredential.user);
      // Here you can redirect the user or update your state/context as needed
    } catch (err: any) {
      setError(err.message);
      console.error("Error logging in:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-center">Login</h1>
      <div className="h-2 bg-white my-8 rounded-xl"></div>
      <form onSubmit={handleLogin}>
        <div className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="text-xl font-light leading-10 py-1 px-2"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <div>
            <input
              type="password"
              placeholder="Password"
              className="text-xl font-light leading-10 py-1 px-2 w-full"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <p className="text-sm text-gray-100">
              <a href="forgot-password">
                Forgot Password?
              </a>
            </p>
          </div>
          <button type="submit" disabled={loading} className="bg-csc-organge rounded-md py-4 text-white disabled:bg-opacity-20 text-xl">
              {loading ? 'Logging in...' : 'Login'}
            </button>
        </div>
      </form>

      {error && (
        <div className="bg-white mt-12 rounded-sm p-4">
          <p className="text-xl text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
}

export default Login;