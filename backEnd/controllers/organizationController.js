import Organization from '../models/Organization.js';

export const getProfile = (req, res) => {
    try {
        console.log(req.organization);
        res.json(req.organization);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
}

export const updateDescription = async (req, res) => {
    try {
        const { description } = req.body;
        if (!description) {
            return res.status(400).json({ message: "Description is required." });
        }
        req.organization.description = description;
        await req.organization.save();
        res.status(200).json({ message: "Organization has been updated.", organization: req.organization });
    } catch (error) {
        console.error("Error updating organization description:", error);
        res.status(500).json({ message: "Failed to update organization description.", error: error.message });
    }
}

export const updateBank = async (req, res) => {
    try {
        const bank = req.body;
        // console.log(bank);
        if (!bank) {
            return res.status(400).json({ message: "Bank details are required." });
        }
        req.organization.bank = bank;
        await req.organization.save();
        res.status(200).json({ message: "Organization has been updated.", organization: req.organization });
    } catch (error) {
        console.error("Error updating organization bank details:", error);
        res.status(500).json({ message: "Failed to update organization bank details.", error: error.message });
    }
}

export const updatePhone = async (req, res) => {
    try {
        const { phone } = req.body;
        if (!phone) {
            return res.status(400).json({ message: "Phone number is required." });
        }
        req.organization.phone = phone;
        await req.organization.save();
        res.status(200).json({ message: "Organization has been updated.", organization: req.organization });
    } catch (error) {
        console.error("Error updating organization phone number:", error);
        res.status(500).json({ message: "Failed to update organization phone number.", error: error.message });
    }
}