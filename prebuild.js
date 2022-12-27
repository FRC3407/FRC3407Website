const fs = require("fs");
const path = require("path");

fs.writeFileSync(
  path.join(process.cwd(), "json", "metrics.json"),
  JSON.stringify([])
);
