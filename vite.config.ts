import * as path from "node:path";
import * as fs from "node:fs";

import {spotify, host, dev} from './config.json';

export default {
  root:path.resolve("./src"),
  server: {
    port:3000
  },
  define: {
    DEV:dev,
    api: {
      host
    },
    spotify: {
      client: spotify.client
    }
  }
}