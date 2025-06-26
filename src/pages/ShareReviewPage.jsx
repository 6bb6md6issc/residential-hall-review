import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAuth } from '../provider/authProvider';
import axios from 'axios';
import UpdateExistingReview from '../component/myReview/UpdateExistingReview';
import CreateNewReview from '../component/myReview/CreateNewReview';
import ReviewHeader from "../component/review/ReviewHeader"
import NoSoBuilding from '../component/review/NoSoBuilding';

const ShareReviewPage = () => {
  const { buildingId } = useParams();
  const { token } = useAuth();

  const [building, setBuilding] = useState(null);
  const [ratingDto, setRatingDto] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchReviewAndImage = async () => {
      try {
        const response = await axios.get(`/api/v1/rating/my-ratings/${buildingId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        setBuilding(response.data.building);
        const rating = response.data.ratingDto;
        setRatingDto(rating);

        if (rating) {
          // fetch image
          try {
            const fileResponse = await axios.get(`/api/v1/image/${rating.rating_id}`, {
              responseType: 'arraybuffer'
            });
            if (fileResponse.status === 204 || fileResponse.data.byteLength === 0) {
              setImageUrl(""); // no image to show
            }else{
              const blob = new Blob([fileResponse.data], { type: 'image/jpeg' });
              const imageUrl = URL.createObjectURL(blob);
              setImageUrl(imageUrl);
            }
          } catch (imageError) {
            // Image might not exist - ignore
            setImageUrl("");
          }
        }

      } catch (err) {
        if (response?.data?.message === "No Such Building") {
          setErrorMessage("No such building found.");
        } else {
          setErrorMessage("An error occurred. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchReviewAndImage();
  }, [buildingId, token]);

  if (loading) return <div>Loading...</div>;
  if (!building) return <NoSoBuilding />;
  if (errorMessage) return <div>{errorMessage}</div>;
  

  return (
    <>
      <ReviewHeader buildingName={building.buildingName} buildingId={building.id} />
      {ratingDto ? (
        <UpdateExistingReview
          building={building}
          initialData={ratingDto}
          initialFile={imageUrl}
          initialFileUrl={imageUrl}
        />
      ) : (
        <CreateNewReview buildingId={building.id} />
      )}
    </>
  );
};

export default ShareReviewPage;
