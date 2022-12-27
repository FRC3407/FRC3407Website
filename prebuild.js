const fs = require("fs");
const path = require("path");

fs.writeFileSync(
  path.join(process.cwd(), "public", "metrics.json"),
  JSON.stringify([])
);
