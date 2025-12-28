const express = require("express");
const redis = require("./redis");
const axios = require("axios");

const app = express();

app.get("/", async (req, res) => {
  const cachedData = await redis.get("todos");

  if (cachedData) return res.json(JSON.parse(cachedData));
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/todos"
  );

  const data = response.data;
  await redis.set("todos", JSON.stringify(data));
  await redis.expire("todos", 30);
  return res.json(data);
});

app.listen(9000, () => console.log("Server running on 9000"));
