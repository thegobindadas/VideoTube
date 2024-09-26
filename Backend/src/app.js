import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import config from "./config/index.js"


const app = express()


app.use(cors({
    origin: config.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())



// import routes
import userRouter from "./routes/user.route.js"
import videoRouter from "./routes/video.route.js"
import tweetRouter from "./routes/tweet.route.js"
import commentRouter from "./routes/comment.route.js"
import subscriptionRouter from "./routes/subscription.route.js"


// use routes
app.use("/api/v1/user", userRouter)
app.use("/api/v1/video", videoRouter)
app.use("/api/v1/tweet", tweetRouter)
app.use("/api/v1/comments", commentRouter)
app.use("/api/v1/subscriptions", subscriptionRouter)




export { app }