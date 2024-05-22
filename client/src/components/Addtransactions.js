import React from 'react'

const Addtransactions = () => {
  return (
    <div>
        <div>
            <h1 className='text-sm font-semibold opacity-85 text-gray-700 '>Add Your All Transactions</h1>
            <div className=' border px-4 py-2 w-fit my-4 sm:ml-4'>
            <div className='flex flex-col gap-2 w-full sm:w-96 '>
                <label htmlFor="name">Customer's Name:</label>
                <input type="text" id="name" placeholder="Name" className='border p-2 rounded-lg' />
                <label htmlFor="date">Product's Name:</label>
                <input type="text" id="product" placeholder="product" className='border p-2 rounded-lg' />
                <label htmlFor="amount">Amount</label>
                <input type="number" id="amount" placeholder="Amount" className='border p-2 rounded-lg' />
                <label htmlFor="description">Qauntity:</label>
                <input type="number" id="quantity" placeholder="Quantity" className='border p-2 rounded-lg' />
                <button className='bg-[var(--bg-orange)] text-white px-3 py-2 mt-2 rounded-lg hover:drop-shadow-lg duration-100'>Add Transaction</button>
                </div>
                </div>
        </div>
    </div>
  )
}

export default Addtransactions
