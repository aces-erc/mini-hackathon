"use client";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter();

  const loginUser =  (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, password }),
    })
      .then(async (data) => {
        const response = await data.json();
        if (!data.ok) {
          toast.error(response.message);
          return;
        }
       router.push("/home");
      })
      .catch((err) => {
        toast.error("Failed to login");
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex items-center justify-center my-10 sm:my-30  ">
      <div className="bg-primary p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Login
        </h2>
        <form
          onSubmit={loginUser}
        >
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
            className="w-full py-2 my-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
        <div className="flex items-center mt-2">
          <h1 className="text-white flex justify-center items-center gap-4 pt-4 mx-5">
            Don't have an account?
            <Link href={"/signup"} className="hover:underline text-orange-500">
              signup
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
