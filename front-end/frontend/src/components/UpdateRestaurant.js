import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';

const UpdateRestaurant = () => {
  const {id} = useParams(); // This will pass all the parameters in the URL
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [price_range, setPriceRange] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

  useEffect(()=> {
      const FetchData = async () => { //fetch restaurant so that if user open the link directly he can open page without errors.
          try{
              const response = await RestaurantFinder.get(`/${id}`); //This will return a promise so we need to put it in await and async
              setName(response.data.data.restaurants.name);
              setLocation(response.data.data.restaurants.location);
              setPriceRange(response.data.data.restaurants.price_range);
          }
          catch(err){
              console.log(err);
          }  
      };
      FetchData();
    }, [id, setName, setLocation, setPriceRange]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try{
        await RestaurantFinder.put(`/${id}`, {
            name:name,
            location:location,
            price_range:price_range
        });
        navigate("/");
    }
    catch(err){
        setError("Could not update restaurant. Please make sure the backend and database are running.");
    }
    finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input value={name} onChange={e => setName(e.target.value)} id="name" className='form-control' type="text" required />
            </div>

            <div className="form-group">
                <label htmlFor="location">Location</label>
                <input value={location} onChange={e => setLocation(e.target.value)} id="location" className='form-control' type="text" required />
            </div>

            <div className="form-group">
                <label htmlFor="price_range">Price Range</label>
                <select value={price_range} onChange={e => setPriceRange(e.target.value)} id="price_range" className='custom-select form-control' required>
                    <option value="" disabled>Select price range</option>
                    <option value='1'>$ - Budget</option>
                    <option value='2'>$$ - Moderate</option>
                    <option value='3'>$$$ - Expensive</option>
                    <option value='4'>$$$$ - Very expensive</option>
                    <option value='5'>$$$$$ - Luxury</option>
                </select>
            </div>

            <button disabled={isSubmitting} type='submit' className='btn btn-primary'>
                {isSubmitting ? "Saving..." : "Submit"}
            </button>
            {error && <div className="alert alert-danger mt-3" role="alert">{error}</div>}
        </form>
    </div>
  )
};

export default UpdateRestaurant;