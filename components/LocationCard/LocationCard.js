import React, { useState } from "react";

export default function Card({ locationName, categories, quality }) {
  return (
    <div className="card">
      <h2>{locationName}</h2>
      <p>Categories: {categories.join(", ")}</p>
      <p>Quality: {quality}</p>
    </div>
  );
}
