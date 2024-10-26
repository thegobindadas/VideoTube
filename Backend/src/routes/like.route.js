import { Router } from 'express';
import { verifyJWT } from "../middlewares/auth.middleware.js"
import {
    getLikedVideos,
    toggleVideoLikeDislike,
    isVideoLikeDislike,
    toggleCommentLikeDislike,
    toggleTweetLikeDislike,
} from "../controllers/like.controller.js"




const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file




router.route("/toggle/v/:videoId").post(toggleVideoLikeDislike);

router.route("/like-status/v/:videoId").get(isVideoLikeDislike);

router.route("/toggle/c/:commentId").post(toggleCommentLikeDislike);

router.route("/toggle/t/:tweetId").post(toggleTweetLikeDislike);

router.route("/videos").get(getLikedVideos);









export default router