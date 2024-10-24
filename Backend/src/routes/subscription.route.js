import { Router } from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import {
    isSubscribed,
    toggleSubscription,
    getChannelSubscribers,
    getSubscribedChannels,
} from "../controllers/subscription.controller.js"



const router = Router();
router.use(verifyJWT);




router.get('/c/subscription-status/:channelId', isSubscribed);

router.route("/c/:channelId").post(toggleSubscription);

router.route("/Channel-subscribers/:subscriberId").get(getChannelSubscribers);

router.route("/subscribed-channels/:channelId").get(getSubscribedChannels)








export default router