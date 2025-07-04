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

export const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) return res.status(404).json({ message: "Trip not found" });

    if (trip.createdBy.toString() !== req.user) {
      return res
        .status(403)
        .json({ message: "Not authorized to view this trip" });
    }

    res.status(200).json(trip);
  } catch (err) {
    console.error("❌ Get Trip by ID error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) return res.status(404).json({ message: "Trip not found" });

    if (trip.createdBy.toString() !== req.user) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this trip" });
    }

    const { title, location, startDate, endDate } = req.body;

    trip.title = title || trip.title;
    trip.location = location || trip.location;
    trip.startDate = startDate || trip.startDate;
    trip.endDate = endDate || trip.endDate;

    const updatedTrip = await trip.save();
    res.status(200).json(updatedTrip);
  } catch (err) {
    console.error("❌ Update Trip error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) return res.status(404).json({ message: "Trip not found" });

    if (trip.createdBy.toString() !== req.user) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this trip" });
    }

    await trip.deleteOne();
    res.status(200).json({ message: "Trip deleted successfully" });
  } catch (err) {
    console.error("❌ Delete Trip error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

