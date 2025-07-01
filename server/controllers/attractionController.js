const Attraction = require("../models/Attraction");

exports.addAttraction = async (req, res) => {
  try {
    const { name, description, image, tripId } = req.body;
    const attraction = new Attraction({
      name,
      description,
      image,
      trip: tripId,
    });
    await attraction.save();
    res.status(201).json(attraction);
  } catch (err) {
    res.status(500).json({ message: "Failed to add attraction" });
  }
};

exports.voteAttraction = async (req, res) => {
  try {
    const { attractionId } = req.params;
    const { vote } = req.body;
    const userId = req.user;

    const attraction = await Attraction.findById(attractionId);
    const existingVote = attraction.votes.find(
      (v) => v.user.toString() === userId
    );

    if (existingVote) {
      existingVote.vote = vote;
    } else {
      attraction.votes.push({ user: userId, vote });
    }

    await attraction.save();
    res.json(attraction);
  } catch (err) {
    res.status(500).json({ message: "Failed to cast vote" });
  }
};

exports.getAttractionsByTrip = async (req, res) => {
  try {
    const attractions = await Attraction.find({ trip: req.params.tripId });
    res.json(attractions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch attractions" });
  }
};
