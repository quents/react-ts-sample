import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Bilgiler } from '../../models/IUser'
import { orders } from '../../services'
import { IOrderAction } from '../../useRedux/reducers/OrderReducer'
import { StateType } from '../../useRedux/store'
import { OrderType } from '../../useRedux/types/OrderType'

import styled, { keyframes } from 'styled-components';
import { zoomIn } from 'react-animations';
import { UserContext } from '../../UserContext'


function NavBar(item: {data: Bilgiler, search: React.Dispatch<React.SetStateAction<string>>}) {

    const userLogout = () => {
        sessionStorage.removeItem('user')
        localStorage.removeItem('user')
        // redirect
        window.location.href = '/'
    }

    const dispatch = useDispatch()
    const selector = useSelector( (item: StateType) => item.OrderReducer)
    useEffect(() => {

        const order = orders()
        if (order) {
            order.then(res => {
                const orderData = res.data.orderList
                if (typeof orderData !== 'boolean') {
                    const itemAction: IOrderAction = {
                        type: OrderType.ORDER_LIST, 
                        payload: orderData
                    }
                    dispatch(itemAction)
                }
            })
        }
    }, [])


    const [animCount, setAnimCount] = useState<any>()
    useEffect(() => {
        const animation = keyframes`${zoomIn}`;

        const AnimStrong = styled.div`
        animation: 1s ${animation};
        display: inline-block
        `;
        setAnimCount(<AnimStrong><strong>{selector.length}</strong> </AnimStrong>)
    }, [selector])



    // use context
    const  {data, setData} = useContext(UserContext)  
    
    

    return (
        <nav className="navbar navbar-expand-lg bg-light">
    <div className="container-fluid">
        <NavLink className="navbar-brand" to='/dashboard'>{data.title}</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
            <NavLink className="nav-link" aria-current="page" to='/dashboard'>Dashboard</NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="nav-link" to='/product'>Orders</NavLink>
            </li>
            <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Profile
            </a>
            <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a onClick={userLogout} className="dropdown-item" role='button' >Log out</a></li>
            </ul>
            </li>
            <li className="nav-item">
            <a className="nav-link disabled">{item.data.userName} {item.data.userSurname} - {animCount} </a>
            </li>
        </ul>
        <form className="d-flex" role="search">
            <input onChange={(evt) => item.search(evt.target.value)} className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
        </div>
    </div>
    </nav>
    )
}

export default NavBar