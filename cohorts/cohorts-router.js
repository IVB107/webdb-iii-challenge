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

// Use knex seeding feature to add test data to your tables.

// Implement the following endpoints:

//     [POST] /api/cohorts This route should save a new cohort to the database.
//     [GET] /api/cohorts This route will return an array of all cohorts.
//     [GET] /api/cohorts/:id This route will return the cohort with the matching id.
//     [GET] /api/cohorts/:id/students returns all students for the cohort with the specified id.
//     [PUT] /api/cohorts/:id This route will update the cohort with the matching id using information sent in the body of the request.
//     [DELETE] /api/cohorts/:id This route should delete the specified cohort.

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

router.get('/', async (req, res) => {
  // get the cohorts from the database
  try {
    const cohorts = await db('cohorts'); // all the records from the table
    res.status(200).json(cohorts);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // get specific cohort from the database
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

router.get('/:id/students', async (req, res) => {
  // get specific cohort from the database
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

module.exports = router;