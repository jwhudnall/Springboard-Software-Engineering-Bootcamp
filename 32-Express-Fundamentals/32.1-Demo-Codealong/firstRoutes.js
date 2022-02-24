const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  return res.send("Home Page");
});

const greetings = {
  en: "hello",
  fr: "bonjour",
};

app.get("/greet/:language", (req, res) => {
  const greeting = greetings[req.params.language];
  console.log(req.params);
  res.send(`${greeting}!`);
});

app.get("/dogs", (req, res) => {
  res.send("<h1>Dogs here!</h1>");
});

app.post("/chickens", (req, res) => {});

app.get("/search", (req, res) => {
  console.log(req.query);
  const { term, color } = req.query;
  return res.send(`Search results for ${term}: Color: ${color}`);
});

app.get("/show-language", (req, res) => {
  const lang = req.headers["accept-language"];
  return res.send(`Your preferred language is ${lang}`);
});

app.post("/register", (req, res) => {
  return res.send(req.body);
});

app.listen(3000, function () {
  console.log("App started on port 3000...");
});
