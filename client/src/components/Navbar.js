'use client';
import React, { useEffect, useState } from "react";
import { VscHome } from "react-icons/vsc";
import { IoSettingsOutline } from "react-icons/io5";
import { PiHandshakeLight } from "react-icons/pi";
import { LuContact2 } from "react-icons/lu";
import Link  from "next/link";
import {usePathname} from "next/navigation";
import { GrGallery } from "react-icons/gr";
const Navbar = () => {
    
  const menuName = usePathname;
   const [nav, setNav] = useState('/')
   useEffect(() => {
    setNav(menuName);
  },[menuName])
  console.log(menuName)
  let headerStyle ='text-sm flex justify-center items-center gap-1 transition-all duration-500  bg-white text-[var(--bg-orange)] rounded-3xl px-3 py-1 group';
 
  return (
    <div className="w-full min-h-[55px] flex  justify-between transition-all duration-500 items-center  z-10 bg-[var(--bg-orange)] text-[var(--text-color)]">
      <ul className="hidden sm:flex sm:justify-center items-center px-4 py-1 drop-shadow-lg text-white text-lg  ">
        <li>
          <Link href={"/"}  className={nav==="/"?headerStyle:'text-lg'}> <VscHome  size={20} className={nav==="/"?'':'hidden'}  /> Home</Link>
        </li>
        <li>
          <Link href={"/customers"}  className={nav==="/customers"?headerStyle:'text-lg'}> <GrGallery  size={15}  className={nav==="/customers"?'':'hidden'}/> Customers</Link>
        </li>
        <li>
          <Link href={"/sales"}  className={nav==="/sales"?headerStyle:'text-lg'}> <PiHandshakeLight  size={20} className={`${nav==="/sales"?'':'hidden'}`}/> Sales</Link>
        </li>
        <li>
          <Link href={"/dues"} passHref> <a  className={nav==="/dues"?headerStyle:'text-lg'}><LuContact2 size={20} className={nav==="/dues"?'':'hidden'} /> Dues </a></Link>
        </li>
      </ul>
    

      <div className="w-full sm:hidden flex justify-center fixed bottom-2 z-50">
        <ul className=" w-full mx-2 h-12 flex justify-between px-1 items-center bg-[var(--bg-orange)] rounded-3xl   text-sm text-white">
          <li>
            <Link
              href={"/"}
              className={nav==="/"?`${headerStyle} px-4 py-2`:''}
            >
              
              <VscHome size={20} />
              <span
                className={nav==="/"?'':'hidden'}
              >
                Home
              </span>
            </Link>
          </li>
          <li>
            <Link href={"/gallery"} className={nav==="/gallery"?`${headerStyle} px-4 py-2`:''}>
          
              <GrGallery /> <span className={nav==="/gallery"?"":'hidden'}>Gallery</span>
            </Link>
          </li>
          <li>
            <Link href={"/deals"} className={nav==="/deals"?`${headerStyle} px-4 py-2`:''}>
              
              <PiHandshakeLight size={20} />
              <span className={nav==="/deals"?'':'hidden'}>Deals</span>
            </Link>
          </li>
          <li>
            <Link href={"/contact"} className={nav==='/contact'?`${headerStyle} px-4 py-2`:''}>
              
              <LuContact2 size={20} /> <span className={nav==="/contact"?'':'hidden'} >
                Contact
              </span>
            </Link>
          </li> 
          <li>
            <Link href={"/settings"} className={nav==='/settings'?`${headerStyle} px-4 py-2`:''}>
              
              <IoSettingsOutline  size={20}/> <span className={nav==="/settings"?'':'hidden'} >
                Settings
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;