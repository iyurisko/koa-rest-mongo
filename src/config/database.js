const {MongoClient} = require('mongodb')
const connectionString = "mongodb+srv://inggoDev:ZR1RsrnAnJWy24w1@cluster0.hdilf.mongodb.net/gmart?retryWrites=true&w=majority"
 // process.env.APP_DB

module.exports = () =>
  new MongoClient(connectionString, {
    useUnifiedTopology: true,
  })
    .connect()
    .then((client) => {
      // sdk.log.info('DB connected!', { service: 'database', type: 'mongo' });

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
