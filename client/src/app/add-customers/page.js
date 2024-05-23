import { Add } from "@/components"

const page = () => {
    const addCustomer = () => {
        console.log("Customer added")
    }
  return (
    <div>
      <Add title="Customer's name" identity="Phone number" btn="Add Customer" />
    </div>
  )
}

export default page
