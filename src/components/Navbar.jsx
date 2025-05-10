import { Link, useLocation } from "react-router-dom";
import TraveLove from "../assets/logo/logo-trave.png";
import { MdOutlineClose } from "react-icons/md";
import { BiMenuAltLeft } from "react-icons/bi";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const [toggle, setToggle] = useState(false);

  const loactionPath = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };

  return (
    <>
      <nav className="w-full flex flex-row items-center justify-between px-5 py-6 relative">
        <div className="flex items-center justify-center gap-3">
          <div className="relative md:hidden flex items-center">
            {toggle ? (
              <MdOutlineClose
                src={close}
                alt="close"
                className="w-7 h-7 text-[#605DEC] cursor-pointer"
                onClick={() => setToggle(false)}
              />
            ) : (
              <BiMenuAltLeft
                className="w-7 h-7 text-[#605DEC] cursor-pointer"
                onClick={() => setToggle(true)}
              />
            )}
            {toggle && (
              <ul className="absolute w-32 z-10 h-fit bg-[#FFFFFF] shadow-xl top-14 left-0 text-[#7C8DB0] flex flex-col gap-2 items-start p-4 scaleUp">
                <Link
                  to="/"
                  className={`text-base  hover:text-[#605DEC] transition-all duration-200 ${
                    loactionPath("/") && "text-[#605DEC]"
                  }`}
                >
                  <li>Flights</li>
                </Link>
                <Link
                  to="/hotels"
                  className={`text-base hover:text-[#605DEC] transition-all duration-200 ${
                    loactionPath("/hotels") && "text-[#605DEC]"
                  }`}
                >
                  <li>Hotels</li>
                </Link>
                <Link
                  to="/packages"
                  className={`text-base hover:text-[#605DEC] transition-all duration-200 ${
                    loactionPath("/packages") && "text-[#605DEC]"
                  }`}
                >
                  <li>Packages</li>
                </Link>
              </ul>
            )}
          </div>
          <Link to={"/"}>
            <div className="md:w-[330px] md:p-7 md:h-[40px] w-[100px] h-[25px] object-contain -translate-y-1 md:-translate-y-12">
              <img src={TraveLove} alt="TraveLove" className="w-full z-100" />
            </div>
          </Link>

          {/* <h2 className="text-purple-500 font-extrabold text-2xl">TraveLove</h2> */}
        </div>
        {/* <div className="">
          <button className="block md:hidden bg-[#605DEC] py-2 px-4 md:py-3 md:px-5 rounded-[5px] border-2 border-[#605DEC] text-base text-[#FAFAFA] hover:text-[#605DEC] hover:bg-white hover:border-2 hover:border-[#605DEC] transition-all duration-200" onClick={() => setSignin(!signin)}>Sign up</button>
         { signin && ( 
          <Signin signin={signin} setSignin={setSignin}/>
          )}
          </div> */}

        {/* Desktop View */}

        <div className="hidden md:flex items-center space-x-8">
          <ul className="hidden md:flex items-center space-x-8 text-[#7C8DB0]">
            <Link
              to="/"
              className={`text-base  hover:text-[#605DEC] transition-all duration-200 ${
                loactionPath("/") && "text-[#605DEC]"
              }`}
            >
              <li>Flights</li>
            </Link>
            <Link
              to="/hotels"
              className={`text-base hover:text-[#605DEC] transition-all duration-200 ${
                loactionPath("/hotels") && "text-[#605DEC]"
              }`}
            >
              <li>Places</li>
            </Link>
            <Link
              to="/packages"
              className={`text-base hover:text-[#605DEC] transition-all duration-200 ${
                loactionPath("/packages") && "text-[#605DEC]"
              }`}
            >
              <li>Packages</li>
            </Link>
            <Link
              to="/aboutus"
              className={`text-base hover:text-[#605DEC] transition-all duration-200 ${
                loactionPath("/aboutus") && "text-[#605DEC]"
              }`}
            >
              <li>About Us</li>
            </Link>
            <Link
              to="/contact"
              className={`text-base hover:text-[#605DEC] transition-all duration-200 ${
                loactionPath("/contact") && "text-[#605DEC]"
              }`}
            >
              <li>Contact</li>
            </Link>
          </ul>
          {/* <div className="">
          <button className="bg-[#605DEC] py-2 px-4 md:py-3 md:px-5 rounded-[5px] border-2 border-[#605DEC] text-base text-[#FAFAFA] hover:text-[#605DEC] hover:bg-white hover:border-2 hover:border-[#605DEC] transition-all duration-200" onClick={() => setSignin(!signin)}>Sign up</button>
         { signin && ( 
          <Signin signin={signin} setSignin={setSignin}/>
          )}
          </div> */}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
