const SOS = require("../models/SOS");

const createSOS = async (req, res, next) => {
  try {
    const { emergencyType, notes } = req.body;

    const sos = await SOS.create({
      userId: req.user._id,
      emergencyType,
      notes,
    });

    res.status(201).json({
      success: true,
      message: "SOS created successfully",
      data: sos,
    });
  } catch (error) {
    next(error);
  }
};

const getSOSHistory = async (req, res, next) => {
  try {
    const history = await SOS.find({
      userId: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: history,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSOS,
  getSOSHistory,
};