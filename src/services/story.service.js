// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import messi from '../assets/img/messi.png'


const STORAGE_KEY = 'story'

export const storyService = {
    query,
    getById,
    save,
    remove,
    getEmptyStory,
    addStoryMsg,
    createComment
}
window.cs = storyService


async function query(filterBy = { txt: '', price: 0 }) {
    return httpService.get(STORAGE_KEY, filterBy)
}

function getById(storyId) {
    return httpService.get(`story/${storyId}`)
}

async function remove(storyId) {
    return httpService.delete(`story/${storyId}`)
}
async function save(story) {
    var savedStory
    if (story._id) {
        savedStory = await httpService.put(`story/${story._id}`, story)

    } else {
        savedStory = await httpService.post('story', story)
    }
    return savedStory
}

async function addStoryMsg(storyId, txt) {
    const savedMsg = await httpService.post(`story/${storyId}/msg`, { txt })
    return savedMsg
}


function getEmptyStory() {
    // const eh = Date.now()
    return {
        by: 'fabriziorom',
        img: messi,
        txt: '🔵🔴 | “Messi will decide next week”',
        time: Date.now(),
        comments: [
            {
            by: 'liveherewego',
            txt: 'Like this if you feel Leo will become Barça player 🔵🔴👀'
            },
            {
                by: 'd11d0munc3r',
                txt: 'Doubt barca have this much money to afford all these players and their wages.'
            },
        ],
        liked: [
            {
             id: 'u101',
             by: 'dipeshpal38'   
            },
            {
             id: 'u102',
             by: 'tees_697'   
            },
        ]
        // time: Date.now() - 1000000000,
        // time: new Date(8.64e15),
    }

}

function createComment(txt, user) {
    return {
      id: _makeId(),
      by: user,
      txt
    }
}

function _makeId(length = 4) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}