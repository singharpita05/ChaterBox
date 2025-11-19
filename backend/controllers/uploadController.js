// UPLOAD CONTROLLER FOR HANDLING AVATAR UPLOAD REQUESTS WITH CLOUDINARY

import { cloudinary, uploadToCloudinary } from '../config/cloudinary.js';

// @desc    Upload avatar image to Cloudinary
// @route   POST /api/upload/avatar
// @access  Private
const uploadAvatar = async (req, res) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image file' });
    }

    // Upload file buffer to Cloudinary
    const result = await uploadToCloudinary(req.file.buffer, {
      folder: 'chatterbox/avatars', // Folder in Cloudinary
      public_id: `${req.user._id}-${Date.now()}`, // Unique filename
      transformation: [
        { width: 500, height: 500, crop: 'limit' }, // Resize image
        { quality: 'auto' }, // Auto quality optimization
      ],
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    });

    // Return Cloudinary URL and public_id
    res.status(200).json({
      message: 'Avatar uploaded successfully',
      avatar: result.secure_url, // Cloudinary URL
      publicId: result.public_id, // Full public_id (includes folder path)
    });
  } catch (error) {
    console.error('Upload avatar error:', error);
    res.status(500).json({ message: 'Server error uploading avatar' });
  }
};

// @desc    Delete avatar image from Cloudinary
// @route   DELETE /api/upload/avatar/:publicId
// @access  Private
const deleteAvatar = async (req, res) => {
  try {
    const { publicId } = req.params;

    // Delete image from Cloudinary using public_id
    // Note: publicId should already include the folder path
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === 'ok') {
      res.status(200).json({ message: 'Avatar deleted successfully' });
    } else {
      res.status(404).json({ message: 'Avatar not found or already deleted' });
    }
  } catch (error) {
    console.error('Delete avatar error:', error);
    res.status(500).json({ message: 'Server error deleting avatar' });
  }
};

export { deleteAvatar, uploadAvatar };
