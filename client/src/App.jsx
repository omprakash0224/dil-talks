import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from "@clerk/clerk-react";
import { setAuthToken } from './services/api'; // Import the function
import Home from './pages/Home';
import Assessment from './pages/Assessment';
import { 
  SignedIn, 
  SignedOut, 
  RedirectToSignIn 
} from "@clerk/clerk-react";
import { Toaster } from 'react-hot-toast';

function App() {
  const { getToken } = useAuth();

  // This effect will run whenever the authentication state changes.
  useEffect(() => {
    const updateAuthToken = async () => {
      const token = await getToken();
      setAuthToken(token);
    };
    updateAuthToken();
  }, [getToken]);

  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/assessment"
            element={
              <>
                <SignedIn>
                  <Assessment />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn mode="modal" />
                </SignedOut>
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
