import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import tweetService from "../../services/tweetService"
import { setSingleTweet } from "../../store/channelTweetSlice"


function TweetInputField() {

    const [tweetText, setTweetText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const userData = useSelector((state) => state.user.user)
    const dispatch = useDispatch();


    const handleInputChange = (event) => {
        setTweetText(event.target.value);
    };


    const handleTweetSubmit = async () => {
        if (!tweetText.trim()) {
            alert("Tweet cannot be empty!");
            return;
        }

        setIsSubmitting(true);
        try {

            const res = await tweetService.writeNewTweet(tweetText.trim());
            console.log(res);
            

            if (res.data.owner === userData._id) {
                const newTweet = {
                    _id: res.data._id,
                    content: res.data.content,
                    owner: {
                    _id: userData._id,
                    username: userData.username,
                    fullName: userData.fullName,
                    avatar: userData.avatar,
                    },
                    createdAt: res.data.createdAt,
                    updatedAt: res.data.updatedAt,
                    likeCount: 0,
                    dislikeCount: 0,
                };
                
                dispatch(setSingleTweet( newTweet ));
                setTweetText('');
            } else {
                console.error("Error: Response owner mismatch.");
            }
        } catch (err) {
            console.error("Error submitting tweet:", err);
            alert("Failed to submit tweet. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

  return (
    <div className="mt-2 border pb-2">
        <textarea
            className="mb-2 h-10 w-full resize-none border-none bg-transparent px-3 pt-2 outline-none"
            placeholder="Write a tweet"
            value={tweetText}
            onChange={handleInputChange}
            maxLength={280}
            disabled={isSubmitting}
            aria-label="Tweet input"
        ></textarea>
        <div className="flex items-center justify-end gap-x-3 px-3">
            <button className="inline-block h-5 w-5 hover:text-[#ae7aff]">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"></path>
                </svg>
            </button>
            <button className="inline-block h-5 w-5 hover:text-[#ae7aff]">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"></path>
                </svg>
            </button>
            <button 
             className="bg-[#ae7aff] px-3 py-2 font-semibold text-black"
             onClick={handleTweetSubmit}
             disabled={isSubmitting}
            >
                {isSubmitting ? "Sending..." : "Send"}
            </button>
        </div>
    </div>
  )
}

export default TweetInputField
