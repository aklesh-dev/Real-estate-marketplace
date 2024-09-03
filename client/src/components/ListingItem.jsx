import { Link } from "react-router-dom";
import { MdLocationOn } from 'react-icons/md';

export default function ListingItem({ listing }) {
    return <>
        <section className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
            <Link to={`/listing/${listing._id}`} className="flex flex-col gap-4">
                <img src={listing.imageUrls[0]} 
                alt="property image"
                    className="w-full h-[320px] sm:h-[220px] object-cover hover:scale-105 transition-scale duration-300"
                />
                <div className="p-3 flex flex-col gap-2 w-full">
                    <h1 className="text-lg font-semibold text-slate-700 truncate">{listing.name}</h1>
                    <div className="flex gap-1 items-center">
                        <MdLocationOn className="text-green-700 h-4 w-4"/>
                        <h2 className="text-sm text-slate-700 truncate w-full">{listing.address}</h2>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{listing.description}</p>

                    <p className="text-slate-500 mt-2 font-semibold">
                        $
                        {listing.offer ? listing.discountPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')}
                        {listing.type === 'rent' && '/month'}
                    </p>

                    <div className="flex items-center gap-2 text-slate-700">
                        <div className="font-bold text-xs">
                            {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}
                        </div>
                        <div className="font-bold text-xs">
                            {listing.bathrooms > 1 ? `${listing.bathrooms} baths`: `${listing.bathrooms} bath`}
                        </div>
                    </div>

                </div>
            </Link>
        </section>
    </>
};
