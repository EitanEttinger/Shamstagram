export const SET_STORYS = 'SET_STORYS'
export const REMOVE_STORY = 'REMOVE_STORY'
export const ADD_STORY = 'ADD_STORY'
export const UPDATE_STORY = 'UPDATE_STORY'
export const UNDO_REMOVE_STORY = 'UNDO_REMOVE_STORY'

const initialState = {
    storys: [],
    lastRemovedStory: null
}

export function storyReducer(state = initialState, action) {
    var newState = state
    var storys
    switch (action.type) {
        case SET_STORYS:
            newState = { ...state, storys: action.storys }
            break
        case REMOVE_STORY:
            const lastRemovedStory = state.storys.find(story => story._id === action.storyId)
            storys = state.storys.filter(story => story._id !== action.storyId)
            newState = { ...state, storys, lastRemovedStory }
            break
        case ADD_STORY:
            newState = { ...state, storys: [action.story, ...state.storys] }
            // newState = { ...state, storys: [...state.storys, action.story] }
            break
        case UPDATE_STORY:
            storys = state.storys.map(story => (story._id === action.story._id) ? action.story : story)
            newState = { ...state, storys }
            break
        case UNDO_REMOVE_STORY:
            if (state.lastRemovedStory) {
                newState = { ...state, storys: [...state.storys, state.lastRemovedStory], lastRemovedStory: null }
            }
            break
        default:
    }
    return newState
}
