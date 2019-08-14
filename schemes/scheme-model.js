const db = require("../data/db.config");

module.exports = {
  find,
  findById,
  findSteps
};

function find() {
  return db("schemes");
}

function findById(id) {
  return db("schemes").where({ id });
}

function findSteps(id) {
  /*
select schemes.scheme_name, steps.step_number, steps.instructions
from schemes
join steps on steps.scheme_id = schemes.id
where schemes.id = 2
order by step_number
*/

  // WHY IS THIS RETURNING SCHEME_ID ???

  return db("schemes.scheme_name", "steps.step_number", "steps.instructions")
    .from("schemes")
    .join("steps", "steps.scheme_id", "=", "schemes.id")
    .where({ "schemes.id": id })
    .orderBy("step_number");
}
