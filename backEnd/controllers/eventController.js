import Event from "../models/Event.js";



export const addEvent = async (req, res) => {
    const { eventDetails } = req.body;
    console.log("Parsed Form Data:", {
        "data": req.body
    });
    res.json({ success: true });
};