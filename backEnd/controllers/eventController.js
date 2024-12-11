import Event from "../models/Event.js";
import path from "path";

// Add Event Controller
export const addEvent = async (req, res) => {
  console.log(req.organization);
  // return;
  try {
    const {
      name,
      description,
      date,
      duration,
      location,
      status,
      visibility,
      maxAttendees,
      registrationRequired,
      registrationFee,
      registrationDeadline,
      resources,
      socialLinks,
    } = req.body;

    // Handle file path for the uploaded banner image
    console.log(req.file);
    const bannerImage = req.file ? `uploads/event/${req.file.filename}` : null;

    // Parse JSON fields (resources and socialLinks)
    const parsedResources = resources ? JSON.parse(resources) : [];
    const parsedSocialLinks = socialLinks ? JSON.parse(socialLinks) : {};

    // Create a new event document
    const newEvent = new Event({
      name,
      description,
      date,
      duration,
      location,
      status,
      visibility,
      maxAttendees,
      registrationRequired: registrationRequired === "true", // Convert to boolean
      registrationFee,
      registrationDeadline,
      bannerImage,
      resources: parsedResources,
      socialLinks: parsedSocialLinks,
      organizer: req.organization._id
    });

    // Save the event to the database
    await newEvent.save();

    res.status(201).json({
      success: true,
      message: "Event created successfully!",
      event: newEvent,
    });
  } catch (error) {
    console.error("Error adding event:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create event.",
      error: error.message,
    });
  }
};

// Get All Events Controller
export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find()
            .populate('organizer', 'name email logo') // Populate organizer details
            .select('-resources -socialLinks') // Exclude detailed fields for list view
            .sort({ date: 1 }); // Sort by date ascending

        // Calculate additional statistics for each event
        const eventsWithStats = events.map(event => {
            const eventObj = event.toObject();
            
            // Calculate registration status
            const spotsRemaining = event.maxAttendees === -1 ? 
                'Unlimited' : 
                Math.max(0, event.maxAttendees - event.totalRegistrations);
            
            // Calculate if registration is still open
            const isRegistrationOpen = event.registrationRequired ? 
                new Date(event.registrationDeadline) > new Date() : 
                true;

            return {
                ...eventObj,
                spotsRemaining,
                isRegistrationOpen,
                registrationProgress: event.maxAttendees === -1 ? 
                    'Unlimited' : 
                    `${event.totalRegistrations}/${event.maxAttendees}`
            };
        });

        res.status(200).json({
            success: true,
            count: events.length,
            events: eventsWithStats
        });
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch events.",
            error: error.message
        });
    }
};

// Get Organization's Events Controller
export const getOrganizationEvents = async (req, res) => {
    try {
        // Get events where organizer matches the authenticated organization's ID
        const events = await Event.find({ organizer: req.organization._id })
            .populate('organizer', 'name email logo')
            .sort({ date: 1 });

        // Calculate additional statistics for each event
        const eventsWithStats = events.map(event => {
            const eventObj = event.toObject();
            
            // Calculate registration status
            const spotsRemaining = event.maxAttendees === -1 ? 
                'Unlimited' : 
                Math.max(0, event.maxAttendees - event.totalRegistrations);
            
            // Calculate if registration is still open
            const isRegistrationOpen = event.registrationRequired ? 
                new Date(event.registrationDeadline) > new Date() : 
                true;

            return {
                ...eventObj,
                spotsRemaining,
                isRegistrationOpen,
                registrationProgress: event.maxAttendees === -1 ? 
                    'Unlimited' : 
                    `${event.totalRegistrations}/${event.maxAttendees}`
            };
        });
        console.log(eventsWithStats);
        res.status(200).json({
            success: true,
            count: events.length,
            events: eventsWithStats
        });
    } catch (error) {
        console.error("Error fetching organization events:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch organization events.",
            error: error.message
        });
    }
};

// Add this new controller function
export const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
            .populate('organizer', 'name email logo')
            .populate('attendees', 'name email');

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        // Calculate additional statistics
        const spotsRemaining = event.maxAttendees === -1 ? 
            'Unlimited' : 
            Math.max(0, event.maxAttendees - event.totalRegistrations);
        
        const isRegistrationOpen = event.registrationRequired ? 
            new Date(event.registrationDeadline) > new Date() : 
            true;

        const eventWithStats = {
            ...event.toObject(),
            spotsRemaining,
            isRegistrationOpen,
            registrationProgress: event.maxAttendees === -1 ? 
                'Unlimited' : 
                `${event.totalRegistrations}/${event.maxAttendees}`
        };
        console.log(eventWithStats);
        res.status(200).json({
            success: true,
            event: eventWithStats
        });
    } catch (error) {
        console.error("Error fetching event details:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch event details",
            error: error.message
        });
    }
};
