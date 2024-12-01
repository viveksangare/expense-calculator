import React from "react";
import "./ContextMenu.css";
import closeButton from "../assets/images/close.png";

export default function ContextMenu({
  contextMenuStyles,
  setContextMenuStyles,
  setData,
  selectedRowID,
  setFilledFormData,
  data,
}) {
  const handleDelete = (e) => {
    e.stopPropagation();

    setData((prevState) => {
      let newData = [...prevState];
      return newData.filter((val) => {
        return val.id !== selectedRowID;
      });
    });
    setContextMenuStyles(() => ({
      display: "none",
      top: "0px",
      left: "0px",
    }));
  };

  const handleEdit = (e) => {
    e.stopPropagation();

    const dataToSet = data.filter((val) => {
      return val.id === selectedRowID;
    });

    setFilledFormData(() => ({
      id: dataToSet[0].id,
      title: dataToSet[0].title,
      category: dataToSet[0].category,
      amount: dataToSet[0].amount,
    }));

    setContextMenuStyles(() => ({
      display: "none",
      top: "0px",
      left: "0px",
    }));
  };

  return (
    <div
      id="context-menu"
      style={{
        display: contextMenuStyles.display,
        top: contextMenuStyles.top,
        left: contextMenuStyles.left,
      }}
    >
      <div className="context-menu-img-wrapper">
        <div
          onClick={(e) => {
            e.stopPropagation();
            setContextMenuStyles({ display: "none", top: "0px", left: "0px" });
          }}
        >
          <img
            src={closeButton}
            alt="close-button"
            className="context-menu-close-button"
          />
        </div>
      </div>
      <ul>
        <li onClick={handleEdit}>Edit</li>
        <li onClick={handleDelete}>Delete</li>
      </ul>
    </div>
  );
}
