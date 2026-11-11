import { config } from "dotenv";

export function loadProjectEnvironment() {
  config({ path: ".env", override: false, quiet: true });
}
