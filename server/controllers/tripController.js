import Trip from "../models/Trip.js";
import asyncHandler from "../middleware/asyncHandler.js";

// @desc    Create a new trip
// @route   POST /api/trips/create
// @access  Private
export const createTrip = asyncHandler(async (req, res) => {
  const { title, location, startDate, endDate } = req.body;

  if (!title || !location || !startDate || !endDate) {
    res.status(400);
    throw new Error("Missing required fields");
  }

  const newTrip = new Trip({
    title,
    location,
    startDate,
    endDate,
    createdBy: req.user, // user id string
  });

  const savedTrip = await newTrip.save();
  res.status(201).json(savedTrip);
});

// @desc    Get all trips by the logged-in user
// @route   GET /api/trips/my-trips
// @access  Private
export const getUserTrips = asyncHandler(async (req, res) => {
  const trips = await Trip.find({ createdBy: req.user }).sort({
    createdAt: -1,
  });
  res.status(200).json(trips);
});

// @desc    Get a single trip by ID
// @route   GET /api/trips/:id
// @access  Private
export const getTripById = asyncHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.id);

  if (!trip) {
    res.status(404);
    throw new Error("Trip not found");
  }

  if (trip.createdBy.toString() !== req.user) {
    res.status(403);
    throw new Error("Not authorized to view this trip");
  }

  res.status(200).json(trip);
});

// @desc    Update a trip by ID
// @route   PUT /api/trips/:id
// @access  Private
export const updateTripById = asyncHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.id);

  if (!trip) {
    res.status(404);
    throw new Error("Trip not found");
  }

  if (trip.createdBy.toString() !== req.user) {
    res.status(403);
    throw new Error("Not authorized to update this trip");
  }

  const { title, location, startDate, endDate } = req.body;

  trip.title = title || trip.title;
  trip.location = location || trip.location;
  trip.startDate = startDate || trip.startDate;
  trip.endDate = endDate || trip.endDate;

  const updatedTrip = await trip.save();
  res.status(200).json(updatedTrip);
});

// @desc    Delete a trip by ID
// @route   DELETE /api/trips/:id
// @access  Private
export const deleteTripById = asyncHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.id);

  if (!trip) {
    res.status(404);
    throw new Error("Trip not found");
  }

  if (trip.createdBy.toString() !== req.user) {
    res.status(403);
    throw new Error("Not authorized to delete this trip");
  }

  await trip.deleteOne();
  res.status(200).json({ message: "Trip deleted successfully" });
});
