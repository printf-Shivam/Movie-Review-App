import { useEffect, useRef, useState } from 'react';
import api from '../api/axiosConfig';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ReviewForm from './ReviewForm';
import React from 'react';

const Reviews = ({ getMovieData, movie, reviews: initialReviews }) => {
  const [reviews, setReviews] = useState(initialReviews || []); 
  const revText = useRef();
  let { movieId } = useParams();

  useEffect(() => {
    getMovieData(movieId);
    setReviews(initialReviews || []); 
  }, [movieId, initialReviews]);

  const addReview = async (e) => {
    e.preventDefault();

    const rev = revText.current.value.trim();
    if (!rev) return; // ✅ Prevent empty reviews

    try {
      const response = await api.post("/api/v1/reviews", {
        reviewBody: rev,
        imdbId: movieId,
      });

      const newReview = { body: rev, _id: response.data?.id || Date.now() }; // ✅ Ensure unique key

      setReviews((prev) => [...prev, newReview]); // ✅ Update immediately
      revText.current.value = ""; // ✅ Clear textarea
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Row>
        <Col><h3>Reviews</h3></Col>
      </Row>
      <Row className="mt-2">
        <Col md={4}>
          <img src={movie?.poster} alt={movie?.title || "Movie"} style={{ maxWidth: "100%" }} />
        </Col>
        <Col md={8}>
          <Row>
            <Col>
              <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a Review?" />
            </Col>
          </Row>
          <Row><Col><hr /></Col></Row>
          {reviews?.map((r, index) => (
            <React.Fragment key={r._id || index}>
              <Row>
                <Col>{r.body}</Col>
              </Row>
              <Row>
                <Col><hr /></Col>
              </Row>
            </React.Fragment>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Reviews;
