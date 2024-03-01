import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import ListingCard from "../Components/ListingCard";

function Home() {
  const [offerListing, setOfferListing] = useState([]);
  const [saleListing, setSaleListing] = useState([]);
  const [rentListing, setRentListing] = useState([]);
  SwiperCore.use([Navigation]);
  useEffect(() => {
    const fecthOffer = async () => {
      try {
        const res = await fetch("/api/list/get-listings?offer=true&limit=4");
        const data = await res.json();
        setOfferListing(data);
        fetchSale();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSale = async () => {
      try {
        const res = await fetch("/api/list/get-listings?type=sale&limit=4");
        const data = await res.json();
        setSaleListing(data);
        fetchRent();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRent = async () => {
      try {
        const res = await fetch("/api/list/get-listings?type=rent&limit=4");
        const data = await res.json();
        setRentListing(data);
      } catch (error) {
        console.log(error);
      }
    };
    fecthOffer();
  }, []);

  return (
    <div>
      {/* top section */}
      <div className="flex flex-col gap-6 py-25 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find your next <span className="text-slate-500">perfect</span>
          <br />
          place with ease
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          Afan Estate will help you to find your home fast,easy and
          comfortable.Our expert support is always available.
        </div>
        <Link
          to={`/search`}
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
        >
          Lets get started...
        </Link>
      </div>
      {
        // swiper section
      }
      <Swiper navigation>
        {rentListing &&
          rentListing.length > 0 &&
          rentListing.map((list) => (
            <SwiperSlide key={list._id}>
              <div
                className="h-[500px]"
                style={{
                  background: `url(${list.imageUrls[0]}) center no-repeat`,
                }}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="max-w--6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListing && offerListing.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent Offers
              </h2>
              <Link
                to={"/search?offer=true"}
                className="text-sm text-blue-800 hover:underline"
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListing.map((ele) => (
                <ListingCard listing={ele} key={ele._id} />
              ))}
            </div>
          </div>
        )}
        {rentListing && rentListing.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for rent
              </h2>
              <Link
                to={"/search?type=rent"}
                className="text-sm text-blue-800 hover:underline"
              >
                Show more places for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListing.map((ele) => (
                <ListingCard listing={ele} key={ele._id} />
              ))}
            </div>
          </div>
        )}
        {saleListing && saleListing.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for sale
              </h2>
              <Link
                to={"/search?type=sale"}
                className="text-sm text-blue-800 hover:underline"
              >
                Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListing.map((ele) => (
                <ListingCard listing={ele} key={ele._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
