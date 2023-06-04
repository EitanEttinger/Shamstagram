
import { storageService } from './async-storage.service.js'
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
    var storys = await storageService.query(STORAGE_KEY)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        storys = storys.filter(story => regex.test(story.vendor) || regex.test(story.description))
    }
    if (filterBy.price) {
        storys = storys.filter(story => story.price <= filterBy.price)
    }
    return storys
}

function getById(storyId) {
    return storageService.get(STORAGE_KEY, storyId)
}

async function remove(storyId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, storyId)
}

async function save(story) {
    var savedStory
    if (story._id) {
        savedStory = await storageService.put(STORAGE_KEY, story)
    } else {
        // Later, owner is set by the backend
        story.owner = userService.getLoggedinUser()
        savedStory = await storageService.post(STORAGE_KEY, story)
    }
    return savedStory
}

async function addStoryMsg(storyId, txt) {
    // Later, this is all done by the backend
    const story = await getById(storyId)
    if (!story.msgs) story.msgs = []

    const msg = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    story.msgs.push(msg)
    await storageService.put(STORAGE_KEY, story)

    return msg
}

function getEmptyStory() {
    // const eh = Date.now()
    const txt = `🔵🔴 | “𝐌𝐞𝐬𝐬𝐢 𝐰𝐢𝐥𝐥 𝐝𝐞𝐜𝐢𝐝𝐞 𝐧𝐞𝐱𝐭 𝐰𝐞𝐞𝐤”

    Xavi says it all about Barcelona summer window plans in an exclusive interview with @mundodeportivo ⤵️✨
    
    🇦🇷 “Leo Messi will decide his future next week — he has 100% my OK to join us. He knows we're ready to welcome him. Nothing has changed, we have chances. We want Leo here. Let him decide, leave it with him”.
    
    🇧🇷 “Raphinha is NOT on the market. He's staying at Barcelona and he's gonna help us a lot. He's a crucial player for me… but really, really important player”.
    
    🇧🇪 “We've an option clause to sign Yannick Ferreira Carrasco this summer. It was negotiated by Mateu so we will see. It depends on what happens next week”.
    
    🧞‍♂️ “Yes, Bernardo Silva was tempted by joining us last summer. It's normal — players are always open to join Barça. Bernardo would be an excellent signing but… he's Manchester City player. So it’s very difficult”.
    
    ♟️ “We need a new pivot to replace Busquets, it’s a priority. Zubimendi and Kimmich are super top players in their position. Ofc, Kimmich has long contract at Bayern so the only chance would be to negotiate with them. This depends on the club”.
    
    👀 “Gündogan deal? Well, the only thing I can share is that any footballer we are going to sign and that we have the chance to talk to wants to come here…”.
    
    ⚠️ “Joao Cancelo did not come to Barça in January simply because City did NOT want him to go to Barça. They didn’t tell me any reason, simply that it couldn't be done because City had said no to Barça option. So ask this question to them, ask Pep, ask their board…”.
    
    #fcb #barcelona #fcblive #barça #bcn #xavi #messi #transfers #leomessi #football #ucl #herewego #epl`
    
    return {
        by: 'fabriziorom',
        img: messi,
        txt ,
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

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




