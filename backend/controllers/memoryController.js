require("dotenv/config");
const jwt = require("jsonwebtoken");
const Save = require("../models/save");
const User = require("../models/user");

exports.saveGameData = async (req, res) => {
  const { userID, gameDate, failed, difficulty, completed, timeTaken } =
    req.body;

  console.log("Received data to save:", req.body);

  try {
    if (
      !userID ||
      !gameDate ||
      difficulty === undefined ||
      completed === undefined ||
      timeTaken === undefined
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newSave = new Save({
      userID,
      gameDate,
      failed,
      difficulty,
      completed,
      timeTaken,
    });

    await newSave.save();
    res.status(201).json({ message: "Game data saved successfully" });
  } catch (error) {
    console.error("Error saving game data:", error);
    res.status(500).json({ message: "Error saving game data", error });
  }
};

exports.fetchGameData = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const secret = process.env.JWT_SECRET;

    const { id } = jwt.verify(token, secret);

    const userResults = await Save.find({ userID: id });

    return res.status(200).json(userResults);
  } catch (error) {
    console.error("Error retrieving game data:", error);
    res.status(500).json({ message: "Error retrieving game data", error });
  }
};
