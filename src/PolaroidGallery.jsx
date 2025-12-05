import React from "react";

const PolaroidGallery = ({ images }) => {
  const rotations = ["-rotate-6", "rotate-3", "rotate-6", "-rotate-3"];

  return (
    <div className="relative w-full max-w-7xl mx-auto h-[950px]">
      {images.map((src, index) => {
        const row = Math.floor(index / 3);      // intentional vertical bands
        const col = index % 3;                  // intentional horizontal bands

        const topBase = row * 28;               // vertical band spacing
        const leftBase = col * 28;              // horizontal band spacing

        return (
          <div
            key={index}
            className={`
              absolute p-3 bg-white shadow-2xl rounded-sm
              transition-transform duration-500
              hover:scale-110 hover:z-50
              ${rotations[index % rotations.length]}
            `}
            style={{
              width: "230px",
              top: `${topBase + Math.random() * 6}%`,
              left: `${leftBase + Math.random() * 6}%`,
            }}
          >
            <img
              src={src}
              alt={`polaroid-${index}`}
              className="w-full h-60 object-cover rounded-sm"
            />
          </div>
        );
      })}
    </div>
  );
};

export default PolaroidGallery;
