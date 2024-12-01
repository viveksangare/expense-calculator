import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./Modal.css"; // Import custom CSS for styling
import { useSnackbar } from "notistack";

const Modal = ({
  isModalOpen,
  setIsModalOpen,
  categoriesList,
  setCategoriesList,
}) => {
  const [inputValue, setInputValue] = useState(""); // Manage input state
  const { enqueueSnackbar, closeSnackbar } = useSnackbar(); //notistack - notifications

  if (!isModalOpen) return null; // Don't render if modal is closed

  const onClose = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload on submit
    let condition2 = inputValue.toLowerCase().replaceAll(" ", "-");

    if (
      inputValue.length &&
      !categoriesList.some((val) => val.value === condition2)
    ) {
      setCategoriesList((prevState) => [
        ...prevState,
        { value: condition2, text: inputValue },
      ]);

      enqueueSnackbar("New Category Added.", {
        autoHideDuration: 3000,
        variant: "success",
        className: "notistack-styles",
      });
      setInputValue("");
      onClose(); // Close the modal
    } else {
      enqueueSnackbar(
        "Category cannot be empty or the Category already exists",
        {
          autoHideDuration: 3000,
          variant: "error",
          className: "notistack-styles",
        }
      );
    }
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Enter New Category</h2>
          <button className="modal-close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-body">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter something..."
          />
          <button type="submit">Add Category</button>
        </form>
      </div>
    </div>,
    document.getElementById("modal") // Rendered through Portal
  );
};

export default Modal;
