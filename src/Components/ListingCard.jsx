import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

/* eslint-disable react/prop-types */
function ListingCard({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.imageUrls[0] ||
            "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.trimurty.com%2Fblog%2Fbuy-property-city-dont-live%2F&psig=AOvVaw0G92ox_Bpx6mw_IRq_FGAG&ust=1709270096503000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCJDjjNTmz4QDFQAAAAAdAAAAABAE"
          }
          alt="listing cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="truncate text-lg font-semibold text-slate-700">
            {listing.name}
          </p>
          <div className="flex items-center gap-1">
            <MdLocationOn className="h-4 w-4 text-green-700" />
            <p className="text-sm text-gray-600 truncate">{listing.address}</p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {listing.description}
          </p>
          <p className="text-slate-500 mt-2 font-semibold">
            $
            {
              /* {listing.offer
              ? listing.discountPrice.toLocaleString("en-US") */
              listing.regularPrice.toLocaleString("en-US")
            }
            {listing.type === "rent" && " / month"}
          </p>
          <div className="text-slate-700 flex gap-5">
            <div className="font-bold text-xs">
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds`
                : `${listing.bedrooms} bed`}
            </div>
            <div className="font-bold text-xs">
              {listing.bathroom > 1
                ? `${listing.bathroom} bathrooms`
                : `${listing.bathroom} bathroom`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ListingCard;
