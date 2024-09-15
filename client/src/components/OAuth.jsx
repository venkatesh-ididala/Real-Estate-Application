import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInSuccess, signInFailure } from '../redux/user/userSlice'; // Ensure signInFailure is imported if needed

function OAuth() {
  const dispatch = useDispatch(); // Correct usage of useDispatch hook
    const navigate=useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      

      // Signing in with Google using Firebase Auth
      const result = await signInWithPopup(auth, provider);

      // Sending Google user data to the backend
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Fixed the typo here
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      if (!res.ok) {
        // Handle non-2xx HTTP responses
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to sign in with Google');
      }

      const data = await res.json();

      // Dispatching the Redux action to update the state
      dispatch(signInSuccess(data));
      navigate('/'); // Correct usage of dispatch here

    } catch (err) {
      console.error('Could not sign in with Google', err);
      dispatch(signInFailure(err.message || 'An error occurred during sign in')); // Dispatch failure action if needed
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
    >
      Continue with Google
    </button>
  );
}

export default OAuth;
