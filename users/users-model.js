const db = require("../data/dbConfig");

module.exports = {
  getAll,
  add,
  findBy,
  findById,
}

function getAll() {
  return db("users")
    .select("id", "username")
    .orderBy("id")
};

function add(newUser) {
  return db("users")
    .insert(newUser, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id)
    })
};

function findBy(filter) {
  return db("users")
    .where(filter)
};

function findById(id) {
  return db("users")
    .select("id", "username")
    .where({ id })
    .first();
};
