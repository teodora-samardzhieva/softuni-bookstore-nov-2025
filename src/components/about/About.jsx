import { useEffect, useState } from "react";

const STORE_NAME = "The Golden Gate Reads";
const STORE_ADDRESS = "101 Embarcadero, San Francisco, CA 94105, USA";
const STORE_COORDS = { lat: 37.7956, lng: -122.3934 };

// Custom hook: get user location text
const useUserLocationText = () => {
  const [locationText, setLocationText] = useState(
    "Location not requested yet"
  );

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationText("Geolocation not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(4);
        const lng = position.coords.longitude.toFixed(4);
        setLocationText(`Lat: ${lat}, Lng: ${lng}`);
      },
      () => {
        setLocationText("Location not permitted");
      }
    );
  });

  return locationText;
};

// Google Map URL generator
const getGoogleMapUrl = (lat, lng) =>
  `https://maps.google.com/maps?q=${lat},${lng}&z=15&t=m&output=embed`;

export default function AboutUs() {
  const userLocationText = useUserLocationText();

  return (
    <section className="max-w-4xl mx-auto text-center p-8 my-8 bg-blue-200 text-black rounded-xl shadow-2xl mt-30">
      <h1 className="text-4xl font-serif font-bold mb-4 text-black">
        About Us
      </h1>

      <p className="text-lg leading-relaxed mb-4">
        Welcome to <span className="italic font-bold">Our Bookstore!</span> We
        are passionate readers and book lovers dedicated to bringing you the
        best literary experience.
      </p>

      <h2 className="text-2xl font-serif mt-8 mb-2 text-black">Our Mission</h2>
      <p className="text-lg leading-relaxed mb-4">
        To connect readers with amazing stories and provide a seamless and
        inspiring <span className="italic font-bold">book discovery</span>{" "}
        experience.
      </p>

      <h2 className="text-2xl font-serif mt-8 mb-2 text-black">Contact Us</h2>
      <p className="text-lg leading-relaxed mb-4">
        Have questions? Get in touch:{" "}
        <a
          href="mailto:contact@bookstore.com"
          className="text-black underline hover:text-orange-400"
        >
          contact@bookstore.com
        </a>
      </p>

      <h2 className="text-2xl font-serif mt-8 mb-2 text-black">
        Store Location
      </h2>
      <p className="text-lg leading-relaxed mb-4 font-bold italic">
        {STORE_NAME} - {STORE_ADDRESS}
      </p>

      <p className="text-lg leading-relaxed mb-4">
        Your Location:{" "}
        <span className="font-semibold ml-3">{userLocationText}</span>
      </p>

      <iframe
        className="iframe w-full h-96 border-4 border-black p-1.5 rounded-xl shadow-md"
        src={getGoogleMapUrl(STORE_COORDS.lat, STORE_COORDS.lng)}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Bookstore Location Map"
      ></iframe>
    </section>
  );
}
