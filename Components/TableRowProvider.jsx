import React from "react";

export default function TableRowProvider({ data }) {
  return data.map((val) => {
    return (
      <tr key={val.id} id={val.id}>
        <td>{val.title}</td>
        <td>{val.category.replaceAll("-"," ")}</td>
        <td>₹{parseFloat(val.amount)}</td>
      </tr>
    );
  });
}