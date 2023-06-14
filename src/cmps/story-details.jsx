import { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux'
import { useParams, useNavigate, Link } from 'react-router-dom';
import { loadStorys, addStory, updateStory, removeStory } from '../store/story.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
// import { storyService } from '../services/story.service.js'
import { storyService } from '../services/story.service.local.js'
import { utilService } from '../services/util.service.js'
import { StoryPreview } from '../cmps/story-preview.jsx'
import { CommentForm } from './comment-form.jsx'

export function StoryDetails() {
    const [story, setStory] = useState(null)
    const [comment, setComment] = useState({ txt: '' })

    const params = useParams()
    const navigate = useNavigate()

    document.body.classList.add('details-menu-open');

    useEffect(() => {
        loadStory()
    }, [])

    async function loadStory() {
        try {
            const storyToShow = await storyService.getById(params.storyId)
            setStory(storyToShow)
        } catch (err) {
            console.log('Had issues in story details', err)
            navigate(-1)
        }
    }

    function goToProfile(comment) {
        navigate(`/${comment.by.username}`)
    }

    async function toggleDetailsMenu() {
        navigate(-1)
        if (document.body.classList[0]) document.body.classList.toggle('details-menu-open');
    }

    async function addStoryComment(ev) {
        ev.preventDefault()
        setComment({ txt: '' })
        const newComment = storyService.createComment(comment.txt, 'Michael')
        story.comments.push(newComment)
        try {
            await storyService.save(story)
            showSuccessMsg(`Your comment sent: ${comment.txt}`)
        } catch (err) {
            showErrorMsg('Cannot send your comment')
        }
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
                            <a onClick={goToProfile} className='author'>{story.by.username}</a>
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
                                    <section>
                                        <span className='author' onClick={() => goToProfile(story.by._id)}>{story.by.username}</span>
                                        <span className='story-text'>&nbsp;{story.txt}</span>
                                    </section>
                                    <section className='comment-footer'>
                                        <span title={utilService.getDate(story.time)} className='time'>{utilService.getTimeString(story.time)}</span>
                                    </section>
                                </div>
                            </section>

                            {story.comments && story.comments.length ?
                                <Fragment>
                                    {story.comments.map(comment => <section className='comment' key={comment.id}>
                                        <div>
                                            <section>
                                                <span className='author' onClick={() => goToProfile(comment.by._id)}>{comment.by}</span>
                                                <span className='story-text'>&nbsp;{comment.txt}</span>
                                            </section>
                                            <section className='comment-footer'>
                                                <span title={utilService.getDate(comment.time)} className='time'>{utilService.getTimeString(comment.time)}</span>
                                            </section>
                                        </div>
                                    </section>)}
                                </Fragment> : null}
                        </div>
                        <CommentForm comment={comment} setComment={setComment} addStoryComment={addStoryComment} />
                    </section>
                    <button onClick={toggleDetailsMenu}>Close</button>
                </section>
            </div>}
        </div>
    )
}