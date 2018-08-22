import app from "./app";
import { config } from "./config/config";

const port = config.app.port;

app.listen(port, () => console.log('Express server listening on port ' + port));