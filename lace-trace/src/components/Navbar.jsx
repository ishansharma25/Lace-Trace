import React, { useEffect, useState,useContext } from "react";
import { Link } from "react-router-dom";
import { BiSolidSun, BiPhoneCall, BiSolidMoon } from "react-icons/bi";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import { FaCaretDown } from "react-icons/fa";
import ResponsiveMenu from "./ResponsiveMenu";
import { UserContext } from "../../context/userContext";

const Navbar =() =>{

 const { user,logout } = useContext(UserContext);

    const [theme, setTheme] = useState(
        localStorage.getItem("theme") ? localStorage.getItem("theme") : "light",
      );
      const [showMenu, setShowMenu] = useState(false);
    
      const element = document.documentElement;
    
      const toggleMenu = () => {
        setShowMenu(!showMenu);
      };
      const handleLogout = () => {
        logout();
        navigate('/login'); // Redirect to login page after logout
    };
    
      useEffect(() => {
        if (theme === "dark") {
          element.classList.add("dark");
          localStorage.setItem("theme", "dark");
          console.log("dark theme");
        } else {
          element.classList.remove("dark");
          localStorage.setItem("theme", "light");
          console.log("light theme");
        }
      }, [theme]);
    return (
      <div className="dark:bg-slate-900 dark:text-white">
        <div className="fixed left-0 right-0 top-0 z-50 bg-gradient-to-l from-violet-900 via-violet-800 to-violet-900 ">

        <header
        data-aos="fade"
        data-aos-duration="300"
        className="relative z-[99] border-b-[1px]  border-primary/50 bg-gradient-to-l from-violet-900 via-violet-800 to-violet-900 text-white shadow-lg"
      >
        <nav className="container  flex h-[70px] items-center justify-between py-2 ">

        
          <div className="text-2xl text-white md:text-3xl ">
            <a href="/#home" className="">
              LACE   
              <span className="inline-block font-bold text-primary">TRACE&nbsp;&nbsp;</span>
              {user ? (
                          <>
                          
                            <span className="inline-block font-bold text-primary">{user.name}</span>
                           
                          </>
                        ) : (
                          <></>
                        )}
            </a>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <ul className="flex items-center gap-10">
    {!user ? (
      <li className="group relative cursor-pointer">
        <Link to="/" className="flex h-[72px] items-center gap-[2px]">
          Home
        </Link>
      </li>
    ) : (
      <>
      <li>
        <Link to="/streamlit" className="flex h-[72px] items-center gap-[2px]">
          Chat
        </Link>
      </li>

      <li>
        <Link to="/talk" className="flex h-[72px] items-center gap-[2px]">
          Help
        </Link>
      </li>
      </>



    )}
              <li className="cursor pointer group">
                <a
              
                  className="flex h-[72px] items-center gap-[2px]"
                >
                  About Us{" "}
                  <span>
                    <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                  </span>
                </a>
                <div className="absolute left-0 z-[9999] hidden w-full rounded-b-3xl bg-white p-2 text-black group-hover:block  ">
                  <div className="grid grid-cols-3 gap-5 ">
                    <div className="d-200 overflow-hidden">
                      <img
                        className="max-h-[300px] w-full rounded-b-3xl rounded-t-3xl object-fill"
                        src="https://jdsportsblog.s3.amazonaws.com/wp-content/uploads/2022/03/aj1courtpurplehder.jpg"
                        alt="pics"
                      />
                    </div>
                    <div className="col-span-2">
                      <h1 className="pb-3 text-xl font-semibold">
                        Your Sneaker Guide
                      </h1>
                      <p className="text-sm text-slate-600 font-bold">
                      Calling all sneakerheads! Tired of second-guessing your next cop? Say goodbye to fake kicks and hello to peace of mind with Lace-Trace. 
                      Our cutting-edge AI doesn't 
                      just spot fakes—it breaks down the science of sneaker authenticity. Upload a pic, and watch as we dissect every stitch, sole, and swoosh. 
                      </p>
                      <div className="grid grid-cols-3 ">
                        <ul className="mt-3 flex flex-col gap-2">
                          <h1 className="pb-1 text-xl font-semibold">
                            Why Us?
                          </h1>
                          <li className="cursor-pointer text-black/80 hover:text-primary">
                          AI-Powered Authentication
                          </li>
                          <li className="cursor-pointer text-black/80 hover:text-primary">
                          Detailed Explanations
                          </li>
                          <li className="cursor-pointer text-black/80 hover:text-primary">
                          Personalized Chat Support



                          </li>
                        </ul>
                        
                        
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              
              {/* Phone number section */}
              <div className="flex items-center gap-4">
               
              <a href="#" className="flex h-[72px] items-center gap-[2px] group-hover:rotate-180">
                        {user ? (
                          <>
                          
                           
                            <button onClick={handleLogout} className="ml-2">Logout</button>
                          </>
                        ) : (
                          <Link to="/login">Login</Link>
                        )}
                      </a>
              </div>
              {/* Light and dark mode switcher */}
              {theme === "dark" ? (
                <BiSolidSun
                  onClick={() => setTheme("light")}
                  className="text-2xl"
                />
              ) : (
                <BiSolidMoon
                  onClick={() => setTheme("dark")}
                  className="text-2xl"
                />
              )}
            </ul>
          </div>

          {/* Mobile view  */}
          <div className="flex items-center gap-4 md:hidden ">
            {theme === "dark" ? (
              <BiSolidSun
                onClick={() => setTheme("light")}
                className="text-2xl"
              />
            ) : (
              <BiSolidMoon
                onClick={() => setTheme("dark")}
                className="text-2xl"
              />
            )}
            {showMenu ? (
              <HiMenuAlt1
                onClick={toggleMenu}
                className=" cursor-pointer transition-all"
                size={30}
              />
            ) : (
              <HiMenuAlt3
                onClick={toggleMenu}
                className="cursor-pointer transition-all"
                size={30}
              />
            )}
          </div>
        </nav>
      </header>
      <ResponsiveMenu showMenu={showMenu} />
        </div>
     </div>
    )
}
export default Navbar;