import { createStore, combineReducers } from 'redux'

import { storyReducer } from './story.reducer.js'
import { userReducer } from './user.reducer.js'
import { reviewReducer } from './review.reducer'
import { systemReducer } from './system.reducer'

const rootReducer = combineReducers({
    storyModule: storyReducer,
    userModule: userReducer,
    systemModule: systemReducer,
    reviewModule: reviewReducer,
})


const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)


store.subscribe(() => {
    console.log('**** Store state changed: ****')
    console.log('storeState:\n', store.getState())
    console.log('*******************************')
})



