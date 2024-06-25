// components/Section.jsx
import React, { useState } from "react";

import { Label2 } from "./ui/Label";
import PriceItem from "./PriceItems";

const Section = ({ title, items }) => {
  const [focusedInput, setFocusedInput] = useState(null);
  const handleFocus = (field) => setFocusedInput(field);
  const handleBlur = () => setFocusedInput(null);

  return (
    <div className="mb-8">
      <div className="bg-white p-4 mb-4 border-t-8 border-univalleColorOne rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-univalleColorTwo">
          {title}
        </h2>
      </div>
      <div
        className={`mb-2 p-4 border bg-white ${
          focusedInput === "event" ? "border-red-500" : "border-gray-300"
        } rounded-lg`}
      >
        <table className="min-w-full bg-white border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 border border-gray-300">
                <Label2>Detalle</Label2>
              </th>
              <th className="py-2 border border-gray-300">
                <Label2>U.M</Label2>
              </th>
              <th className="py-2 border border-gray-300">
                <Label2>Precio</Label2>
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <PriceItem key={index} {...item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Section;
