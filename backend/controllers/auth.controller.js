import  User  from '../models/user.model.js';
export const signup = async(req, res) => {

  const { name, email, password } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // Create new user
    const user=await User.create({ name, email, password });
    res.status(201).json({user, message: 'User created successfully' });
  }
  catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Internal server error' });
  }

 
}
export const login = async(req, res) => {
  res.send('login page');
}
export const logout = async(req, res) => {
  res.send('logout page');
}