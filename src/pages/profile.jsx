import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import { Link, NavLink, useNavigate, useParams, Outlet } from 'react-router-dom'
import { loadUsers } from '../store/user.actions'
import { loadStorys } from '../store/story.actions'


import imgUrlEitan from '../assets/img/Eitan.jpg'
import imgUrlBee from '../assets/img/Bee.jpg'
import imgUrlDesert from '../assets/img/Desert.jpg'
import imgUrlSea from '../assets/img/Sea.jpg'
import imgUrlSnow from '../assets/img/Snow.jpg'
import imgUrlTrees from '../assets/img/Trees.jpg'


// ICONS:
const optionsIcon = <svg className='options-icon line-1-item flex justify-center align-center' color='rgb(0, 0, 0)' fill='rgb(0, 0, 0)' height='24' role='img' viewBox='0 0 24 24' width='24'><title>Options</title><circle cx='12' cy='12' fill='none' r='8.635' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'></circle><path d='M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096' fill='none' stroke='currentColor' strokeLinejoin='round' strokeWidth='2'></path></svg>
const postsIcon = <svg className='posts-btn-icon flex' color='rgb(115, 115, 115)' fill='rgb(115, 115, 115)' height='12' role='img' viewBox='0 0 24 24' width='12'><rect fill='none' height='18' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' width='18' x='3' y='3'></rect><line fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' x1='9.015' x2='9.015' y1='3' y2='21'></line><line fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' x1='14.985' x2='14.985' y1='3' y2='21'></line><line fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' x1='21' x2='3' y1='9.015' y2='9.015'></line><line fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' x1='21' x2='3' y1='14.985' y2='14.985'></line></svg>
const reelsIcon = <svg className='posts-btn-icon flex justify-center align-center' color='rgb(115, 115, 115)' fill='rgb(115, 115, 115)' height='12' role='img' viewBox='0 0 24 24' width='12'><line fill='none' stroke='currentColor' strokeLinejoin='round' strokeWidth='2' x1='2.049' x2='21.95' y1='7.002' y2='7.002'></line><line fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' x1='13.504' x2='16.362' y1='2.001' y2='7.002'></line><line fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' x1='7.207' x2='10.002' y1='2.11' y2='7.002'></line><path d='M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552Z' fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'></path><path d='M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0Z' fillRule='evenodd'></path></svg>
const savedIcon = <svg className='posts-btn-icon flex justify-center align-center' color='rgb(115, 115, 115)' fill='rgb(115, 115, 115)' height='12' role='img' viewBox='0 0 24 24' width='12'><polygon fill='none' points='20 21 12 13.44 4 21 4 3 20 3 20 21' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'></polygon></svg>
const taggedIcon = <svg className='posts-btn-icon flex justify-center align-center' color='rgb(115, 115, 115)' fill='rgb(115, 115, 115)' height='12' role='img' viewBox='0 0 24 24' width='12'><path d='M10.201 3.797 12 1.997l1.799 1.8a1.59 1.59 0 0 0 1.124.465h5.259A1.818 1.818 0 0 1 22 6.08v14.104a1.818 1.818 0 0 1-1.818 1.818H3.818A1.818 1.818 0 0 1 2 20.184V6.08a1.818 1.818 0 0 1 1.818-1.818h5.26a1.59 1.59 0 0 0 1.123-.465Z' fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'></path><path d='M18.598 22.002V21.4a3.949 3.949 0 0 0-3.948-3.949H9.495A3.949 3.949 0 0 0 5.546 21.4v.603' fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'></path><circle cx='12.072' cy='11.075' fill='none' r='3.556' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'></circle></svg>

