import { Router } from "express"
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { 
    publishAVideo,
    fetchVideoById,
    fetchVideoDetails,
    updateVideoInfo,
    removeVideo,
    toggleVideoPublishStatus,
    getAllVideos,
    increaseViewCount,
    fetchRecommendedVideos,
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

router.route("/:videoId").get(fetchVideoById)

router.route("/:videoId/details").get(fetchVideoDetails)
    
router.route("/:videoId/update").patch(upload.single("thumbnail"), updateVideoInfo);

router.route("/:videoId/delete").delete(removeVideo)

router.route("/:videoId/toggle-publish").patch(toggleVideoPublishStatus);

router.route("/").get(getAllVideos)

router.route("/:videoId/view").post(increaseViewCount)

router.route("/:videoId/recommendations").get(fetchRecommendedVideos)







export default router