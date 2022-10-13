const { Pool } = require('pg')
// const pool = new Pool({
//   user: process.env.PGUSER,
//   host: process.env.PGHOST,
//   database: process.env.PGDATABASE,
//   password: process.env.PGPASSWORD,
//   port: process.env.PGPORT,
//   ssl: true
// })

const pool = new Pool({
    connectionString: 'postgres://zdmtgfpfjvqpvx:ea25b133bb8c4a95929cf878e556a3e8b1b457f7d9f53a4c27fad942cfe7dd6f@ec2-54-173-237-110.compute-1.amazonaws.com:5432/d5v9i8nm52uoqr',
    ssl: {
      rejectUnauthorized: false
    }
  });


module.exports = {pool}