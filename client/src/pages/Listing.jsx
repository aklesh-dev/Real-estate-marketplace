import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";


export default function Listing() {
    SwiperCore.use([Navigation]);
    const params = useParams();
    const [listing, setListing] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

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
                setError(true);
                setLoading(false);
            }
        };
        fetchListing();
    }, [params.listingId]);

    return (
        <section>
            {loading && <p className="text-center text-2xl my-5">loading...</p>}
            {error && <p className="text-center text-red-700 text-2xl my-5">Something went wrong!</p>}
            {
                listing && !loading && !error && <>
                    <Swiper navigation rewind>
                        {listing.imageUrls.map((url) => (
                            <SwiperSlide key={url}>                               
                                <div
                                    className="h-[550px]"
                                    style={{ background: `url(${url}) center no-repeat`, backgroundSize: 'contain' }}
                                ></div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </>
            }
        </section>
    )
}
