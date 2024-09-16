import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';

// Test Route
export const test = (req, res) => {
  res.json({
    message: "API route is working",
  });
};

// Update User
export const updateuser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can only update your own account'));
  }

  try {
    // If password is provided, hash it
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    // Find user by ID and update
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username, // Assuming username comes from req.body.username
          password: req.body.password, // Password only updates if it's in the request
          avatar: req.body.avatar,     // Avatar is optional and can be updated if provided
        },
      },
      { new: true } // Return the updated document
    );

    // If user is not found, handle the error
    if (!updatedUser) {
      return next(errorHandler(404, 'User not found'));
    }

    // Exclude the password field from the response
    const { password, ...rest } = updatedUser._doc;

    // Send the updated user data
    res.status(200).json(rest);
  } catch (err) {
    next(err); // Catch any error and pass it to error handling middleware
  }
};

export const deleteuser = async (req, res, next) => {
    if (req.user.id !== req.params.id)
      return next(errorHandler(401, 'You can only delete your own account!'));
    try {
      await User.findByIdAndDelete(req.params.id);
      res.clearCookie('access_token');
      res.status(200).json('User has been deleted!');
    } catch (error) {
      next(error);
    }
  };