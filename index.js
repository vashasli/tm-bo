import express from "express";
import { startbot } from "./bot.js";
const app = express();

// app.get("/", (req, res) => {
//   res.send("connect to server");
// });


// server.js یا app.js

app.get("/telegram", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>EmenKaran MiniApp</title>
      </head>
      <body style="text-align:center; font-family:sans-serif;">
        <h1>امین کاران 🚒</h1>
        <p>خوش اومدی به مینی اپ ما!</p>
        <button onclick="alert('شما وارد سایت emenkaran.com شدید')">
          تست دکمه
        </button>
      </body>
    </html>
  `);
});

app.listen(3000, () => console.log("Server is running..."));
startbot();
