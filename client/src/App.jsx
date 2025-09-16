import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from "@clerk/clerk-react";
import { setAuthToken } from './services/api'; // Import the function
import Home from './pages/Home';
import AIchat from './pages/AIchat';
import Counsellor from './pages/Counsellor';
import Ebuddy from './pages/Ebuddy';
import StoryWall from './pages/StoryWall';
import BreakPage from './pages/BreakPage';
import MusicPage from './pages/MusicPage';
import Assessment from './pages/Assessment';
import AboutUs from './pages/AboutUs';
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
          <Route
            path="/aIchat"
            element={
              <>
                <SignedIn>
                  <AIchat />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn mode="modal" />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/withCounsellor"
            element={
              <>
                <SignedIn>
                  <Counsellor />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn mode="modal" />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/ebuddy"
            element={
              <>
                <SignedIn>
                  <Ebuddy />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn mode="modal" />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/storyWall"
            element={
              <>
                <SignedIn>
                  <StoryWall />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn mode="modal" />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/breakPage"
            element={
              <>
                <SignedIn>
                  <BreakPage />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn mode="modal" />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/musicPage"
            element={
              <>
                <SignedIn>
                  <MusicPage />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn mode="modal" />
                </SignedOut>
              </>
            }
          />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
