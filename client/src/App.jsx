import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Assessment from './pages/Assessment';
import { 
  SignedIn, 
  SignedOut, 
  RedirectToSignIn 
} from "@clerk/clerk-react";

function App() {

  return (
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
  )
}

export default App
