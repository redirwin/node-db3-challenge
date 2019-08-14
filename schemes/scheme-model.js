const db = require("../data/db.config");

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
};

function find() {
  return db("schemes");
}

function findById(id) {
  return db("schemes")
    .where({ id })
    .first();
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

function add(scheme) {
  // ADDS, BUT HOW TO RESOLVE TO THAT SCHEME WITH ID ??

  return db("schemes").insert(scheme);
}

function update(changes, id) {
  return db("schemes")
    .where({ id })
    .update(changes);
}

async function remove(id) {
  await db("schemes")
    .delete()
    .where({ "schemes.id": id });

  return find();
}
