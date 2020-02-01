const router = require("express").Router();

const Users = require("./users-model");
const Exercises = require("../exercises/exercises-model");
const restricted = require("../auth/authenticate-middleware");

// GET all users
router.get("/", restricted, (req, res) => {
  Users.getAll()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ message: "Error retrieving users." })
    })
});

// GET Exercises for a Specific User ID
router.get("/:id/exercises", restricted, (req, res) => {
  const id = req.params.id;
  Exercises.userExercises(id)
  .then(exercises => {
    res.status(200).json(exercises)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({message: "Error retrieving exercises."})
  })
});

// POST new exercise
router.post("/:id/exercises", restricted, (req, res) => {
  let exercise = req.body;
  exercise.user_id = req.params.id;
  Exercises.addExercise(exercise)
  .then(newExercise => {
    res.status(201).json({message: "New exercise successfully added."})
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({message: "Error adding new exercise", error})
  })
});

module.exports = router;