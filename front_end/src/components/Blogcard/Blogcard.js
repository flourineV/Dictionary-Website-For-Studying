import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const BlogCard = ({
  title,
  introduction,
  author,
  rating,
  imageUrl,
  authorImage,
  timeAgo,
}) => {
  // Render rating stars
  const renderRating = () => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    return (
      <>
        {[...Array(fullStars)].map((_, index) => (
          <FontAwesomeIcon
            key={`full-${index}`}
            icon={faStar}
            className="text-yellow-500"
          />
        ))}
        {[...Array(emptyStars)].map((_, index) => (
          <FontAwesomeIcon
            key={`empty-${index}`}
            icon={faStar}
            className="text-gray-300"
          />
        ))}
      </>
    );
  };

  return (
    <div className="flex flex-wrap justify-center max-w-screen-lg mx-auto gap-8 mt-8">
      <div className="flex flex-col w-[400px] overflow-hidden shadow-md rounded-lg bg-[#2A2A2A]">
        <div className="w-full h-[200px]">
          <img
            src={imageUrl}
            alt="card__image"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 flex flex-col gap-2">
          <h4 className="text-white text-xl capitalize">{title}</h4>
          <p className="text-sm text-gray-200">{introduction}</p>
        </div>
        <div className="flex p-4 mt-auto">
          <div className="flex gap-2 items-center">
            <img
              src={authorImage}
              alt="user__image"
              className="rounded-full w-10 h-10"
            />
            <div className="flex flex-col">
              <h5 className="text-sm text-white">{author}</h5>
              <small className="text-gray-200">{timeAgo}</small>
            </div>
          </div>
          <div className="flex ml-auto items-center">{renderRating()}</div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
