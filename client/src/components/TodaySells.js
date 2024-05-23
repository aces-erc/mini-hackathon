import Link from "next/link"
import { useEffect, useState } from "react"

const TodaySells = () => {
    const [salesData, setSalesData] = useState('')
    useEffect(() => {
        fetch('http://localhost:8080/api/purchase/sales', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(async(data) => {
            const response = await data.json();
           setSalesData(response.customers);
        })
        .catch(err => console.log(err))
    },[])
    console.log(salesData)
  return (
    
<div className="my-6 sm:my-10">
    <h1 className="text-2xl sm:text-3xl my-7 text-center font-bold">Today's Sales</h1>
    
<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
               
                <th scope="col" class="px-6 py-3">
                    Customer Name
                </th>
                <th scope="col" class="px-6 py-3">
                   Total Paid Amount
                </th>
                <th scope="col" class="px-6 py-3">
                    Total Due Amount
                </th>
                <th scope="col" class="px-6 py-3">
                    Total Amount
                </th>
               
            </tr>
        </thead>
        <tbody>
            {salesData && salesData.map((data, i) => (
            <tr key={i} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
             <td class="px-6 py-4">
              <Link href={`/customer-purchase/:${data.name}`} >  {data.name} </Link>
             </td>
             <td class="px-6 py-4">
                {data.totalPaid}
             </td>
             <td class="px-6 py-4">
                {data.totalDueRemaining}
             </td>
             <td class="px-6 py-4">
                {data.totalDueRemaining + data.totalPaid} 
             </td>
         </tr>    
            
            ))}
           
           
           
           
        </tbody>
    </table>
</div>
</div>

  )
}

export default TodaySells
