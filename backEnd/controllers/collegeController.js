import College from '../models/College.js';

// Add multiple colleges
export const addColleges = async (req, res) => {
    try {
        const { colleges } = req.body;
        
        if (!Array.isArray(colleges)) {
            return res.status(400).json({
                success: false,
                message: 'Colleges must be an array'
            });
        }

        const result = await College.insertMany(colleges, { ordered: false });

        res.status(201).json({
            success: true,
            message: `Successfully added ${result.length} colleges`,
            insertedCount: result.length
        });
    } catch (error) {
        console.error('Error adding colleges:', error);
        res.status(500).json({
            success: false,
            message: 'Error adding colleges',
            error: error.message
        });
    }
};

// Get all colleges
export const getAllColleges = async (req, res) => {
    try {
        const { type, search } = req.query;
        console.log(type, search);
        
        let query = {};
        
        if (type) {
            query.type = type.toUpperCase();
        }
        
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        const colleges = await College.find(query)
            .sort({ name: 1 });

        res.status(200).json({
            success: true,
            count: colleges.length,
            colleges
        });
    } catch (error) {
        console.error('Error fetching colleges:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching colleges',
            error: error.message
        });
    }
};

// Delete college
export const deleteCollege = async (req, res) => {
    try {
        const { id } = req.params;
        
        const result = await College.findByIdAndDelete(id);
        
        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'College not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'College deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting college:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting college',
            error: error.message
        });
    }
};

// Add this new controller function
export const updateCollege = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        
        const college = await College.findByIdAndUpdate(
            id,
            updates,
            { new: true, runValidators: true }
        );
        
        if (!college) {
            return res.status(404).json({
                success: false,
                message: 'College not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'College updated successfully',
            college
        });
    } catch (error) {
        console.error('Error updating college:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating college',
            error: error.message
        });
    }
}; 