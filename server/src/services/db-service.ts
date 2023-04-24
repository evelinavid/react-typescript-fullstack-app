import mysql from 'mysql2';
import config from 'config';

const connect = (callback: VoidFunction) => {
  const connection = mysql.createConnection(config.database);

  connection.query('select 1', (err) => {
    if (err != null) {
      console.log('Problem connecting to database');
      throw err;
    }
    callback();
    connection.end();
  });
};
const DBService = {
  connect,
};

export default DBService;
