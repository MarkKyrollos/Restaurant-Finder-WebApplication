import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';
import Reviews from '../components/Reviews';
import AddReview from '../components/AddReview';
import StarRating from '../components/StarRating';

const RestaurantDetailPage = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantsContext);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await RestaurantFinder.get(`/${id}`);
      setSelectedRestaurant(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  fetchData();
} , [id, setSelectedRestaurant]);


  return (
    <div>
        {selectedRestaurant && (
          <>
            <h1 className='text-center display-1'>{selectedRestaurant.restaurants.name}</h1>
            <div className="text-center">
              <StarRating rating={selectedRestaurant.restaurants.average_rating} />
              <span className="text-warning ml-1">
                {selectedRestaurant.restaurants.count ? `(${selectedRestaurant.restaurants.count})`: "(0)"}
              </span>
            </div>
            <div className="mt-3">
              <Reviews reviews={selectedRestaurant.reviews}/>
            </div>
            <AddReview />
            <button onClick={() => navigate('/')} type="button" className="btn btn-secondary mb-4">
              Back to restaurants
            </button>
          </>
        )}
    </div>
  )
};

export default RestaurantDetailPage;