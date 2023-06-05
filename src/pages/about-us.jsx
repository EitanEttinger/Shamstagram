import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { AiFillSetting } from 'react-icons/ai'

function FancyBox(props) {
    return <div className="fancy-box">
        <button style={{ float: 'right' }} onClick={props.onClose}>x</button>
        {props.children}
    </div>
}

FancyBox.propTypes = {
    onClose: PropTypes.func.isRequired
}

function Contacts() {
    return <section style={{ height: '50vh', backgroundColor: 'pink' }}>
        <h2>Contacts</h2>
        <p>Click me</p>
    </section>
}

function Projects() {
    const [projs, setProjs] = useState(['Puki Post', 'Muki Post'])
    const projList = projs.map((proj, idx) => (
        <article className="proj-preview" key={proj} onClick={(ev) => {
            ev.stopPropagation();
            setProjs(projs.filter(p => p !== proj))
        }}>
            {proj}
        </article>
    ))
    return <section style={{ minHeight: '50vh', backgroundColor: 'white' }}>
        <h2>Posts</h2>
        {projList}
        <button onClick={ev => {
            ev.stopPropagation();
            setProjs([...projs, 'Babu Post' + Date.now() % 100])
        }}>Add</button>
    </section>
}

function SplitPane(props) {

    const [width, setWidth] = useState(30)

    if (false && width === 60) {
        throw new Error('Projects cannot load')
    }
    return (
        <div className="split-pane" style={{
            display: 'flex'
        }}>
            <div style={{ width: width + '%' }} onClick={() => {
                if (width + 10 <= 100) setWidth(width + 10)
            }}>
                {props.left}
            </div>
            <div style={{ flex: 1 }} onClick={() => {
                if (width > 10) setWidth(width - 10)
            }}>
                {props.right}
            </div>
        </div>
    )
}


export function AboutUs() {
    const [count, setCount] = useState(33)

    function onTellMeMore() {
        console.log('Telling you more');
    }
    return (
        <section className='profile'>
            {/* <h2>About Us</h2> */}
            <FancyBox onClose={() => console.log('ok, closing')}>
                <h1>Profile</h1>
                <img src="./assets/img/Eitan.jpg" alt="profile-img" />
                <h2>eitanesta8</h2>
                <button>Edit profile</button>
                <button><AiFillSetting /> options</button>
                <h3>117 posts</h3>
                <h3>{count.toLocaleString()} Followers</h3>
                <h3>3333 following</h3>
                <h3>Eitan Ettinger: Bla Bla</h3>
                <button onClick={onTellMeMore}>Tell me More</button>
            </FancyBox>

            <Projects />

            {/* It was here before: */}
            {/* <SplitPane
                left={
                    <Contacts />
                }
                right={
                    <Projects />
                } /> */}

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
