import app from "./app";
import config from './config';

const server = app.listen(config.port, () =>
  console.log(`
    🚀 Server ready at: http://localhost:${config.port}${config.api.prefix}
`))