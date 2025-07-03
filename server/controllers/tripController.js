import Trip from "../models/Trip.js";

export const createTrip = async (req, res) => {
  try {
    const { title, location, startDate, endDate } = req.body;

    // Optional: Use req.user from the protect middleware if needed
    const newTrip = new Trip({
      title,
      location,
      startDate,
      endDate,
      createdBy: req.user, // assuming you want to associate it with a user
    });

    await newTrip.save();

    res.status(201).json(newTrip);
  } catch (err) {
    console.error("❌ Create Trip error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ createdBy: req.user });
    res.status(200).json(trips);
  } catch (err) {
    console.error("❌ Get Trips error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
