'use client';
const Addtransactions = () => {
    const addTransaction = (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const product = document.getElementById('product').value;
        const amount = document.getElementById('amount').value;
        const quantity = document.getElementById('quantity').value;
        if (name === '' || product === '' || amount === '' || quantity === '') {
            alert('Please fill all the fields');
        }
        const formData = {name, product, amount, quantity};
        fetch('http://localhost:3000/api/purchase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then((response) => response.json()).then((data) => console.log(data)
        ).catch((error) => console.log(error)

        )

    }
    
  return (
    <div>
        <div>
            <h1 className='text-sm font-semibold opacity-85 text-gray-700 '>Add Your All Transactions</h1>
            <div className=' border px-4 py-2 w-fit my-4 sm:ml-4'>
            <div className='flex flex-col gap-2 w-full sm:w-96 '>
                <label htmlFor="name">Customer's Name:</label>
                <input type="text" id="name" placeholder="Name" className='border p-2 rounded-lg' required />
                <label htmlFor="date">Product's Name:</label>
                <input type="text" id="product" placeholder="product" className='border p-2  rounded-lg' required />
                <label htmlFor="amount">Amount</label>
                <input type="number" id="amount" placeholder="Amount" className='border p-2  rounded-lg' required />
                <label htmlFor="description">Qauntity:</label>
                <input type="number" id="quantity" placeholder="Quantity" className='border  p-2 rounded-lg' required />
                <button onClick={addTransaction} className='bg-[var(--bg-orange)] text-white px-3 py-2 mt-2 rounded-lg hover:drop-shadow-lg duration-100'>Add Transaction</button>
                </div>
                </div>
        </div>
    </div>
  )
}

export default Addtransactions
