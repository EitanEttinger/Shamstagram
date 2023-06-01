
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

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
    var instaPosts = await storageService.query(STORAGE_KEY)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        instaPosts = instaPosts.filter(instaPost => regex.test(instaPost.vendor) || regex.test(instaPost.description))
    }
    if (filterBy.price) {
        instaPosts = instaPosts.filter(instaPost => instaPost.price <= filterBy.price)
    }
    return instaPosts
}

function getById(instaPostId) {
    return storageService.get(STORAGE_KEY, instaPostId)
}

async function remove(instaPostId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, instaPostId)
}

async function save(instaPost) {
    var savedInstaPost
    if (instaPost._id) {
        savedInstaPost = await storageService.put(STORAGE_KEY, instaPost)
    } else {
        // Later, owner is set by the backend
        instaPost.owner = userService.getLoggedinUser()
        savedInstaPost = await storageService.post(STORAGE_KEY, instaPost)
    }
    return savedInstaPost
}

async function addInstaPostMsg(instaPostId, txt) {
    // Later, this is all done by the backend
    const instaPost = await getById(instaPostId)
    if (!instaPost.msgs) instaPost.msgs = []

    const msg = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    instaPost.msgs.push(msg)
    await storageService.put(STORAGE_KEY, instaPost)

    return msg
}

function getEmptyInstaPost() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}


// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




