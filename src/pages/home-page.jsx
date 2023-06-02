import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadInstaPosts, addInstaPost, updateInstaPost, removeInstaPost } from '../store/instaPost.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { instaPostService } from '../services/instaPost.service.js'
import { utilService } from '../services/util.service.js'
import { LongTxt } from '../cmps/long-txt.jsx'

import { AiOutlineHeart } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";
import { GrBookmark } from "react-icons/gr";

export function HomePage() {

    const instaPosts = useSelector(storeState => storeState.instaPostModule.instaPosts)

    useEffect(() => {
        loadInstaPosts()
    }, [])

    async function onRemoveInstaPost(instaPostId) {
        try {
            await removeInstaPost(instaPostId)
            showSuccessMsg('InstaPost removed')
        } catch (err) {
            showErrorMsg('Cannot remove instaPost')
        }
    }

    async function onAddInstaPost() {
        const instaPost = instaPostService.getEmptyInstaPost()
        try {
            const savedInstaPost = await addInstaPost(instaPost)
            showSuccessMsg(`InstaPost added (id: ${savedInstaPost._id})`)
        } catch (err) {
            showErrorMsg('Cannot add instaPost')
        }
    }

    async function onUpdateInstaPost(instaPost) {
        const txt = prompt('New txt?')
        const instaPostToSave = { ...instaPost, txt }
        try {
            const savedInstaPost = await updateInstaPost(instaPostToSave)
            showSuccessMsg(`InstaPost updated, new txt: ${savedInstaPost.txt}`)
        } catch (err) {
            showErrorMsg('Cannot update instaPost')
        }
    }


    function onAddInstaPostMsg(instaPost) {
        console.log(`TODO Adding msg to instaPost`)
    }

    return (
        <div>
            <h3>Shamstagram App</h3>
            <main>
                <button onClick={onAddInstaPost}>Add InstaPost</button>
                <ul className="instaPost-list">
                    {instaPosts.map(instaPost =>
                        <li className="instaPost-preview" key={instaPost._id}>
                            <a className='author'>{instaPost.by}</a>
                            <span> • {utilService.getTimeString(instaPost.time)}</span>
                            <button className='options'>
                                <svg aria-label="More options" class="icon options" color="rgb(115, 115, 115)" fill="rgb(115, 115, 115)" role="img" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="1.5"></circle>
                                    <circle cx="6" cy="12" r="1.5"></circle>
                                    <circle cx="18" cy="12" r="1.5"></circle>
                                </svg>
                            </button>
                            <img src={instaPost.img} />
                            <div className='buttons'>
                            {/* <AiOutlineHeart  />
                            <HiOutlineChatBubbleOvalLeft style={{ transform: 'scaleX(-1)'}}/>
                            <FiSend />
                            <GrBookmark /> */}
                            <svg aria-label="Like" class="icon like" color="rgb(38, 38, 38)" fill="rgb(38, 38, 38)" role="img" viewBox="0 0 24 24">
                                <title>Like</title>
                                <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
                            </svg>
                            <svg aria-label="Comment" class="icon comment" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" role="img" viewBox="0 0 24 24">
                                <title>Comment</title>
                                <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path>
                            </svg>
                            <svg aria-label="Share Post" class="icon share" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" role="img" viewBox="0 0 24 24">
                                <title>Share Post</title>
                                <line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line>
                                <polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon>
                            </svg>
                            <svg aria-label="Save" class="icon save" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" role="img" viewBox="0 0 24 24">
                                <title>Save</title>
                                <polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon>
                            </svg> 
                            </div>
                            <h2 className='liked-by'>
                                Liked by <a className='author'>{instaPost.liked[0].by}</a> and {instaPost.liked.length - 1} <a className='author'>others</a>
                            </h2>
                            <h2 className='caption'>
                                <a className='author'>{instaPost.by}</a>
                                <span className='caption-txt'> <LongTxt txt={instaPost.txt}/></span>
                            </h2>
                            <h2 className='comments'>
                                <span>View all {instaPost.comments.length} comments</span>
                                {/* <a className='author'>{instaPost.comments[0].by}</a> 
                                <span> {instaPost.comments[0].txt}</span> */}
                            </h2>
                            <div>
                                <button onClick={() => { onRemoveInstaPost(instaPost._id) }}>x</button>
                                <button onClick={() => { onUpdateInstaPost(instaPost) }}>Edit</button>
                            </div>
                            
                            {/* <button onClick={() => { onAddInstaPostMsg(instaPost) }}>Add instaPost msg</button> } */}
                        </li>)
                    }
                </ul>
            </main>
        </div>
    )
}