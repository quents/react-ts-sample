import React, { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import NavBar from './components/inc/NavBar'
import { control } from './utils'

function Security(item: { component: JSX.Element }) {

    const location = useLocation()
    localStorage.setItem("url", location.pathname)

    const [navsearch, setNavsearch] = useState('')
    const user = control()

    return (
        user === null
        ?
        <Navigate to="/" replace />
        :
        <>
            <NavBar data={user} search={setNavsearch} />
            <div className='row'>
                <div className='col-sm-3'>
                    <div className="list-group">
                        <a className="list-group-item list-group-item-action active" aria-current="true">
                            Menu category - {navsearch}
                        </a>
                        <a className="list-group-item list-group-item-action">A second link item</a>
                        <a className="list-group-item list-group-item-action">A third link item</a>
                        <a className="list-group-item list-group-item-action">A fourth link item</a>
                        <a className="list-group-item list-group-item-action disabled">A disabled link item</a>
                    </div>
                </div>
                <div className='col-sm-9'>{item.component}</div>
            </div>
        </>
    )
}

export default Security