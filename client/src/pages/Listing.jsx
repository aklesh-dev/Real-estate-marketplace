import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { FaShare, FaMapMarkerAlt, FaBed, FaBath, FaParking, FaChair } from "react-icons/fa";
import { useSelector } from "react-redux";
import Contact from "../components/Contact";


export default function Listing() {
    const { currentUser } = useSelector((state) => state.user);

    SwiperCore.use([Navigation]);
    const params = useParams();
    const [listing, setListing] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const [contact, setContact] = useState(false);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/listing/get/${params.listingId}`);
                const data = await res.json();
                if (data.success === false) {
                    setError(data.message);
                    setLoading(false);
                    return;
                } else if (data) {
                    setListing(data);
                    setLoading(false);
                    setError(false);
                }

            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchListing();
    }, [params.listingId]);

    return (
        <section>
            {loading && <p className="text-center text-2xl my-5">loading...</p>}
            {error && <p className="text-center text-red-700 text-2xl my-5">{error}</p>}
            {
                listing && !loading && !error && <>
                    <Swiper navigation rewind>
                        {listing.imageUrls.map((url) => (
                            <SwiperSlide key={url}>
                                <div
                                    className="h-[550px]"
                                    style={{ background: `url(${url}) center no-repeat`, backgroundSize: 'cover' }}
                                ></div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className="fixed top-[13%] right-[3%] z-10 cursor-pointer border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100">
                        <FaShare className="text-slate-500"
                            onClick={() => {
                                navigator.clipboard.writeText(window.location.href);
                                setCopied(true);
                                setTimeout(() => setCopied(false), 2000);
                            }}
                        />
                    </div>
                    {copied && (
                        <p className="fixed top-[25%] right-[5%] z-10 text-slate-200 p-2 rounded-md">Link copied!</p>
                    )}

                    <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
                        <p className="text-2xl font-semibold">
                            {listing.name} - ${' '}
                            {listing.offer ? listing.discountPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')}
                            {listing.type === 'rent' && ' /month'}
                        </p>
                        <p className="flex items-center mt-4 gap-2 text-slate-600 text-sm">
                            <FaMapMarkerAlt className="text-green-700" />
                            {listing.address}
                        </p>

                        <div className="flex gap-4">
                            <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                            </p>
                            {listing.offer && (
                                <p className="bg-green-900 w-full max-w-[200px] text-center text-white rounded-md p-1">
                                    ${+listing.regularPrice - +listing.discountPrice} discount
                                </p>
                            )}
                        </div>

                        <p className='text-slate-800'>
                            <span className='font-semibold text-black'>Description - </span>
                            {listing.description}
                        </p>

                        <ul className="text-green-900 font-semibold text-sm flex flex-wrap gap-4 items-center sm:gap-6">
                            <li className="flex items-center gap-1 whitespace-nowrap">
                                <FaBed className="text-lg" />
                                {listing.bedrooms > 1 ? `${listing.bedrooms} bedrooms` : `${listing.bedrooms} bedroom`}
                            </li>
                            <li className="flex items-center gap-1 whitespace-nowrap">
                                <FaBath className="text-lg" />
                                {listing.bathrooms > 1 ? `${listing.bathrooms} bathrooms` : `${listing.bathrooms} bathroom`}
                            </li>
                            <li className="flex items-center gap-1 whitespace-nowrap">
                                <FaParking className="text-lg" />
                                {listing.parking ? 'Parking Spot' : 'No Parking'}
                            </li>
                            <li className="flex items-center gap-1 whitespace-nowrap">
                                <FaChair className="text-lg" />
                                {listing.furnished ? 'Furnished' : 'Unfurnished'}
                            </li>
                        </ul>

                        {
                            currentUser && listing.userRef !== currentUser._id && !contact && (

                                <button onClick={() => setContact(true)} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">Contact LandLord</button>
                            )
                        }
                        {/* -- when contact is true, the button is hidden and the Contact component is rendered */}
                        {contact && <Contact listing={listing} />}


                    </div>
                </>
            }
        </section>
    )
}
