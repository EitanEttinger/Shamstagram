import React from 'react'
import { Routes, Route } from 'react-router'

import routes from './routes'

import { NavBar } from './cmps/nav-bar'
import { AppFooter } from './cmps/app-footer'
import { UserDetails } from './pages/user-details'
import { toggleAddMenu, StoryEdit } from './cmps/story-edit.jsx'
import { HomePage } from './pages/home-page.jsx'
import { Profile } from './pages/profile'
import { ChatApp } from './pages/chat-app.jsx'
import { StoryDetails } from './cmps/story-details'


export function RootCmp() {

    return (
        <div className="main-container">
            <NavBar />
            {/* <div onClick={(type, url) => toggleAddMenu()} className='background-screen'></div> */}
            <main className="curr-page">
                <Routes>
                    {/* {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                    <Route path="user/:id" element={<UserDetails />} /> */}
                    <Route element={<HomePage />} path="/">
                        <Route element={<StoryDetails />} path="/story/:storyId" />
                    </Route>
                    {/* <Route element={<HomePage />} path="/" /> */}
                    <Route element={<ChatApp />} path="messages" />
                    <Route element={<Profile />} path="/:username">
                        <Route element={<StoryDetails />} path="/:username/:storyId" />
                    </Route>
                </Routes>
            </main>
            <StoryEdit />
            {/* <AppFooter /> */}
        </div>
    )
}


