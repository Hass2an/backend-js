import express from "express"
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.ORS_ORIGN,
    credentials: true,
    
}));


app.use(express.json({limit:"16kb"})); // Parses incoming JSON data in the request body with a limit of 16 kilobytes.
app.use(express.urlencoded({extended : true,
    limit:"16kb"})); // they upadete url with special characters
app.use(express.static("public")); // Serves static files (e.g., PDFs and images) from the "public" directory to make them accessible via specific URLs.

app.use(cookieParser()); //Parses and manages cookies sent by clients in HTTP requests for reading and setting cookies.


// route import

import userRouter from "./routes/user.routes.js"

// declearton of router

app.use("/api/v1/users",userRouter)


export {app}