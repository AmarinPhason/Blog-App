import React from "react";

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Welcome to Our Website!
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Here you&#39;ll find a variety of products and services that cater to
        your needs.
      </p>
      <img
        src="https://via.placeholder.com/600x400"
        alt="Placeholder"
        className="w-full max-w-md mb-8 shadow-lg rounded"
      />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Learn More
      </button>
    </div>
  );
}
