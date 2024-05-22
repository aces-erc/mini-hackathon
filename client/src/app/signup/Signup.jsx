"use client";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter();

  const addUser = async (e) => {
    e.preventDefault();
    console.log(name, phone, password);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/register`,
        {
          method: "POST",
          body: JSON.stringify({ name, phone, password }),
        }
      );
      const result = await response.json();
      console.log(result);
      if (!result.tokenUser) {
        toast.error("Failed to SignUp");
      } else {
        toast.success("Signup Successfull");
        router.push("/login");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex items-center justify-center  ">
      <div className="bg-primary p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Create an Account
        </h2>
        <form action="#" method="POST" className="space-y-4" onSubmit={addUser}>
          <div>
            <label htmlFor="name" className="block text-gray-200">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-gray-200">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-200">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className=" w-full  px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              {password && (
                <span
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaRegEye /> : <FaEyeSlash />}
                </span>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Sign Up
          </button>
        </form>
        <div className="flex items-center mt-2">
          <h1 className="text-white">
            Already have an account?
            <Link href={"/login"} className="underline">
              Login
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Signup;
