const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();
const port = 5000;

const cohortsRouter = require('./cohorts/cohorts-router.js');
const studentsRouter = require('./students/students-router.js');

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use('/api/cohorts', cohortsRouter);
server.use('/api/students', studentsRouter);

server.listen(port, () => {
  console.log(`\n** API running on http://localhost:${port} **\n`);
});