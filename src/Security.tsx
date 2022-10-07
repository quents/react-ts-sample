import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { AnimDiv } from './components/inc/AppTitle'
import NavBar from './components/inc/NavBar'
import { ISearchAction } from './useRedux/reducers/SearchReducer'
import { SearchType } from './useRedux/types/SearchType'
import { control } from './utils'

function Security(item: { component: JSX.Element }) {

    const location = useLocation()
    localStorage.setItem("url", location.pathname)
    const dispatch = useDispatch()

    const [navsearch, setNavsearch] = useState('')
    useEffect(() => {
        const searchAction: ISearchAction = {
            type: SearchType.SEARCH_CHANGE,
            payload: navsearch
        }
        dispatch(searchAction)
    }, [navsearch])
    
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
                    <AnimDiv>
                        <div className="list-group">
                            <a className="list-group-item list-group-item-action active" aria-current="true">
                                Menu category - {navsearch}
                            </a>
                            <a className="list-group-item list-group-item-action">A second link item</a>
                            <a className="list-group-item list-group-item-action">A third link item</a>
                            <a className="list-group-item list-group-item-action">A fourth link item</a>
                            <a className="list-group-item list-group-item-action disabled">A disabled link item</a>
                        </div>
                    </AnimDiv>
                </div>
                <div className='col-sm-9'>{item.component}</div>
            </div>
        </>
    )
}

export default Security