import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadStorys } from '../store/story.actions.js'
import { useForm } from '../customHooks/useForm.js'
import { Outlet, useNavigate } from "react-router-dom";

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

    function onAddStoryMsg(story) {
        console.log(`TODO Adding msg to story`)
    }

    return (
        <main className='home-page'>
            <Outlet />
            <ul className="story-list">
                {storys.map(story =>
                    <StoryPreview story={story} key={story._id}></StoryPreview>)
                }
            </ul>
        </main>
    )
}