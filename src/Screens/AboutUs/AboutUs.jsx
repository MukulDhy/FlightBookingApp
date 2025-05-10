import React from "react";
import { useSelector } from "react-redux";
import ServicesCards from "../../Components/ServicesCards/ServicesCards";
import SectionBanner from "../../Components/AboutUsBanner/SectionBanner";
import Accordion from "../../Components/Accordion/Accordion";
import { useState } from "react";

const AboutUs = () => {
  const [open, setOpen] = useState(false);
  const services = [
    {
      _id: "65068f48a8b49cfc15756d22",
      title: "Flight Booking",
      subTitle: "Personalized Flight Bookings for You",
      caption:
        "Seamless personalized flight bookings for your perfect journey. Book now.",
      image: "https://i.ibb.co/f2K7x8g/flight.jpg",
      details:
        "Experience hassle-free flight bookings with TraveLove. We offer a wide range of personalized options to suit your travel needs. Whether you're jetting off for a business trip or a dream vacation, our user-friendly platform ensures a seamless booking process. Enjoy the comfort and convenience of choosing your flights with ease. Book now for the journey of a lifetime.",
      service: "available",
      date: "20 Sept 2023",
    },
    {
      _id: "65068f48a8b49cfc15756d26",
      title: "Adventure Tours",
      subTitle: "Explore Thrilling Adventure Tours with TraveLove",
      caption:
        "Explore thrilling adventure tours with TraveLove for the experience of a lifetime.",
      image: "https://i.ibb.co/Tw09fhV/advanture.jpg",
      details:
        "Get ready for the adventure of a lifetime with TraveLove! Our upcoming adventure tours promise thrilling experiences in the most captivating destinations. Whether it's hiking through majestic mountains, diving into vibrant coral reefs, or embarking on epic safaris, we've got it all. Stay tuned for the launch and quench your thirst for adventure with TraveLove.",
      service: "upcoming",
      date: "20 Sep 2023",
    },
    {
      _id: "65068f48a8b49cfc15756d24",
      title: "Hotel Booking",
      subTitle: "Your Comfort, Our Priority",
      caption:
        "Discover and book your perfect hotel with us. Your comfort, our priority.",
      image: "https://i.ibb.co/RvSv14d/hotel.jpg",
      details:
        "Coming soon to TraveLove - a revolutionary hotel booking service! We prioritize your comfort and aim to provide a diverse range of accommodations tailored to your preferences. From cozy boutique hotels to luxurious resorts, our platform will offer a seamless booking experience. Stay tuned for the upcoming launch and make your next trip unforgettable with TraveLove.",
      service: "upcoming",
      date: "14 Sep 2023",
    },
    {
      _id: "65068f48a8b49cfc15756d25",
      title: "Cruise Booking",
      subTitle: "Embark on Unforgettable Cruises",
      caption:
        "Embark on unforgettable cruises with us. Enjoy your sea journey.",
      image: "https://i.ibb.co/3BkSNd8/cruise.png",
      details:
        "Prepare for an unforgettable sea adventure with TraveLove! Our upcoming cruise booking service will take you on extraordinary journeys across the oceans. Experience the thrill of exploring exotic destinations aboard luxurious cruise ships. From breathtaking landscapes to exceptional onboard amenities, your sea journey will be filled with memories to cherish. Stay tuned for the launch and set sail with TraveLove.",
      service: "upcoming",
      date: "16 Sep 2023",
    },
    {
      _id: "65068f48a8b49cfc15756d27",
      title: "Vacation Rentals",
      subTitle: "Make Yourself at Home Away from Home",
      caption:
        "Find the perfect vacation rental with TraveLove. Make yourself at home.",
      image: "https://i.ibb.co/gMwcCKx/vacation.jpg",
      details:
        "Coming soon to TraveLove - a wide array of vacation rentals to make your getaway extraordinary! Enjoy the comfort and convenience of a home away from home. Whether you're seeking a cozy cabin in the woods or a beachfront villa, our platform will offer diverse options. Stay tuned for the upcoming launch and create memorable vacation experiences with TraveLove.",
      service: "upcoming",
      date: "19 Sep 2023",
    },
    {
      _id: "65068f48a8b49cfc15756d23",
      title: "Car Booking",
      subTitle: "Effortlessly Book Your Ideal Car",
      caption:
        "Effortlessly book your ideal car with us. Convenient, and hassle-free service.",
      image: "https://i.ibb.co/wzynCF4/car.jpg",
      details:
        "Discover the future of car booking with TraveLove. Our upcoming service will redefine convenience and ease for travelers. With a few clicks, you can book your ideal car, ensuring a hassle-free journey. Whether it's a city commute or an adventure trip, our service will cater to your needs. Stay tuned for the launch of this exciting feature!",
      service: "upcoming",
      date: "15 Sep 2023",
    },
  ];
  const accordionData = [
    {
      _id: "650c02b49c2b156eea2829cd",
      title: "Expertise",
      description:
        "When it comes to travel, knowledge is key. At TraveLove, we've assembled a team of travel experts who are not only passionate about exploring the world but also possess extensive knowledge of the industry. Their expertise ensures that you receive the best advice and recommendations for your trips. Whether it's finding the best time to visit a destination, securing the most convenient flight routes, or uncovering hidden gems at your chosen location, our experts are your ultimate resource for making informed travel decisions.",
    },
    {
      _id: "650c02b49c2b156eea2829ce",
      title: "Convenience",
      description:
        "We believe that travel planning should be a pleasure, not a chore. That's why we've invested in creating a user-friendly website and providing dedicated customer support. Our goal is to make planning your entire journey a seamless experience all in one place. From browsing options to booking, managing reservations, and even seeking assistance along the way, TraveLove is your go-to platform for stress-free travel arrangements.",
    },
    {
      _id: "650c02b49c2b156eea2829cf",
      title: "Variety",
      description:
        "We understand that every traveler is unique, and that's why we offer a diverse range of services to cater to all travelers. Whether you're a budget-conscious adventurer seeking affordable accommodations, a luxury seeker desiring lavish indulgence, or somewhere in between, our extensive selection of services allows you to tailor your trip precisely to your preferences. With TraveLove, the world is your oyster, and you have the freedom to design your travel experiences just the way you want them.",
    },
    {
      _id: "650c02b49c2b156eea2829d0",
      title: "Security",
      description:
        "Your safety and privacy are of utmost importance to us. We've taken comprehensive measures to ensure that your personal information is safeguarded and your transactions are secure. Our booking system adheres to the highest industry standards for security, guaranteeing a worry-free travel experience. When you choose TraveLove, you can focus on the excitement of your journey, knowing that your safety and privacy are in reliable hands.",
    },
    {
      _id: "650c02b49c2b156eea2829d1",
      title: "Personalization",
      description:
        "We recognize that your journey is a reflection of who you are. It's as unique as your interests and desires. That's why we put the power of personalization in your hands. Our team works closely with you to create customized itineraries that perfectly match your preferences and interests. Whether you're a history enthusiast, a culinary explorer, a nature lover, or someone with a blend of interests, we're here to ensure that every aspect of your journey aligns with your vision. Your adventure with TraveLove is truly yours to define.",
    },
  ];
  const toggle = (index) => {
    if (open === index) {
      return setOpen(false);
    }
    setOpen(index);
  };

  return (
    <div>
      <SectionBanner
        subtitle="About TraveLove"
        title="Your Gateway to Seamless Travel Experiences"
        bgImage="url('https://i.ibb.co/v4PLr16/flight-hero.jpg')"
      />
      <div className="md:p-5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 rounded-lg md:grid-cols-2 px-3 md:px-10 py-20 dark:text-slate-500 bg-white dark:bg-slate-800">
          <div className="">
            <h3 className="text-xl font-semibold">About TraveLove</h3>
            <p className="text-base text-justify">
              At TraveLove, we are passionate about making your travel dreams a
              reality. We understand that travel is more than just a journey;
              it's an experience that enriches your life with memories, new
              perspectives, and unforgettable moments. That's why we've
              dedicated ourselves to providing you with a one-stop platform for
              all your travel needs.
            </p>
            <h3 className="text-xl font-semibold mt-5">Our Story</h3>
            <p className="text-base text-justify">
              Founded by a team of avid travelers, TraveLove was born out of a
              passion for exploration and a desire to make travel planning as
              effortless as possible. We understand that every traveler is
              unique, with distinct preferences and needs, and that's why we
              offer a wide range of travel services to cater to your individual
              requirements.
            </p>
          </div>
          <div>
            <div className="relative h-[250px]">
              <img
                className="absolute w-10/12 lg:w-8/12 top-20 rounded-lg  md:left-5 z-10"
                src="https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2022/02/01135456/Untitled-design.jpg?tr=w-1200,h-900"
                alt=""
              />
              <img
                className="absolute w-10/12 lg:w-8/12 top-2 left-14 lg:left-52 md:left-20 rounded-lg"
                src="https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/QLCTMIGQOBEFVKG27DONZ3KKNI.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-3  py-10">
          <h3 className="text-xl md:text-4xl font-semibold">We are Offering</h3>
          <ServicesCards services={services} />
        </div>
        <div className="max-w-7xl mx-auto px-3">
          <h3 className="text-xl md:text-4xl font-semibold mb-10">
            Why Choose TraveLove?
          </h3>

          {accordionData.map((data, index) => (
            <Accordion
              key={index}
              open={index === open}
              title={data?.title}
              description={data?.description}
              toggle={() => toggle(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
