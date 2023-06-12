import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { AiFillSetting } from 'react-icons/ai'
// import { HiOutlineSquares2X2 } from 'react-icons/hi'
import { MdOndemandVideo } from 'react-icons/md'
import { CgBookmark } from 'react-icons/cg'
import { BsGrid3X3, BsPersonSquare } from 'react-icons/bs'

import imgUrlEitan from '../assets/img/Eitan.jpg'
import imgUrlBee from '../assets/img/Bee.jpg'
import imgUrlDesert from '../assets/img/Desert.jpg'
import imgUrlSea from '../assets/img/Sea.jpg'
import imgUrlSnow from '../assets/img/Snow.jpg'
import imgUrlTrees from '../assets/img/Trees.jpg'


function Posts() {
    const [posts, setPosts] = useState([imgUrlBee, imgUrlDesert, imgUrlSea, imgUrlSnow])
    const postList = posts.map((post, idx) => (
        <img src={post} alt={`${post}`} className="post-preview" key={post} onClick={(ev) => {
            ev.stopPropagation();
            setPosts(posts.filter(p => p !== post))
        }} />
        // <article className="post-preview" key={post} onClick={(ev) => {
        //     ev.stopPropagation();
        //     setPosts(posts.filter(p => p !== post))
        // }}>
        //     {post}
        // </article>
    ))
    return <section style={{ minHeight: '50vh', backgroundColor: 'white' }}>
        <div className='btns-filter-posts flex justify-space-around'>
            <h4><BsGrid3X3 /> POSTS</h4>
            <h4><MdOndemandVideo /> REELS</h4>
            <h4><CgBookmark /> SAVED</h4>
            <h4><BsPersonSquare /> TAGGED</h4>

        </div>
        <div className='post-list'>
            {postList}
        </div>
        <button onClick={ev => {
            ev.stopPropagation();
            setPosts([...posts, imgUrlTrees])
        }}>Add</button>
    </section>
}

export function Profile() {
    const [count, setCount] = useState(33)

    function onTellMeMore() {
        console.log('Telling you more');
    }
    return (
        <section className='profile'>

            <div flex >
                <div>
                    <img src={imgUrlEitan} className='profile-img' alt="profile-img" />

                </div>
                <div>

                    <div className='flex justify-space-between'>
                        <p>eitanesta8</p>
                        <button>Edit profile</button>
                        <button><AiFillSetting /></button>
                    </div>

                    <div className='flex justify-space-between'>
                        <h3>4 posts</h3>
                        <h3>352 Followers</h3>
                        <h3>1,331 following</h3>
                    </div>

                    <h3>Eitan Ettinger: Bla Bla</h3>
                </div>
            </div>

            <Posts />

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
