'use strict';

import database from 'infra/database';

async function status(request, response) {
  const result = await database.query('SELECT 1 + 1 AS SUM;');
  console.log(result.rows);
  return response.status(200).json({ message: 'Hello API!' });
}

export default status;
