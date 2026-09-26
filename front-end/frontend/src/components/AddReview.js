import React, { useState } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { useNavigate, useParams } from 'react-router-dom';
import StarRating from './StarRating';

const AddReview = () => {
  const {id} = useParams();
  let navigate = useNavigate();
  const[name, setName] = useState("");
    const[rating, setRating] = useState(0);
  const[review, setReview] = useState("");
  const[error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!rating) {
        setError("Please select a star rating.");
        return;
    }

    try{
        await RestaurantFinder.post(`/${id}/addReview`, {
            name: name,
            review: review,
            rating: rating
        });
        navigate("/");
        }
        catch(err){
            setError("Could not submit review. Please make sure the backend and database are running.");
        }
  };

  return (
    <div className='mb-2'>
        <form onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="form-group col-8">
                    <label htmlFor="name">Name</label>
                    <input value={name} onChange={e => setName(e.target.value)} id='name' placeholder='name' type="text" className='form-control' required />
                </div>
                <div className="form-group col-4">
                    <label htmlFor="rating">Rating</label>
                    <StarRating rating={rating} interactive onChange={setRating} />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="review">Review</label>
                <textarea value={review} onChange={e => setReview(e.target.value)} id="review" className="form-control" required></textarea>
            </div>
                <button type='submit' className='btn btn-primary'>Submit</button>
                {error && <div className="alert alert-danger mt-3" role="alert">{error}</div>}
        </form>
    </div>
  )
};

export default AddReview;