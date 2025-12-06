import { useEffect, useState } from "react";

// --- Bookstore's location ---
// const STORE_NAME = "The Book Nook";
// const STORE_ADDRESS = "First Ave, Brighton and Hove, UK";
// const STORE_COORDS = { lat: 36.7118, lng: 2.9238 };
const STORE_NAME = "The Golden Gate Reads";
const STORE_ADDRESS = "101 Embarcadero, San Francisco, CA 94105, USA";
const STORE_COORDS = { lat: 37.7956, lng: -122.3934 };

// Custom hook: get user location text
const useUserLocationText = (requestLocation, permissionDenied) => {
  const [locationText, setLocationText] = useState("Location not requested yet");

  useEffect(() => {
    if (permissionDenied) {
      setLocationText("Location not permitted");
      return;
    }

    if (!requestLocation) return;

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
  }, [requestLocation, permissionDenied]);

  return locationText;
};

// Google Map URL generator
// const getGoogleMapUrl = (centerLat, centerLng, query) =>
//   `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=14&t=m&output=embed&center=${centerLat},${centerLng}`;
const getGoogleMapUrl = (lat, lng) =>
  `https://maps.google.com/maps?q=${lat},${lng}&z=15&t=m&output=embed`;



// Location Permission Modal
function LocationModal({ onAllow, onDeny }) {
  return (
    //items-center justify-center
    <div className="fixed inset-0 flex items-start justify-start p-4 mt-30">
    {/* mx-auto sets automatic left/right margins, which always centers the element horizontally. */}
      <div className="bg-white border-2 border-black rounded-xl p-6 max-w-md shadow-lg text-center">
        <h2 className="text-xl font-bold mb-4">Share Your Location?</h2>
        <p className="mb-6">
          We would like to access your location<br /> to show it on this page.
        </p>
        <div className="flex justify-around">
          <button
            onClick={onAllow}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Allow
          </button>
          <button
            onClick={onDeny}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Deny
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AboutUs() {
  const [showModal, setShowModal] = useState(false);
  const [requestLocation, setRequestLocation] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);

  const userLocationText = useUserLocationText(requestLocation, permissionDenied);

  // Trigger modal only when component mounts (user navigates to About page)
  useEffect(() => {
    setShowModal(true);
  }, []);

  return (
    <section className="max-w-4xl mx-auto text-center p-8 my-8 bg-blue-200 text-black rounded-xl shadow-2xl mt-30">
      <h1 className="text-4xl font-serif font-bold mb-4 text-black">
        About Us
      </h1>

      <p className="text-lg leading-relaxed mb-4">
        Welcome to <span className="italic font-bold">Our Bookstore!</span> We are passionate
        readers and book lovers dedicated to bringing you the best literary experience.
      </p>

      <h2 className="text-2xl font-serif mt-8 mb-2 text-black">Our Mission</h2>
      <p className="text-lg leading-relaxed mb-4">
        To connect readers with amazing stories and provide a seamless and inspiring <span className="italic font-bold">book discovery</span> experience.
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

      <h2 className="text-2xl font-serif mt-8 mb-2 text-black">Store Location</h2>
      <p className="text-lg leading-relaxed mb-4 font-bold italic">
        {STORE_NAME} - {STORE_ADDRESS}
      </p>

      <p className="text-lg leading-relaxed mb-4">
        Your Location: <span className="font-semibold ml-3">{userLocationText}</span>
      </p>

      <iframe
        className="iframe w-full h-96 border-4 border-black p-1.5 rounded-xl shadow-md"      
        src={getGoogleMapUrl(STORE_COORDS.lat, STORE_COORDS.lng)}
        // src={getGoogleMapUrl(STORE_COORDS.lat, STORE_COORDS.lng, STORE_NAME)}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Bookstore Location Map"
      ></iframe>

      {showModal && (
        <LocationModal
          onAllow={() => {
            setShowModal(false);
            setRequestLocation(true);
            setPermissionDenied(false);
          }}
          onDeny={() => {
            setShowModal(false);
            setRequestLocation(false);
            setPermissionDenied(true);
          }}
        />
      )}
    </section>
  );
}
