import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

/*
cookie-parser is a middleware for Node.js and Express.js 
that simplifies the process of working with cookies. 
Cookies are small pieces of data stored in the user's browser,
 often used for session management, user authentication, and tracking.



CORS is a browser security feature that controls cross-origin requests.
A cross-origin request is an HTTP request made by a web application to a resource (e.g., an API or server)
 that has a different origin than the one serving the web application. 
 This is a common scenario in modern web development,
 where a frontend application (e.g., a React app) 
 running on one domain needs to fetch data from a backend API
  hosted on a different domain
*/



const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


// ====== Configuration to handle middleWare =====//
app.use(express.json({limit: "16kb"}))   //--> limiting the json to prevent crashing
app.use(express.urlencoded({extended: true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

export {app}