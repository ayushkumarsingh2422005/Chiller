import Organization from '../models/Organization.js';
import fs from 'fs/promises';

export const getProfile = (req, res) => {
    try {
        console.log(req.organization);
        res.json(req.organization);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
}

export const updateOrganization = async (req, res) => {
    try {
        const { 
            name, 
            email, 
            phone, 
            description, 
            bank,
            socialMedia  // Add this
        } = req.body;

        // Update basic fields
        if (name) req.organization.name = name;
        if (email) req.organization.email = email;
        if (phone) req.organization.phone = phone;
        if (description) req.organization.description = description;

        // Update bank details if provided
        if (bank) {
            req.organization.bank = {
                name: bank.name || req.organization.bank?.name,
                accountNumber: bank.accountNumber || req.organization.bank?.accountNumber,
                ifsc: bank.ifsc || req.organization.bank?.ifsc,
                accountHolderName: bank.accountHolderName || req.organization.bank?.accountHolderName,
                accountType: bank.accountType || req.organization.bank?.accountType
            };
        }

        // Update social media if provided
        if (socialMedia) {
            req.organization.socialMedia = {
                instagram: socialMedia.instagram || req.organization.socialMedia?.instagram,
                facebook: socialMedia.facebook || req.organization.socialMedia?.facebook,
                twitter: socialMedia.twitter || req.organization.socialMedia?.twitter,
                linkedin: socialMedia.linkedin || req.organization.socialMedia?.linkedin,
                youtube: socialMedia.youtube || req.organization.socialMedia?.youtube,
                website: socialMedia.website || req.organization.socialMedia?.website,
                whatsapp: socialMedia.whatsapp || req.organization.socialMedia?.whatsapp
            };
        }

        await req.organization.save();

        res.status(200).json({
            success: true,
            message: "Organization details updated successfully",
            organization: req.organization
        });

    } catch (error) {
        console.error("Error updating organization details:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update organization details",
            error: error.message
        });
    }
};

export const updateProfilePicture = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ 
                success: false, 
                message: "No image file provided" 
            });
        }

        // Get the old profile picture path
        const oldImage = req.organization.image;

        // Update organization's image path in database
        const relativePath = `uploads/organization/${req.file.filename}`;
        req.organization.image = relativePath;
        await req.organization.save();

        // If there was an old image, delete it
        if (oldImage) {
            const oldPath = `public/${oldImage}`;
            try {
                await fs.access(oldPath); // Check if file exists
                await fs.unlink(oldPath); // Delete the file
            } catch (error) {
                // File doesn't exist or other error, we can ignore
                console.log('Error deleting old organization image:', error);
            }
        }

        res.status(200).json({
            success: true,
            message: "Organization image updated successfully",
            organization: req.organization
        });

    } catch (error) {
        console.error("Error updating organization image:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update organization image",
            error: error.message
        });
    }
};

export const getAllOrganizations = async (req, res) => {
    try {
        const { search } = req.query;
        
        let query = { emailVarified: false }; // Only get verified organizations
        
        // Add search functionality
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const organizations = await Organization.find(query)
            .select('name description image createdEvents') // Added createdEvents
            .sort({ name: 1 });

        res.json({
            success: true,
            organizations
        });
    } catch (error) {
        console.error("Error fetching organizations:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch organizations",
            error: error.message
        });
    }
};

export const getAllOrganizationDetails = async (req, res) => {
    try {
        const organization = await Organization.findById(req.params.id)
            .select('name description image email phone createdEvents socialMedia')
            .populate('createdEvents', 'name description image startDate endDate');

        if (!organization) {
            return res.status(404).json({
                success: false,
                message: "Organization not found"
            });
        }

        res.json({
            success: true,
            organization
        });
    } catch (error) {
        console.error("Error fetching organization details:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch organization details",
            error: error.message
        });
    }
};