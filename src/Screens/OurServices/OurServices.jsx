import React, { useEffect, useState } from "react";
import SectionTitle from "../../Components/SectionTitle";
import ServicesCards from "../../Components/ServicesCards/ServicesCards";
import { useSelector } from "react-redux";

const OurServices = () => {
  const [viewAll, setViewAll] = useState(false);
  const allServices  = [
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
  ];;

  const handleViewAll = () => {
    setViewAll(true);
  };

  const services = viewAll ? allServices : allServices?.slice(0, 4);

  return (
    <section id="our-services">
      <SectionTitle sectionTitle="Our Services" />
      <div className="grid grid-cols-2 text-gray-500">
        <p>
          Explore seamless travel with our flight, hotel, car, and cruise
          booking services. Effortlessly tailor your journey for a memorable,
          personalized experience. Your dream adventure starts here..
        </p>
        <button
          onClick={handleViewAll}
          className={`ml-auto bg-cyan-700 hover:bg-cyan-600  px-5 rounded-full h-[45px] text-white font-semibold ${
            viewAll && "hidden"
          }`}
        >
          View All
        </button>
      </div>
      <ServicesCards services={services} />
    </section>
  );
};

export default OurServices;
