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
        by: 'fabriziorom 🚨👋🏻',
        // img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvXpsm4RSo0WUNpbs_GPjBlwiv3QYb6OYnfA&usqp=CAU',
        img: messi,
        txt: utilService.makeLorem(utilService.getRandomIntInclusive(5, 11)),
        time: Date.now(),
        comments: [{
            by: 'jenaliev._07',
            txt: 'VINICIUS.JR 🥶👿'
            }
        ]
        // time: Date.now() - 1000000000,
        // time: new Date(8.64e15),
        // vendor: 'Susita-' + (Date.now() % 1000),
        // price: utilService.getRandomIntInclusive(1000, 9000),
    }
}