import { Router } from 'express';

const router = Router();

/**
 * GET user profile.
 */
router.get('/profile', (req, res) => {
  res.render('profile', {
    profile: JSON.stringify(req.user, null, 2),
    title: 'Profile page',
  });
});

export default router;
