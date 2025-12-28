const redis = require("./redis");

async function init() {
  await redis.expire("user:4", 10);
  const result = await redis.get("user:4");
  console.log(result);
}
init();
