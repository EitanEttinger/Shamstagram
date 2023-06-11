import React from 'react'
import { Routes, Route } from 'react-router'

import routes from './routes'

import { NavBar } from './cmps/nav-bar'
import { AppFooter } from './cmps/app-footer'
import { UserDetails } from './pages/user-details'
import { toggleAddMenu, StoryEdit } from './cmps/story-edit.jsx'


export function RootCmp() {

    return (
        <div className="main-container">
            <NavBar />
            <div onClick={toggleAddMenu} className='background-screen'></div>
            <main className="curr-page">
                <Routes>
                    {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                    <Route path="user/:id" element={<UserDetails />} />
                </Routes>
            </main>
            <StoryEdit />
            <AppFooter />
        </div>
    )
}


