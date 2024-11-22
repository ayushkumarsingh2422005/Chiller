import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Organization from '../models/Orginization.js';

/**
 * Middleware to verify JWT token
 */
export const authenticateUser = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        if (decoded.type === 'user') {
            req.user = await User.findById(decoded.id).select('-password'); // Attach user to request
            if (!req.user) throw new Error();
        } else if (decoded.type === 'organization') {
            req.organization = await Organization.findById(decoded.id).select('-password'); // Attach org to request
            if (!req.organization) throw new Error();
        }
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Invalid token' });
    }
};

/**
 * Middleware to check organization token
 */
export const authenticateOrganization = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.organization = await Organization.findById(decoded.organizationId).select('-password'); // Attach org to request
        if (!req.organization) throw new Error();
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Invalid token' });
    }
};