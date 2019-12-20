import { Router } from 'express';

const router = Router();

/**
 * GET user profile.
 */
router.get('/profile', (req, res) => {
  res.render('profile', {
    name: 'profile',
    title: 'Auth0 Web App',
    profile: JSON.stringify(req.user, null, 2),
  });
});

export default router;
