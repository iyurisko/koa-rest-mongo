


const http = require('http');
const app = require('./app');
const port = process.env.APP_PORT;
const db = require('./src/config/database')
const { bootstrap: bootstrapSdk } = require('ncurated');



init = async () => {


    /*start add service */

    /*end of the list service */


  // sdk
  if (!global.sdk && !global.sdkClosed) {
    global.sdk = await bootstrapSdk("development");



    // stream
    await sdk.enableStream();
  }


    global.Mongo = await db()

 
    return http.createServer(app.callback()).listen(port);
}


init()
    .then(server =>
        console.log(`🚀 Server listening on port ${server.address().port}!`),
    )
    .catch(err => {
        setImmediate(() => {
            console.error('Unable to run the server because of the following error:');
            console.error(err);
            process.exit();
        });
    });


