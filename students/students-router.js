const router = require('express').Router();
const knex = require('knex');

const knexConfig = {
  client: 'sqlite3',
  connection: {
    filename: './data/lambda.sqlite3'
  },
  useNullAsDefault: true
}

const db = knex(knexConfig);

// C R U D

// POST --> /api/students
router.post('/', async (req, res) => {
  try {
    const [id] = await db('students').insert(req.body);

    const student = await db('students')
      .where({ cohort_id: id })
      .first();

    res.status(201).json(student);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "We ran into an error" });
  }
})

// GET --> /api/students
router.get('/', async (req, res) => {
  // get the students from the database
  try {
    const students = await db('students'); // all the records from the table
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET --> /api/students/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const student = await db('students')
      .where({ id })
      .first();
    res.status(200).json(student);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// PUT --> /api/students/:id
router.put('/:id', async (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  try {
    count = await db('students')
      .where({ id })
      .update(changes);

      if (count > 0){
        const student = await db('students')
          .where({ id })
          .first();
        res.status(200).json(student);
      } else {
        res.status(404).json({ message: "Student not found." });
      }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

// DELETE --> /api/students/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    count = await db('students')
      .where({ id })
      .del();

      count > 0
        ? res.status(204).end()
        : res.status(404).json({ message: "Student not found." });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

module.exports = router;