import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ProBilgiler } from '../models/IProduct'
import { allProduct } from '../services'

function Dashboard() {

  const [proArr, setProArr] = useState<ProBilgiler[]>([])
  const [oldArr, setOldArr] = useState<ProBilgiler[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    toast.loading('Products loading...')
    allProduct().then( res => {
      const arr = res.data.Products[0].bilgiler
      setProArr(arr)
      setOldArr(arr)
      toast.dismiss()
    })
  }, [])

  const navigate = useNavigate()
  const gotoDetail = (index: number) => {
    //console.log(proArr[index])
    navigate('/productDetail', {state: proArr[index]})
  }

  //sadece ilgili state icin calismasini istiyorsak en sona ilgili state eklenir [] icine
  useEffect(() => {

    const newArr = oldArr.filter(item => 
      item.productName?.toLowerCase().includes(search.toLowerCase()) ||
      item.brief?.toLowerCase().includes(search.toLowerCase()) ||
      item.price?.includes(search)
    )
    setProArr(newArr)

  }, [search])
  
  

  return (
    <>
      <h2>Products</h2>
      <div className='col-sm-5 mb-2 mt-2'>
        <input type='search' onChange={(evt) => setSearch(evt.target.value)} className='form-control' placeholder='Search...'></input>
      </div>

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

        { proArr.map((item, index) => 

          <tr key={index} role='button' onClick={() => gotoDetail(index)}>
            <th>{item.productId}</th>
            <td>
              <img src={item.images![0].thumb} className='img-thumbnail'></img>
            </td>
            <td>{item.productName}</td>
            <td>{item.price}</td>
            <td>{item.brief}</td>
          </tr>
      )}
        </tbody>
      </table>
      
    </>
  )
}

export default Dashboard