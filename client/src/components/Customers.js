'use client';
import React, { useEffect, useState } from 'react'

const Customers = () => {
    const [dueData, setDueData] = useState('')
    useEffect(() => {   
        fetch('http://localhost:8080/api/customer/amount',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', 
        }})
        .then( async(data) => {
            const response = await data.json();
            console.log(response);
            setDueData(response);
        })
        .catch(err => console.log(err))
    }, [])

  return (
    <div className='max-w[1640px] m-auto px-4 py-6 sm:px-12'>
        <div className="container mx-auto">
            <div className='py-6'>
            <h1 className='text-3xl py-1 font-bold'>Due Amount</h1>
            <p className='text-sm text-gray-600'>Records of people with Due Amount</p>
            </div>
        <div className="overflow-x-auto">
            <table className="w-auto bg-white border border-gray-300">
                <thead className="bg-white drop-shadow-md text-sm sm:text-lg font-semibold">
                    <tr>
                        <th className="py-2 px-4 border-b  border-gray-300">Users</th>
                        
                        <th className="py-2 px-4 border-b  border-gray-300">Phone Number</th>
                        <th className="py-2 px-4 border-b text-red-600 border-gray-300">Due Amount</th>
                        <th className="py-2 px-4 border-b text-green-600 border-gray-300">Paid Amount</th>
                        <th className="py-2 px-4 border-b text-orange-600 border-gray-300">Total Amount</th>
                        
                    </tr>
                </thead>
                <tbody>
        {dueData && dueData.map((data, i) => (
        
           
              <tr key={i} className="hover:bg-gray-100">
                        <td className="py-2 px-4 border-b border-gray-300">{data.user}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{data.phone}</td>
                        
                        <td className="py-2 px-4 border-b border-gray-300">{data.totalDueAmount}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{data.totalPaidAmount}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{data.totalAmount}</td>
                    </tr>
            
      ))}
        </tbody>
            </table>
        </div>
    </div>

    </div>
  )
}

export default Customers
