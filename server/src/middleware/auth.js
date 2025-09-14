import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

const requireAuth = ClerkExpressRequireAuth({
  onError: (err, req, res) => {
    res.status(401).json({ error: 'Unauthorized access' });
  }
});

export default requireAuth;
