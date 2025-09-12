import React from 'react';

const ItemMenu = ({ item }) => {
  const { img, details, name, price } = item;

  return (
    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-white to-gray-100 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer max-w-2xl mx-auto">
      <div className="flex-shrink-0 overflow-hidden rounded-tl-[100px] rounded-br-[100px] w-28 h-28 shadow-md">
        <img
          src={img}
          alt={name}
          className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="flex flex-col justify-between flex-grow">
        <h3 className="text-sm font-bold uppercase tracking-wide text-gray-800 mb-2 border-b-2 border-yellow-400 inline-block pb-1">
          {name}
        </h3>
        <p className="text-gray-600 text-xs italic">{details?.recipe}</p>
      </div>

      <div className="text-yellow-500 font-extrabold text-sm min-w-[60px] text-right">
        ${price.toFixed(2)}
      </div>
    </div>
  );
};

export default ItemMenu;
