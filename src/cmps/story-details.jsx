import { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux'
import { useParams, useNavigate, Link } from 'react-router-dom';
import { loadStorys, addStory, updateStory, removeStory } from '../store/story.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
// import { storyService } from '../services/story.service.js'
import { storyService } from '../services/story.service.local.js'
import { utilService } from '../services/util.service.js'
import { userService } from "../services/user.service";
import { CommentForm } from './comment-form.jsx'

import EmojiPicker from 'emoji-picker-react';

import { ImBin } from 'react-icons/im';

export function StoryDetails() {
    const [story, setStory] = useState(null)
    const [comment, setComment] = useState({ txt: '' })
    const [showPicker, setShowPicker] = useState(false)
    const [like, setLike] = useState('')
    const [save, setSave] = useState('')

    const user = useSelector(storeState => storeState.userModule.user)
    const params = useParams()
    const navigate = useNavigate()

    document.body.classList.add('details-menu-open');

    useEffect(() => {
        loadStory()
    }, [])

    const onEmojiClick = (emojiObject, event) => {
        setComment({ txt: comment.txt + emojiObject.emoji })
        // setShowPicker(false)
    }

    async function loadStory() {
        try {
            const storyToShow = await storyService.getById(params.storyId)
            setStory(storyToShow)
        } catch (err) {
            console.log('Had issues in story details', err)
            navigate(-1)
        }
    }

    async function toggleDetailsMenu() {
        navigate(-1)
        if (document.body.classList[0]) document.body.classList.toggle('details-menu-open');
    }

    async function addStoryComment(ev) {
        ev.preventDefault()
        setComment({ txt: '' })
        const newComment = storyService.createComment(comment.txt, user)
        story.comments.push(newComment)
        try {
            await storyService.save(story)
            setShowPicker(false)
            showSuccessMsg(`Your comment sent: ${comment.txt}`)
        } catch (err) {
            showErrorMsg('Cannot send your comment')
        }
    }

    function removeComment(commId) {
        const idx = story.comments.findIndex(comment => comment.id === commId)
        if (story.comments[idx].by._id !== user._id) return
        story.comments.splice(idx, 1)
        updateStory(story)
        setStory(prevStory => {
            return { ...prevStory, comments: story.comments }
        })
    }

    function checkLike() {
        return story.liked.some(likedUser => likedUser._id === user._id)
    }

    function toggleLike() {
        if (checkLike()) {
            const idx = story.liked.findIndex(likedUser => likedUser._id === user._id)
            story.liked.splice(idx, 1)
        }

        else {
            story.liked.push({
                _id: user._id,
                fullname: user.fullname,
                username: user.username,
                imgUrl: user.imgUrl
            })
        }

        storyService.save(story)
        setLike(checkLike())
    }

    function checkSave() {
        return user.savedStoryIds.some(id => id === story._id)
    }

    function toggleSave() {
        if (checkSave()) {
            const idx = user.savedStoryIds.findIndex(id => id === story._id)
            user.savedStoryIds.splice(idx, 1)
        }

        else user.savedStoryIds.push(story._id)
        userService.update(user)
        setSave(checkSave())
    }

    return (
        <div className='nested-routes'>
            <div onClick={toggleDetailsMenu} className='background-screen'></div>
            {story && <div className='story-details-container flex'>
                {/* <div className='story-details'> */}
                <section className='img-container'>
                    <img src={story.imgUrl} />
                </section>
                <section className='story-info'>
                    <section className='story-header flex'>
                        <div className='story-user-info'>
                            <Link className='author flex align-center' to={`/${story.by.username}`}><img className='profile-img' src={story.by.imgUrl} /><span className='author'>{story.by.username}</span></Link>
                            {/* <span title={utilService.getDate(story.time)} className='time'> • {utilService.getTimeString(story.time)}</span> */}
                        </div>
                        <svg aria-label='More options' className='icon options' color='rgb(115, 115, 115)' fill='rgb(115, 115, 115)' role='img' viewBox='0 0 24 24'>
                            <circle cx='12' cy='12' r='1.5'></circle>
                            <circle cx='6' cy='12' r='1.5'></circle>
                            <circle cx='18' cy='12' r='1.5'></circle>
                        </svg>
                    </section>
                    <section className='comment-container flex column'>
                        <div className='comments-list flex column'>
                            <section className='comment'>
                                <div>
                                    <section className='flex'>
                                        <Link className='author' to={`/${story.by.username}`}>
                                            <img className='profile-img' src={story.by.imgUrl} />
                                        </Link>
                                        <div className='comment-info'>
                                            <Link className='author' to={`/${story.by.username}`}>
                                                <span className='author'>{story.by.username}</span>
                                            </Link>
                                            <span className='story-text'>&nbsp;{story.txt}</span>
                                            <section className='comment-footer'>
                                                <span title={utilService.getDate(story.time)} className='time'>{utilService.getTimeString(story.time)}</span>
                                            </section>
                                        </div>
                                    </section>
                                </div>
                            </section>

                            {story.comments && story.comments.length ?
                                <Fragment>
                                    {story.comments.map(comment => <section className='comment' key={comment.id}>
                                        <div>
                                            <section className='flex'>
                                                <Link className='author' to={`/${comment.by.username}`}>
                                                    <img className='profile-img' src={comment.by.imgUrl} />
                                                </Link>
                                                <div className='comment-info'>
                                                    <Link className='author' to={`/${comment.by.username}`}>
                                                        <span className='author'>{comment.by.username}</span>
                                                    </Link>
                                                    <span className='story-text'>&nbsp;{comment.txt}</span>
                                                    <section className='comment-footer'>
                                                        <span title={utilService.getDate(comment.time)} className='time'>{utilService.getTimeString(comment.time)}</span>
                                                        <ImBin onClick={() => removeComment(comment.id)} />
                                                        {/* <svg onClick={() => removeComment(comment.id)} aria-label="More options" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg> */}
                                                    </section>
                                                </div>
                                            </section>
                                        </div>
                                    </section>)}
                                </Fragment> : null}
                        </div>
                        <div className='footer-container'>
                            <div className='buttons flex'>
                                {checkLike() ?
                                    <svg onClick={toggleLike} aria-label="Unlike" className="icon unlike" color="rgb(255, 48, 64)" fill="rgb(255, 48, 64)" role="img" viewBox="0 0 48 48">
                                        <title>Unlike</title>
                                        <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                                    </svg> :
                                    <svg onClick={toggleLike} aria-label="Like" className="icon like" color="rgb(38, 38, 38)" fill="rgb(38, 38, 38)" role="img" viewBox="0 0 24 24">
                                        <title>Like</title>
                                        <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"> </path>
                                    </svg>
                                }
                                <svg aria-label='Comment' className='icon comment' color='rgb(0, 0, 0)' fill='rgb(0, 0, 0)' role='img' viewBox='0 0 24 24'>
                                    <title>Comment</title>
                                    <path d='M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z' fill='none' stroke='currentColor' strokeLinejoin='round' strokeWidth='2'></path>
                                </svg>
                                <svg aria-label='Share Post' className='icon share' color='rgb(0, 0, 0)' fill='rgb(0, 0, 0)' role='img' viewBox='0 0 24 24'>
                                    <title>Share Post</title>
                                    <line fill='none' stroke='currentColor' strokeLinejoin='round' strokeWidth='2' x1='22' x2='9.218' y1='3' y2='10.083'></line>
                                    <polygon fill='none' points='11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334' stroke='currentColor' strokeLinejoin='round' strokeWidth='2'></polygon>
                                </svg>
                                {checkSave() ?
                                    <svg onClick={toggleSave} aria-label="Remove" className="icon remove" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24">
                                        <title>Remove</title>
                                        <path d="M20 22a.999.999 0 0 1-.687-.273L12 14.815l-7.313 6.912A1 1 0 0 1 3 21V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1Z"></path>
                                    </svg> :
                                    <svg onClick={toggleSave} aria-label="Save" className="icon save" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" role="img" viewBox="0 0 24 24">
                                        <title>Save</title>
                                        <polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon>
                                    </svg>
                                }
                            </div>
                            <h2 className='liked-by'>
                                Liked by <a className='author'>{story.liked[0].by}</a> and <a className='author'>others</a>
                                <div title={utilService.getDate(story.time)} className='time'>{utilService.getTimeString(story.time, true)}</div>
                            </h2>
                        </div>
                    </section>
                    <div className="app">
                        <div className="picker-container">
                            {showPicker && <EmojiPicker emojiVersion="3.0" onEmojiClick={onEmojiClick} />}
                        </div>
                    </div>
                    <section className='footer flex align-center'>
                        <svg onClick={() => setShowPicker(val => !val)} aria-label='Emoji' color='rgb(0, 0, 0)' fill='rgb(0, 0, 0)' height='24' role='img' viewBox='0 0 24 24' width='24'>
                            <title>Emoji</title>
                            <path d='M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z'></path>
                        </svg>
                        <CommentForm comment={comment} setComment={setComment} addStoryComment={addStoryComment} />
                        {comment.txt ? <span onClick={addStoryComment} className='post-comment'>Post</span> : <span className='dont-post-comment'>Post</span>}
                    </section>
                </section>
            </div>}
        </div>
    )
}