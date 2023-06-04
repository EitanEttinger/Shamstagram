import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadStorys, addStory, updateStory, removeStory } from '../store/story.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
// import { storyService } from '../services/story.service.js'
import { storyService } from '../services/story.service.local.js'
import { utilService } from '../services/util.service.js'
import { StoryPreview } from '../cmps/story-preview.jsx'

export function StoryDetails() {
    const [story, setStory] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        loadStory()
    }, [])

    function loadStory() {
        storyService.getById(params.id)
            .then((story) => {
                setStory(story)
            })
            .catch((err) => {
                console.log('Had issues in story details', err)
                navigate('/')
            })
    }
}