import EarlyAccess from '../models/EarlyAccess.js';

export const saveEarlyAccess = async (req, res) => {
    try {
        const { name, email, phone, userType, role, organizationName, purpose } = req.body;
        
        const earlyAccess = new EarlyAccess({
            name,
            email, 
            phone,
            userType,
            role,
            organizationName,
            purpose
        });

        await earlyAccess.save();

        res.status(201).json({
            success: true,
            message: 'Early access request saved successfully',
            data: earlyAccess
        });
    } catch (error) {
        console.error('Error saving early access request:', error);
        res.status(500).json({
            success: false,
            message: 'Error saving early access request',
            error: error.message
        });
    }
};
