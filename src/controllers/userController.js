export function getUserProfile(req, res) {
  const user = req.user;
  res.json({ message: 'User profile', user });
}  