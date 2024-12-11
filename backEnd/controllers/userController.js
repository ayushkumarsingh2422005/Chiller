import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import fs from 'fs/promises';
import path from 'path';

// Update Profile Function
// export const updateProfile = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

//   const { name, email, password } = req.body;
//   const userId = req.user.id;

//   try {
//     let user = await User.findById(userId);
//     if (!user) return res.status(404).json({ msg: 'User not found' });

//     if (name) user.name = name;
//     if (email) user.email = email;

//     if (password) {
//       const salt = await bcrypt.genSalt(10);
//       user.password = await bcrypt.hash(password, salt);
//     }

//     await user.save();
//     res.json({ msg: 'Profile updated successfully', user });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send('Server error');
//   }
// };


export const getProfile = async (req, res) => {
  try {
    console.log(req.user);
    res.json(req.user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
}

export const updateGender = async (req, res) => {
  try {
    const { gender } = req.body;
    if (!gender) {
      return res.status(400).json({ message: "Gender is required." });
    }
    req.user.gender = gender;
    await req.user.save();
    res.status(200).json({ message: "Gender updated successfully.", user: req.user });
  } catch (error) {
    console.error("Error updating gender:", error);
    res.status(500).json({ message: "Failed to update gender.", error: error.message });
  }
};

export const updatePhone = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({ message: "Phone number is required." });
    }
    req.user.phone = phone;
    await req.user.save();
    res.status(200).json({ message: "Phone number updated successfully.", user: req.user });
  } catch (error) {
    console.error("Error updating phone number:", error);
    res.status(500).json({ message: "Failed to update phone number.", error: error.message });
  }
}

export const updateCollege = async (req, res) => {
  try {
    const { college } = req.body;
    // console.log(college)
    if (!college) {
      return res.status(400).json({ message: "Collage name is required." });
    }
    req.user.college = college;
    await req.user.save();
    res.status(200).json({ message: "Collage updated successfully.", user: req.user });
  } catch (error) {
    console.error("Error updating collage:", error);
    res.status(500).json({ message: "Failed to update collage.", error: error.message });
  }
}


export const updateRegistrationNumber = async (req, res) => {
  try {
    const { registrationNumber } = req.body;
    if (!registrationNumber) {
      return res.status(400).json({ message: "Registration number is required." });
    }
    req.user.registrationNumber = registrationNumber;
    await req.user.save();
    res.status(200).json({ message: "Registration number updated successfully.", user: req.user });
  } catch (error) {
    console.error("Error updating registration number:", error);
    res.status(500).json({ message: "Failed to update registration number.", error: error.message });
  }
}


export const updateProgramBranch = async (req, res) => {
  try {
    const { program, branch } = req.body;
    if (!program && !branch) {
      return res.status(400).json({ message: "Program and branch are required." });
    }
    req.user.program = program;
    req.user.branch = branch;
    await req.user.save();
    res.status(200).json({ message: "Program and branch updated successfully.", user: req.user });
  } catch (error) {
    console.error("Error updating program and branch:", error);
    res.status(500).json({ message: "Failed to update program and branch.", error: error.message });
  }
}

export const updateUser = async (req, res) => {
  try {
    // response
    //   name: 'Ayush Kumar',
    // phone: '8299797515',
    // gender: 'Male',
    // college: 'National Institute of technology Jamshedput',
    // program: 'UG',
    // branch: 'CSE',
    // registrationNumber: '2023UGCS086'
    const { name, phone, gender, college, program, branch, registrationNumber } = req.body;
    req.user.name = name;
    req.user.phone = phone;
    req.user.gender = gender;
    req.user.college = college;
    req.user.program = program;
    req.user.branch = branch;
    req.user.registrationNumber = registrationNumber;
    await req.user.save();
    res.status(200).json({ message: "User updated successfully.", user: req.user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Failed to update user.", error: error.message });
  }
}

export const updateProfilePicture = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ 
                success: false, 
                message: "No image file provided" 
            });
        }

        // Get the old profile picture path
        const oldProfilePicture = req.user.profilePicture;

        // Update user's profile picture path in database
        // Store the path relative to public directory using forward slashes
        const relativePath = `uploads/profile/${req.file.filename}`;
        req.user.profilePicture = relativePath;
        await req.user.save();

        // If there was an old profile picture, delete it
        if (oldProfilePicture) {
            const oldPath = `public/${oldProfilePicture}`;
            try {
                await fs.access(oldPath); // Check if file exists
                await fs.unlink(oldPath); // Delete the file
            } catch (error) {
                // File doesn't exist or other error, we can ignore
                console.log('Error deleting old profile picture:', error);
            }
        }

        res.status(200).json({
            success: true,
            message: "Profile picture updated successfully",
            user: req.user
        });

    } catch (error) {
        console.error("Error updating profile picture:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update profile picture",
            error: error.message
        });
    }
};