import { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@config/firebase';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent. Please check your inbox.');
    } catch (err: any) {
      setError(err.message);
      console.error("Error sending password reset email:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-center">Forgot Password</h1>
      <div className="h-2 bg-white my-8 rounded-xl"></div>
      <form onSubmit={handleForgotPassword}>
        <div className="flex flex-col space-y-5">
          <input
            type="email"
            placeholder="Enter your email"
            className="text-xl font-light leading-10 py-1 px-2"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        <div className="flex gap-4">
            <div className="flex-grow">
                <Link to="/admin/auth/login">
                  <button type="button" className="text-white border-white border-2 rounded-md py-4 text-xl w-full">
                      Back
                  </button>
                </Link>
            </div>
            <button type="submit" disabled={loading} className="bg-csc-organge rounded-md py-4 text-white disabled:bg-opacity-20 text-xl flex-1">
                {loading ? 'Sending...' : 'Send Reset Email'}
            </button>
            </div>
        </div>
      </form>

      {message && (
        <div className="bg-white mt-12 rounded-sm p-4">
          <p className="text-xl text-black">{message}</p>
        </div>
      )}

      {error && (
        <div className="bg-white mt-12 rounded-sm p-4">
          <p className="text-xl text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;