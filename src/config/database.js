const {MongoClient} = require('mongodb')
const connectionString =  process.env.APP_DB

module.exports = () =>
  new MongoClient(connectionString, {
    useUnifiedTopology: true,
  })
    .connect()
    .then((client) => {

      // wrap close, if needed
      const db = client.db();
      db.close = client.close;

      console.log("DB Connected!!!")
      

      return db;
    })
    .catch((err) => {
      console.error(err)
      process.exit();
    });
