import React, { useState } from "react";
import Image from "next/image";
import GenericButton from "../generic-button";

const MentorReview = ({ mentor }) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const handleReview = async (e) => {
    e.preventDefault();
    console.log(review);
    console.log(rating);
  };

  return (
    <div className="mt-6 md:mb-14" id="reviews">
      <div className="flex">
        <div>
          <h2 className="text-slate-900 font-bold text-2xl mb-1" id="bio">
            {"Mentee'ler neler diyor?"}
          </h2>
        </div>
      </div>
      <div id="testimonial_list">
        <div className="py-10 border-0 border-solid border-b border-gray-200">
          <div className="flex text-sm text-gray-500 space-x-4">
            <div className="flex-none">
              <Image
                src="https://cdn.mentorcruise.com/cache/20d0ceea17f45e5172a60eceaa7875c3/352b150bb0acbb75/81ccbb017fa36763824deab42ca509aa.jpg"
                alt="Peter"
                width={40}
                height={40}
                className="bg-gray-100 rounded-full"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 inline">Cenk</h3>
              <div className="sm:grid sm:grid-cols-2">
                <div className="flex gap-x-2">
                  <div className="flex items-center mt-1">
                    <svg
                      className="text-teal-600 h-5 w-5 flex-shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>

                    <svg
                      className="text-teal-600 h-5 w-5 flex-shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>

                    <svg
                      className="text-teal-600 h-5 w-5 flex-shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>

                    <svg
                      className="text-teal-600 h-5 w-5 flex-shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>

                    <svg
                      className="text-teal-600 h-5 w-5 flex-shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  </div>
                  <p className="sr-only">5 out of 5 stars</p>
                  <span className="mt-1.5">May 5, 2024</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 max-w-none text-slate-900">
            <p className="text-lg">
              Ulaş gerçekten olağanüstü biri; masaya sürekli olarak taze ve
              yenilikçi fikirler getiriyor. Ayrıca yeni konseptlerin
              geliştirilmesinde paha biçilmez bir yardım sunuyor ve olağanüstü
              bir akıl hocası olarak hizmet veriyor. Sizi, mükemmellik için çok
              önemli bir nitelik olan kalıpların dışında düşünmeye teşvik eder.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-5">
          <h1 className="font-extrabold my-4">Yorum yap</h1>
          <div className="flex items-center">
            <span>Rating : </span>
            {[...Array(5)].map((star, index) => {
              const currentRating = index + 1;

              return (
                <label key={index}>
                  <input
                    className="sr-only"
                    type="radio"
                    name="rating"
                    value={currentRating}
                    onChange={() => setRating(currentRating)}
                  />
                  <span
                    className="cursor-pointer text-3xl m-1"
                    style={{
                      color:
                        currentRating <= (hover || rating)
                          ? "#ffc107"
                          : "#e4e5e9",
                    }}
                    onMouseEnter={() => setHover(currentRating)}
                    onMouseLeave={() => setHover(null)}
                  >
                    &#9733;
                  </span>
                </label>
              );
            })}
          </div>
          <input
            className="py-8 px-8 border border-slate-400 w-full rounded-lg mt-3"
            type="text"
            name="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Yorumunuzu buraya yazın..."
          />

          <GenericButton onClick={(e) => handleReview(e)} className="w-[50%]">
            Gönder
          </GenericButton>
        </div>
      </div>
    </div>
  );
};

export default MentorReview;
