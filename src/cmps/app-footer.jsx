
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

import { UserMsg } from './user-msg.jsx'

export function AppFooter() {


    return (
        <footer className="app-footer">
            <p>
                coffeerights - Michael & Eitan
            </p>

            <UserMsg />
        </footer>
    )
}