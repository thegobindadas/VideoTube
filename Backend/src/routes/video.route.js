import { Router } from "express"
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { 
    publishAVideo,
    getVideoById,
    getVideoDetailsById,
    updateVideoDetails,
    deleteVideo,
    togglePublishStatus,
    getAllVideos,
    getRecommendedVideos,
} from "../controllers/video.controller.js"



const router = Router()
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file



router.route("/").post(
    upload.fields([
        {
            name: "videoFile",
            maxCount: 1,
        },
        {
            name: "thumbnail",
            maxCount: 1,
        },
        
    ]),
    publishAVideo
);

router.route("/:videoId").get(getVideoById)

router.route("/:videoId/info").get(getVideoDetailsById)
    
router.route("/:videoId").patch(upload.single("thumbnail"), updateVideoDetails);

router.route("/:videoId").delete(deleteVideo)

router.route("/toggle/publish/:videoId").patch(togglePublishStatus);

router.route("/").get(getAllVideos)

router.route("/recommended-videos/:videoId").get(getRecommendedVideos)







export default router