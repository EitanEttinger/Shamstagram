// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import messi from '../assets/img/messi.png'


const STORAGE_KEY = 'instaPost'

export const instaPostService = {
    query,
    getById,
    save,
    remove,
    getEmptyInstaPost,
    addInstaPostMsg
}
window.cs = instaPostService


async function query(filterBy = { txt: '', price: 0 }) {
    return httpService.get(STORAGE_KEY, filterBy)
}

function getById(instaPostId) {
    return httpService.get(`instaPost/${instaPostId}`)
}

async function remove(instaPostId) {
    return httpService.delete(`instaPost/${instaPostId}`)
}
async function save(instaPost) {
    var savedInstaPost
    if (instaPost._id) {
        savedInstaPost = await httpService.put(`instaPost/${instaPost._id}`, instaPost)

    } else {
        savedInstaPost = await httpService.post('instaPost', instaPost)
    }
    return savedInstaPost
}

async function addInstaPostMsg(instaPostId, txt) {
    const savedMsg = await httpService.post(`instaPost/${instaPostId}/msg`, { txt })
    return savedMsg
}


function getEmptyInstaPost() {
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
             by: 'fazil_f_a_i_z_i'   
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