import { instaPostService } from "../services/instaPost.service.local.js";
import { userService } from "../services/user.service.js";
import { store } from './store.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { ADD_INSTAPOST, REMOVE_INSTAPOST, SET_INSTAPOSTS, UNDO_REMOVE_INSTAPOST, UPDATE_INSTAPOST } from "./instaPost.reducer.js";
import { SET_SCORE } from "./user.reducer.js";

// Action Creators:
export function getActionRemoveInstaPost(instaPostId) {
    return {
        type: REMOVE_INSTAPOST,
        instaPostId
    }
}
export function getActionAddInstaPost(instaPost) {
    return {
        type: ADD_INSTAPOST,
        instaPost
    }
}
export function getActionUpdateInstaPost(instaPost) {
    return {
        type: UPDATE_INSTAPOST,
        instaPost
    }
}

export async function loadInstaPosts() {
    try {
        const instaPosts = await instaPostService.query()
        console.log('InstaPosts from DB:', instaPosts)
        store.dispatch({
            type: SET_INSTAPOSTS,
            instaPosts
        })

    } catch (err) {
        console.log('Cannot load instaPosts', err)
        throw err
    }

}

export async function removeInstaPost(instaPostId) {
    try {
        await instaPostService.remove(instaPostId)
        store.dispatch(getActionRemoveInstaPost(instaPostId))
    } catch (err) {
        console.log('Cannot remove instaPost', err)
        throw err
    }
}

export async function addInstaPost(instaPost) {
    try {
        const savedInstaPost = await instaPostService.save(instaPost)
        console.log('Added InstaPost', savedInstaPost)
        store.dispatch(getActionAddInstaPost(savedInstaPost))
        return savedInstaPost
    } catch (err) {
        console.log('Cannot add instaPost', err)
        throw err
    }
}

export function updateInstaPost(instaPost) {
    return instaPostService.save(instaPost)
        .then(savedInstaPost => {
            console.log('Updated InstaPost:', savedInstaPost)
            store.dispatch(getActionUpdateInstaPost(savedInstaPost))
            return savedInstaPost
        })
        .catch(err => {
            console.log('Cannot save instaPost', err)
            throw err
        })
}

// Demo for Optimistic Mutation 
// (IOW - Assuming the server call will work, so updating the UI first)
export function onRemoveInstaPostOptimistic(instaPostId) {
    store.dispatch({
        type: REMOVE_INSTAPOST,
        instaPostId
    })
    showSuccessMsg('InstaPost removed')

    instaPostService.remove(instaPostId)
        .then(() => {
            console.log('Server Reported - Deleted Succesfully');
        })
        .catch(err => {
            showErrorMsg('Cannot remove instaPost')
            console.log('Cannot load instaPosts', err)
            store.dispatch({
                type: UNDO_REMOVE_INSTAPOST,
            })
        })
}
