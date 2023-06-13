import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useNavigate, Link } from "react-router-dom";
import { loadStorys, addStory, updateStory, removeStory } from '../store/story.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
// import { storyService } from '../services/story.service.js'
import { storyService } from '../services/story.service.local.js'
import { utilService } from '../services/util.service.js'
import { StoryPreview } from '../cmps/story-preview.jsx'

export function StoryDetails() {
    const [story, setStory] = useState(null)

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadStory()
    }, [])

    async function loadStory() {
        try {
            const storyToShow = await storyService.getById(params.storyId)
            setStory(storyToShow)
        } catch (err) {
            console.log('Had issues in story details', err)
            navigate('/')
        }
    }

    function goToProfile(comment) {
        navigate(`/profile/${comment.by._id}`)
    }

    async function toggleDetailsMenu() {
        navigate('/')
    }

    return (
        <div className='nested-routes'>
            <div onClick={toggleDetailsMenu} className='background-screen'></div>
            {story && <div className="story-details-container flex">
                {/* <div className="story-details"> */}
                <section className='img-container'>
                    <img src={story.imgUrl} />
                </section>
                <section className='post-info'>
                    <section className='story-header flex'>
                        <div className='header-info'>
                            <a onClick={goToProfile} className='author'>{story.by}</a>
                            <span title={utilService.getDate(story.time)} className='time'> • {utilService.getTimeString(story.time)}</span>
                        </div>
                        <svg aria-label="More options" className="icon options" color="rgb(115, 115, 115)" fill="rgb(115, 115, 115)" role="img" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="1.5"></circle>
                            <circle cx="6" cy="12" r="1.5"></circle>
                            <circle cx="18" cy="12" r="1.5"></circle>
                        </svg>
                    </section>
                    <span>{story.txt}</span>
                    <button onClick={() => navigate(-1)}>Close</button>
                </section>
            </div>}
        </div>
    )
}