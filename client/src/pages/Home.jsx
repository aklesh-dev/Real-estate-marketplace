import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css/bundle";
import SwiperCore from 'swiper';
import { Navigation } from "swiper/modules";
import ListingItem from '../components/ListingItem';


export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  SwiperCore.use([Navigation]);
  

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?offer=true&limit=4`);        
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setOfferListings(data);
        fetchRentListing();
      } catch (error) {
        console.error(error);
      }
    };

    const fetchRentListing = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json()
        setRentListings(data);
        fetchSaleListing();
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSaleListing = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json()
        setSaleListings(data);
      } catch (error) {
        console.error(error);

      }
    };

    fetchOfferListings();
  }, []);


  return (
    <section className="">
      {/* top */}
      <div className="flex flex-col gap-6 py-28 px-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-700 lg:text-6xl">
          Find your next <span className='text-slate-500'>perfect</span> <br /> place with ease
        </h1>

        <div className="text-gray-600 text-xs sm:text-sm">
          Aklesh Estate is the best place to find your next perfect place to live.
          <br />
          We have a wide range of properties to choose from, including apartments, houses, and commercial spaces.
        </div>

        <Link to={"/search"} className='text-xs sm:text-sm text-blue-600 font-bold hover:underline'>
          Let's start now...
        </Link>
      </div>


      {/* swiper */}
      <Swiper navigation>
        {
          offerListings && offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div style={{ background: `url(${listing.imageUrls[0]}) center, no-repeat`, backgroundSize: 'cover' }} className="h-[500px]" key={listing._id}></div>
            </SwiperSlide>
          ))
        }
      </Swiper>


      {/* listing results for offer, sale and rent */}
      <div className="max-w-[90rem] mx-auto p-3 flex flex-col md:pl-8 gap-8 my-10">
        {
          offerListings && offerListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className='text-2xl font-semibold text-slate-600'>Recent Offers</h2>
                <Link to={'/search?offer=true'} className='text-sm text-blue-800 hover:underline font-semibold'>
                  Show more offers
                </Link>
              </div>

              <div className="flex flex-wrap gap-4">
                {
                  offerListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                  ))
                }
              </div>
            </div>
          )
        }

        {
          rentListings && rentListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className='text-2xl font-semibold text-slate-600'>Recent places for Rent</h2>
                <Link to={'/search?type=rent'} className='text-sm text-blue-800 hover:underline font-semibold'>
                  Show more places for rent
                </Link>
              </div>

              <div className="flex flex-wrap gap-4">
                {
                  rentListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                  ))
                }
              </div>
            </div>
          )
        }

        {
          saleListings && saleListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className='text-2xl font-semibold text-slate-600'>Recent place for Sale</h2>
                <Link to={'/search?type=sale'} className='text-sm text-blue-800 hover:underline font-semibold'>
                  Show more place for sale
                </Link>
              </div>

              <div className="flex flex-wrap gap-4">
                {
                  saleListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                  ))
                }
              </div>
            </div>
          )
        }
      </div>


    </section>
  )
}
