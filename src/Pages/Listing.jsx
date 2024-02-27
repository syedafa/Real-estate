import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
} from "react-icons/fa";
import { EstateState } from "../context/EstateProvider";
import Contact from "../Components/Contact";

function Listing() {
  SwiperCore.use([Navigation]);
  const params = useParams();
  const { user } = EstateState();
  console.log(user);
  const [listing, setListing] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [contact, setContact] = useState(false);
  useEffect(() => {
    const getListing = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch(`/api/list/get-listing/${params.id}`);
        const data = await res.json();
        if (data.success === false) {
          console.log("error");
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        console.log("not error");
      } catch (error) {
        setError(true);
        setLoading(false);
        console.log("error in catch");
      }
    };
    getListing();
  }, []);
  // console.log(listing);
  // console.log(loading);
  return (
    <main>
      <div>{loading && <p>Loading...</p>}</div>
      <div>{error && <p>something went wrong</p>}</div>
      {!error && !loading && listing && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((img, i) => (
              <SwiperSlide key={i}>
                <div
                  className="h-[400px]"
                  style={{
                    background: `url(${img}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="m-4 mx-10">
            <p className="font-bold text-2xl">
              {listing.name} -{" "}
              {listing.discountPrice
                ? listing.discountPrice.toLocaleString("en-US")
                : listing.regularPrice.toLocaleString("en-US")}
              ${listing.type === "rent" && "/month"}
            </p>
            <p className="flex items-center mt-6 gap-2 text-slate-600 my-2 text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              {listing.address}
            </p>
            <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  ${+listing.regularPrice - +listing.discountPrice}
                </p>
              )}
            </div>
            <p className="text-slate-800">
              <span className="'font-semibold text-black">Description - </span>
              {listing.description}
            </p>
            <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6 mb-10">
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaBed className="text-lg" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds`
                  : `${listing.bedrooms} bed`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaBath className="text-lg" />
                {listing.bathroom > 1
                  ? `${listing.bathroom} beds`
                  : `${listing.bathroom} bed`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaParking className="text-lg" />
                {listing.parking ? `Parking spot` : `No Parking`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaChair className="text-lg" />
                {listing.furnished ? `furnished` : `Not furnished`}
              </li>
            </ul>
            {user && user._id !== listing.userRef && !contact && (
              <button
                onClick={() => setContact(true)}
                className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3"
              >
                contact landlord
              </button>
            )}
            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </main>
  );
}

export default Listing;
