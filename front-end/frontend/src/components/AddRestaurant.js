import React, { useContext, useState } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

const AddRestaurant = () => {
  const {restaurants, setRestaurants} = useContext(RestaurantsContext);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [price_range, setPriceRange] = useState("Price Range");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (price_range === "Price Range") {
        setError("Please select a price range before adding the restaurant.");
        return;
    }

    setIsSubmitting(true);

    try{
        const response = await RestaurantFinder.post("/", {
            name: name,
            location: location,
            price_range: price_range
        });
        setRestaurants([...restaurants, response.data.data.restaurants]);
        setName("");
        setLocation("");
        setPriceRange("Price Range");
    }
    catch(err){
        setError("Could not add restaurant. Please make sure the backend and database are running.");
    }
    finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className='mb-4'>
        <form onSubmit={handleSubmit}>
            <div className='form-row align-items-end'>
                <div className='col'>
                    <label htmlFor="restaurant-name">Restaurant name</label>
                    <input id="restaurant-name" value={name} onChange={e => { setName(e.target.value); setError(""); }} type="text" className='form-control' placeholder='Restaurant name' required />
                </div>
                <div className="col">
                    <label htmlFor="restaurant-location">Location</label>
                    <input id="restaurant-location" value={location} onChange={e => { setLocation(e.target.value); setError(""); }} type="text" className='form-control' placeholder='City or address' required />
                </div>
                <div className="col">
                    <label htmlFor="restaurant-price">Price range</label>
                    <select id="restaurant-price" value={price_range} onChange={e => { setPriceRange(e.target.value); setError(""); }} className='custom-select my-1 mr-sm-2' required>
                        <option value="Price Range" disabled>Select price range</option>
                        <option value='1'>$ - Budget</option>
                        <option value='2'>$$ - Moderate</option>
                        <option value='3'>$$$ - Expensive</option>
                        <option value='4'>$$$$ - Very expensive</option>
                        <option value='5'>$$$$$ - Luxury</option>
                    </select>
                </div>
                <button disabled={isSubmitting} type='submit' className='btn btn-primary'>
                    {isSubmitting ? "Adding..." : "Add"}
                </button>
            </div>
            {error && <div className="alert alert-danger mt-3 mb-0" role="alert">{error}</div>}
        </form>
    </div>
  )
};

export default AddRestaurant;