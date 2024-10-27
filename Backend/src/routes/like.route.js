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




router.route("/video/:videoId/like-toggle").post(toggleVideoLikeDislike);

router.route("/video/:videoId/like-status").get(isVideoLikeDislike);

router.route("/toggle/comment/:commentId").post(toggleCommentLikeDislike);

router.route("/toggle/tweet/:tweetId").post(toggleTweetLikeDislike);

router.route("/videos").get(getLikedVideos);









export default router