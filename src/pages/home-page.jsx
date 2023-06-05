import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadStorys, addStory, updateStory, removeStory } from '../store/story.actions.js'
import { useForm } from '../customHooks/useForm.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
// import { storyService } from '../services/story.service.js'
import { storyService } from '../services/story.service.local.js'
import { utilService } from '../services/util.service.js'
import { StoryPreview } from '../cmps/story-preview.jsx'
import { uploadService } from '../services/upload.service.js'
import { ImgUploader } from '../cmps/img-uploader'

export function HomePage() {
    // const [storyToEdit, setStoryToEdit, handleChange] = useForm(storyService.getEmptyStory())
    const storys = useSelector(storeState => storeState.storyModule.storys)

    useEffect(() => {
        loadStorys()
    }, [])

    // async function onHandleImg(ev) {
    //     try {
    //         const imgUrl = await uploadService.uploadImg(ev)
    //         handleChange({ target: { value: imgUrl, name: 'image' } })
    //         // setStoryToEdit((preStoryToEdit) => ({ ...storyToEdit, image: imgUrl }))
    //     } catch (err) {
    //         console.log('Cannot upload image right now..', err);
    //     }
    // }

    // async function onAddStory() {
    //     return
    // }

    async function onAddStory(imgUrl = null) {
        const story = storyService.getEmptyStory()
        if (imgUrl) story.img = imgUrl
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

    function onUploaded(imgUrl) {
        onAddStory(imgUrl)
    }

    return (
        <main className='home-page'>
            {/* <button onClick={onAddStory}>Add Story</button> */}
            <ImgUploader onUploaded={onUploaded} />
            <ul className="story-list">
                {storys.map(story =>
                    <StoryPreview story={story} key={story._id}></StoryPreview>)
                }
            </ul>
        </main>
    )
}