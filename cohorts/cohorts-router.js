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

// POST --> /api/cohorts
router.post('/', async (req, res) => {
  try {
    const [id] = await db('cohorts').insert(req.body);

    const cohort = await db('cohorts')
      .where({ id })
      .first();

    res.status(201).json(cohort);
  } catch (error) {
    const message = errors[error.errno] || 'We ran into an error';
    res.status(500).json({ message, error });
  }
})

// GET --> /api/cohorts
router.get('/', async (req, res) => {
  // get the cohorts from the database
  try {
    const cohorts = await db('cohorts'); // all the records from the table
    res.status(200).json(cohorts);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET --> /api/cohorts/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const cohort = await db('cohorts')
      .where({ id })
      .first();
    res.status(200).json(cohort);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// GET --> /api/cohorts/:id/students
router.get('/:id/students', async (req, res) => {
  const { id } = req.params;

  try {
    students = await db('students')
      .where({ cohort_id: id });
    res.status(200).json(students);
  } catch (err) {
    console.log(error);
    res.status(500).json(error);
  }
});

// PUT --> /api/cohorts/:id
router.put('/:id', async (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  try {
    count = await db('cohorts')
      .where({ id })
      .update(changes);

      if (count > 0){
        const cohort = await db('cohorts')
          .where({ id })
          .first();
        res.status(200).json(cohort);
      } else {
        res.status(404).json({ message: "Cohort not found." });
      }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

// DELETE --> /api/cohorts/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    count = await db('cohorts')
      .where({ id })
      .del();

      count > 0
        ? res.status(204).end()
        : res.status(404).json({ message: "Cohort not found." });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

module.exports = router;