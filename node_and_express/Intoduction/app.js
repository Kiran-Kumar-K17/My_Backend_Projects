// const names = require("./4_names");
// const sayHi = require("./3_utils");
// const myObject = require("./5_alternative");
// require("./7_addition");

// const Pavan = "Pavan";
// sayHi("Suraj");
// sayHi(names.jeevan);
// sayHi(names.kiran);
// sayHi(Pavan);

// console.log(myObject);

// const os = require("os");
// const user = os.userInfo();

// user info
// console.log(user);

// console.log(`The System Uptime: ${os.uptime()} in seconds`);

// os information

// const currentOs = {
//   name: os.type(),
//   release: os.release(),
//   totalMemory: os.totalmem(),
//   freeMemory: os.freemem(),
// };

// console.log(currentOs);

const Http = require("http");

const server = Http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("Welcome To My Website Home Page");
  } else if (req.url === "/about") {
    res.end("Welcome to About Page");
  } else {
    res.end(`
    <h1>Oop's .... Page Not Found</h1>
    <a href="/">Go To Home</a>
    `);
  }
});

server.listen(5000);
