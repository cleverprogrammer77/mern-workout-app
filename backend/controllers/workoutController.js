const Workout = require("../models/workoutModel");

//get all workouts
const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });
  res.status(200).json(workouts);
};

//get single workout
const getSingleWorkout = async (req, res) => {
  const { id } = req.params;
  const workout = await Workout.findById(id);
  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }
  res.status(200).json(workout);
};

//create a workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;
  try {
    const workout = await Workout.create({ title, reps, load });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//deletes a workout

const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  const workout = await Workout.findOneAndDelete(id);
  if (!workout) {
    return res.status(404).json({ error: "No such id" });
  }
  res.status(200).json(workout);
};

//updates a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!workout) {
    return res.status(404).json({ error: "no such id" });
  }
  res.status(200).json(workout);
};

module.exports = {
  createWorkout,
  getWorkouts,
  getSingleWorkout,
  deleteWorkout,
  updateWorkout,
};
