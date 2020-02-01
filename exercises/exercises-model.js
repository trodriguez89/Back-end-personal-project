const db = require("../data/dbConfig");

module.exports = {
  userExercises,
  addExercise,
  getById,
  updateExercise,
  deleteExercise
}

function userExercises(id) {
  return db("exercises")
    .join("users", "exercises.user_id", "users.id")
    .select("exercises.id", "exercises.date", "exercises.name", "exercises.body_region", "exercises.weight", "exercises.reps", "exercises.sets", "exercises.journal", "exercises.user_id")
    .where("exercises.user_id", id);
};

function addExercise(exercise) {
  return db("exercises")
  .insert(exercise);
};

function getById(id) {
  return db("exercises")
    .where({ id })
    .first();
};

function updateExercise(id, changes) {
  return db("exercises")
    .where({ id })
    .update(changes);
};

function deleteExercise(id) {
  return db("exercises")
    .where({ id })
    .del();
};