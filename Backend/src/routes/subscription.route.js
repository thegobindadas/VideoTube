import { Router } from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import {
    toggleSubscription,
    getChannelSubscribers,
    getSubscribedChannels,
} from "../controllers/subscription.controller.js"



const router = Router();
router.use(verifyJWT);




router.route("/c/:channelId").post(toggleSubscription);

router.route("/Channel-subscribers/:subscriberId").get(getChannelSubscribers);

router.route("/subscribed-channels/:channelId").get(getSubscribedChannels)








export default router