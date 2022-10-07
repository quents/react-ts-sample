import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { OrderList } from '../models/IOrder'
import { orders } from '../services'
import { StateType } from '../useRedux/store'
import AppTitle from './inc/AppTitle'
import {Helmet} from "react-helmet";

function Product() {

  const arr = useSelector((item: StateType) => item.OrderReducer)
  const search = useSelector((item: StateType) => item.SearchReducer)

  //redux kullandığım için bunlara gerek kalmadı
  /*const [arr, setArr] = useState<OrderList[]>([])
  useEffect(() => {
    const order = orders()
    if (order) {
      order.then(res => {
        const orderData = res.data.orderList
        if (typeof orderData !== 'boolean'){
          setArr(orderData)
        }
      })
    }
  

  }, [])*/
  

  useEffect(() => {
    console.log("effect: ", search)
  }, [search])
  

  return (
    <>
      <Helmet>
            <title>Order List</title>
            <meta name='description' content='E-Commerce - Order List'></meta>
      </Helmet>
      <AppTitle title='Orders'></AppTitle>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Pid</th>
            <th scope="col">Image</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Brief</th>
          </tr>
        </thead>
        <tbody>

        { arr.map((item, index) => 

          <tr key={index}>
            <th>{item.id}</th>
            <td>
              <img src={item.thumb} className='img-thumbnail'></img>
            </td>
            <td>{item.urun_adi}</td>
            <td>{item.fiyat}</td>
            <td>{item.aciklama}</td>
          </tr>
      )}
        </tbody>
      </table>

    </>
  )
}

export default Product