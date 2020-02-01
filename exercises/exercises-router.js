const router = require("express").Router();

const Exercises = require("./exercises-model");
const restricted = require("../auth/authenticate-middleware");

// UPDATE EXERCISE
router.put("/:id", restricted, (req, res) => {
  const id = req.params.id;
  const body = req.body;
  Exercises.updateExercise(id, body)
    .then(exercise => {
      res.status(200).json({ message: "Exercise successfully modified.", exercise })
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ message: "Error updating exercise." })
    })
});

// DELETE EXERCISE
router.delete("/:id", restricted, (req, res) => {
  const id = req.params.id;
  Exercises.deleteExercise(id)
  .then(deleted => {
    res.status(200).json({message: "Exercise successfully deleted.",deleted})
  })
});

module.exports = router;