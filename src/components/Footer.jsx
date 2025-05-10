import { Link } from "react-router";
import {
  appStore,
  facebook,
  googlePlay,
  instagram,
  twitter,
} from "../assets/icons";

const Footer = () => {
  const handlePhoneCall = () => {
    const userConfirmed = window.confirm(
      "Do you want to call +1(833)931-6548 ?"
    );
    if (userConfirmed) {
      window.location.href = "tel:+1(833)931-6548";
    }
  };
  return (
    <>
      <div className="mt-20 flex flex-col px-8 ">
        <div className="flex justify-between items-start flex-col md:flex-row">
          <div className="w-full md:w-1/2 flex justify-between items-start flex-col md:flex-row">
            <ul className="flex flex-col items-start justify-start gap-3">
              <h2 className="text-[#6E7491] font-bold text-lg">About</h2>
              <Link to={"/aboutus"}>
                <li className="footerLi">About TraveLove</li>
              </Link>
              <Link to={"/hotels"}>
                <li className="footerLi">Places</li>
              </Link>
              <Link>
                <li
                  onClick={() => {
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                  className="footerLi"
                >
                  Book Flights
                </li>
              </Link>
              <Link to={"/packages"}>
                <li className="footerLi">Offers and Packages</li>
              </Link>
              <Link to={"/contact"}>
                <li className="footerLi">Contact</li>
              </Link>
            </ul>
            {/* <ul className="flex flex-col items-start justify-start gap-3 ">
            <h2 className="text-[#6E7491] font-bold text-lg">
              Partner with us
            </h2>
            <li className="footerLi">Partnership programs</li>
            <li className="footerLi">Affiliate program</li>
            <li className="footerLi">Connectivity partners</li>
            <li className="footerLi">Promotions and events</li>
            <li className="footerLi">Integrations</li>
            <li className="footerLi">Community</li>
            <li className="footerLi">Loyalty program</li>
          </ul> */}
            <ul className="flex flex-col items-start justify-start gap-3">
              <h2 className="text-[#6E7491] font-bold text-lg">Support</h2>
              <Link onClick={handlePhoneCall}>
                <li className="footerLi">Help Center</li>
              </Link>
              <Link to={"/contact"}>
                <li className="footerLi">Contact us</li>
              </Link>
              <Link to={"/privacy"}>
                <li className="footerLi">Privacy policy</li>
              </Link>
              <Link to={"/terms"}>
                <li className="footerLi">Terms of service</li>
              </Link>
            </ul>
          </div>

          {/* <ul className="flex flex-col items-start justify-start  gap-3">
            <h2 className="text-[#6E7491] font-bold text-lg">Get the app</h2>
            <li className="footerLi">TraveLove for Android</li>
            <li className="footerLi">TraveLove for iOS</li>
            <li className="footerLi">Mobile site</li>
            <img src={appStore} alt="appStore" className="" />
            <img src={googlePlay} alt="googlePlay" />
          </ul> */}

          <ul className=" w-full md:w-1/2 items-center flex flex-col justify-start  gap-3 flex-1">
            <div className="w-full z-10 lg:w-1/2 -translate-y-6">
              <div
                id="creditCard"
                className="relative crediCard cursor-pointer transition-transform duration-500"
                style={{ "transform-style": "preserve-3d" }}
              >
                <div className="w-full md:w-[380px] h-56 m-auto rounded-xl text-white shadow-2xl">
                  <div
                    className="text-black relative object-center object-contain bg-cover w-full h-full rounded-xl"
                    style={{
                      backgroundImage:
                        "url('https://i.ibb.co/LPLv5MD/Payment-Card-01.jpg')",
                    }}
                  >
                    <div className="p-5 ">
                      <h2 className="text-black font-bold text-lg">
                        We Accept Card !!!
                      </h2>
                      <div className="flex flex-wrap items-center align-baseline gap-10 sm:gap-2">
                        <img
                          className="w-16 h-16 md:w-20 md:h-20"
                          src="https://i.imgur.com/bbPHJVe.png"
                        />
                        <img
                          className="w-12 h-12 md:w-20 md:h-10"
                          src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png?20091122143639"
                        />
                        <img
                          className="w-12 h-12 md:w-40 md:h-20"
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/American_Express_logo.svg/640px-American_Express_logo.svg.png"
                        />
                        <img
                          className="w-15 h-12 md:w-30 md:h-16"
                          src="https://upload.wikimedia.org/wikipedia/commons/f/fb/Discover_Card_logo.png?20160209033430"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ul>
        </div>
        <div className="border-t-2 border-[#CBD4E6] py-8 flex justify-between items-center">
          <div className="flex items-center justify-center gap-3">
            <img
              src={twitter}
              alt="twitter"
              className="cursor-pointer object-cover w-5 h-5 sm:w-7 sm:h-7"
            />
            <img
              src={instagram}
              alt="twitter"
              className="cursor-pointer object-cover w-5 h-5 sm:w-7 sm:h-7"
            />
            <img
              src={facebook}
              alt="twitter"
              className="cursor-pointer object-cover w-5 h-5 sm:w-7 sm:h-7"
            />
          </div>
          <p className="text-[#7C8DB0] text-sm sm:text-base">
            &copy; 2025 TraveLove incorporated
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
