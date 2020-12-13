import mongoConnect from './services/mongoose';
import app from './services/express';

const port = process.env.PORT || 3001;

mongoConnect
  .then(() => {
    // tslint:disable-next-line: no-console
    console.log('=====> DB connected <===== \n');

    /**
     * Listen on provided port, on all network interfaces.
     */
    app.listen(port, () => {
      // tslint:disable-next-line: no-console
      console.log('Server is listening in port', port, '\n');
    });
    app.on('error', onError);
    // app.on('listening', onListening);
  })
  .catch((err) => {
    // tslint:disable-next-line: no-console
    console.log('err connecting DB', err);
  });

function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
    default:
      throw error;
  }
}
