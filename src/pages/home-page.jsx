import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadStorys, addStory, updateStory, removeStory } from '../store/story.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
// import { storyService } from '../services/story.service.js'
import { storyService } from '../services/story.service.local.js'
import { utilService } from '../services/util.service.js'
import { StoryPreview } from '../cmps/story-preview.jsx'

export function HomePage() {

    const storys = useSelector(storeState => storeState.storyModule.storys)

    useEffect(() => {
        loadStorys()
    }, [])

    async function onAddStory() {
        const story = storyService.getEmptyStory()
        try {
            const savedStory = await addStory(story)
            showSuccessMsg(`Story added (id: ${savedStory._id})`)
        } catch (err) {
            showErrorMsg('Cannot add story')
        }
    }

    function onAddStoryMsg(story) {
        console.log(`TODO Adding msg to story`)
    }


    return (
        <main className='home-page'>
            <button onClick={onAddStory}>Add Story</button>
            <ul className="story-list">
                {storys.map(story =>
                    <StoryPreview story={story} key={story._id}></StoryPreview>)
                }
            </ul>
        </main>
    )
}