export function Profile() {
    const users = useSelector(storeState => storeState.userModule.users)
    const user = useSelector(storeState => storeState.userModule.user)
    const stories = useSelector(storeState => storeState.storyModule.storys)
    // console.log('users :>> ', users);
    const params = useParams()

    useEffect(() => {
        loadUsers()
        loadStorys()
    }, [])

    const userProfile = user
    // const userProfile = users.find(user => user.username === params.username)

    const profileStories = stories.filter(story => story.by._id === userProfile._id)

    return (
        <section className='profile'>
            <Outlet />
            <div className='flex'>
                <div className='profile-img-container flex justify-center'>
                    <img src={userProfile.imgUrl} className='profile-img' alt='profile-img' />
                </div>
                <div className='user-info-container'>
                    <div className='user-info-line line-1 flex'>
                        <div className='user-name line-1-item flex justify-center align-center'>
                            <span>eitanesta8</span>
                        </div>
                        <button className='line-1-item edit-btn flex justify-center align-center'>Edit profile</button>
                        <button>{optionsIcon}</button>
                    </div>

                    <div className='user-info-line line-2 flex'>
                        <div className='line-2-item flex justify-center align-center'>
                            <span className='line-2-num'>4</span> <span className='line-2-txt'>posts</span>
                        </div>
                        <div className='line-2-item flex justify-center align-center'>
                            <span className='line-2-num'>352</span> <span className='line-2-txt'>Followers</span>
                        </div>
                        <div className='line-2-item flex justify-center align-center'>
                            <span className='line-2-num'>1,331</span> <span className='line-2-txt'>following</span>
                        </div>
                    </div>

                    <div className='user-info-line line-3 flex column'>
                        <div className='line-3-item'>
                            <span className='line-3-full-name'>Eitan Ettinger</span>
                        </div>
                        <div className='line-3-item'>
                            <span className='line-3-txt'>bla bla</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* <storys profileStories={profileStories} /> */}
            {/* <section style={{ minHeight: '50vh', backgroundColor: 'white' }}> */}
            <section>
                <div className='filter-storys-btns flex justify-center align-center'>
                    <div className='filter-storys-btn flex justify-center align-center'>{postsIcon} <div className='storys-btn-txt flex justify-center align-center'><span>POSTS</span></div></div>
                    <div className='filter-storys-btn flex justify-center align-center'>{reelsIcon} <div className='storys-btn-txt flex justify-center align-center'><span>REELS</span></div></div>
                    <div className='filter-storys-btn flex justify-center align-center'>{savedIcon} <div className='storys-btn-txt flex justify-center align-center'><span>SAVED</span></div></div>
                    <div className='filter-storys-btn flex justify-center align-center'>{taggedIcon} <div className='storys-btn-txt flex justify-center align-center'><span>TAGGED</span></div></div>
                </div>
                <div className='story-list'>
                    {profileStories.map((story, idx) => (
                        <div className='story-preview' key={idx}>
                            <Link className="story-preview-link" to={`${story._id}`} key={story._id}>
                                <img src={story.imgUrl} alt={`${story.imgUrl}`} className="story-preview-img" />
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

        </section>
    )
}


// Currently - no solution for using ErrorBoundaries with react hooks:
// https://reactjs.org/docs/hooks-faq.html#do-hooks-cover-all-use-cases-for-classes
// class MyErrorBoundary extends React.Component {
//     state = { error: null, errorInfo: null };

//     componentDidCatch(error, errorInfo) {
//         // Catch errors in children and re-render with error message
//         // Note: in development the error is still presented on screen and you need to ESC to see the fallback UI
//         this.setState({
//             error,
//             errorInfo
//         })
//         // TODO: Log error to an error reporting service
//         // logger.report(error)
//     }
//     render() {
//         if (this.state.errorInfo) {
//             // Error path
//             return (
//                 <div>
//                     <h2>Something went wrong.</h2>

//                     <details style={{ whiteSpace: 'pre-wrap' }}>
//                         {this.state.error && this.state.error.toString()}
//                         <br />
//                         {this.state.errorInfo.componentStack}
//                     </details>
//                 </div>
//             );
//         }
//         // Normally, just render children
//         return this.props.children;
//     }
// }
