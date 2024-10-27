import { Router } from 'express';
import { verifyJWT } from "../middlewares/auth.middleware.js"
import {
    createPlaylist,
    addVideoToPlaylist,
    getPlaylistById,
    getUserPlaylists,
    updatePlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
} from "../controllers/playlist.controller.js"



const router = Router();
router.use(verifyJWT);




router.route("/").post(createPlaylist)

router.route("/user/:userId").get(getUserPlaylists);

router.route("/:playlistId").get(getPlaylistById)

router.route("/:playlistId").patch(updatePlaylist)
   
router.route("/:playlistId").delete(deletePlaylist);

router.route("/add/video/:videoId/:playlistId/video").patch(addVideoToPlaylist);

router.route("/remove/video/:videoId/:playlistId").patch(removeVideoFromPlaylist);








export default router