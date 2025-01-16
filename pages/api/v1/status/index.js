'use strict';

import database from 'infra/database';

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const databaseVersionResult = await database.query({
    text: 'SHOW server_version;',
  });
  const databaseVersion = databaseVersionResult.rows[0].server_version;

  const databaseMaxConnectionsResult = await database.query({
    text: 'SHOW max_connections;',
  });
  const databaseMaxConnections =
    databaseMaxConnectionsResult.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnectionsResult = await database.query({
    text: 'SELECT count(*) FROM pg_stat_activity WHERE datname = $1;',
    values: [databaseName],
  });
  const databaseOpenedConnections =
    databaseOpenedConnectionsResult.rows[0].count;

  return response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersion,
        max_connections: parseInt(databaseMaxConnections),
        opened_connections: parseInt(databaseOpenedConnections),
      },
    },
  });
}

export default status;
