import jwt from 'jsonwebtoken';

export const generateToken = (payload, expiresIn = '7d') => {
    try {
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
        return token;
    } catch (error) {
        console.error('Error generating token:', error);
        throw new Error('Token generation failed');
    }
};
