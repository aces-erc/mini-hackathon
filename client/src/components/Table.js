import React from 'react'

const Table = (props) => {
  return (
    <div className="overflow-x-auto">
    <table className="w-auto bg-white border border-gray-300">
        <thead className="bg-white drop-shadow-md text-sm sm:text-lg font-semibold">
            <tr>
                {props.headings.map((heading, i) => (
               <th key={i} className={`py-2 px-4 border-b ${i===0?'':i==1?'text-red-600':i===2?'text-green-600':'text-orange-600'} border-gray-300`}>{heading}</th>
              
            ))}
            </tr>
        </thead>
        <tbody>
{props.Data && props.Data.map((data, i) => (

   
      <tr key={i} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b border-gray-300">{data.name}</td>
                <td className="py-2 px-4 border-b border-gray-300">{data.phone}</td>
                
                <td className="py-2 px-4 border-b border-gray-300">{data.totalDue}</td>
                <td className="py-2 px-4 border-b border-gray-300">{data.totalPaidAmount}</td>
                <td className="py-2 px-4 border-b border-gray-300">{data.totalAmount}</td>
            </tr>
    
))}
</tbody>
    </table>
</div>
  )
}

export default Table
