// components/PriceItem.jsx
import React from "react";

const PriceItem = ({ detail, unit, price }) => {
  return (
    <tr>
      <td className="py-2 px-4 border border-gray-300">{detail}</td>
      <td className="py-2 px-4 border border-gray-300">{unit}</td>
      <td className="py-2 px-4 border border-gray-300">{price}</td>
    </tr>
  );
};

export default PriceItem;
