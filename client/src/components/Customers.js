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
            setDueData(response);
        })
        .catch(err => console.log(err))
    }, [])

  return (
    <div className='max-w[1640px] m-auto px-4 py-6 sm:px-12'>
        <div class="container mx-auto">
            <div className='py-6'>
            <h1 className='text-3xl py-1 font-bold'>Due Amount</h1>
            <p className='text-sm text-gray-600'>Records of people with Due Amount</p>
            </div>
        <div class="overflow-x-auto">
            <table class="w-auto bg-white border border-gray-300">
                <thead class="bg-white drop-shadow-md text-lg font-semibold">
                    <tr>
                        <th class="py-2 px-4 border-b  border-gray-300">Users</th>
                        
                        <th class="py-2 px-4 border-b  border-gray-300">Phone Number</th>
                        <th class="py-2 px-4 border-b text-red-600 border-gray-300">Due Amount</th>
                        <th class="py-2 px-4 border-b text-green-600 border-gray-300">Paid Amount</th>
                        <th class="py-2 px-4 border-b text-orange-600 border-gray-300">Total Amount</th>
                        
                    </tr>
                </thead>
                <tbody>
        {dueData && dueData.map((data, i) => (
        
            
              <tr class="hover:bg-gray-100">
                        <td class="py-2 px-4 border-b border-gray-300">{data.user}</td>
                        <td class="py-2 px-4 border-b border-gray-300">{data.phone}</td>
                        
                        <td class="py-2 px-4 border-b border-gray-300">{data.totalDueAmount}</td>
                        <td class="py-2 px-4 border-b border-gray-300">{data.totalPaidAmount}</td>
                        <td class="py-2 px-4 border-b border-gray-300">{data.totalAmount}</td>
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
