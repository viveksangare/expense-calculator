import React, { useState } from "react";
import { useSnackbar } from "notistack";
import "./ExpenseForm.css";
import Modal from "./Modal";
import SelectOptionProvider from "./SelectOptionProvider";

export default function ExpenseForm({
  filledFormData,
  setFilledFormData,
  isFormValid,
  setData,
  data,
  categoriesList,setCategoriesList
}) {
  const [displayWarnings, setDisplayWarnings] = useState({
    title: true,
    category: true,
    amount: true,
  }); //display form validations warnings
  const [isModalOpen, setIsModalOpen] = useState(false); //modal open/close state
  const { enqueueSnackbar } = useSnackbar(); //notistack for notification

  // on submit handler
  const submitHandler = (e) => {
    e.preventDefault();

    if (!isFormValid.title) {
      setDisplayWarnings((prevState) => ({
        ...prevState,
        title: false,
      }));
    } else {
      setDisplayWarnings((prevState) => ({
        ...prevState,
        title: true,
      }));
    }

    if (!isFormValid.category) {
      setDisplayWarnings((prevState) => ({
        ...prevState,
        category: false,
      }));
    } else {
      setDisplayWarnings((prevState) => ({
        ...prevState,
        category: true,
      }));
    }

    if (!isFormValid.amount) {
      setDisplayWarnings((prevState) => ({
        ...prevState,
        amount: false,
      }));
    } else {
      setDisplayWarnings((prevState) => ({
        ...prevState,
        amount: true,
      }));
    }

    if (isFormValid.title && isFormValid.category && isFormValid.amount) {
      if (data.some((val) => val.id === filledFormData.id)) {
        setData((prevState) =>
          data.map((val) =>
            val.id === filledFormData.id
              ? {
                  ...val,
                  title: filledFormData.title,
                  category: filledFormData.category,
                  amount: filledFormData.amount,
                }
              : val
          )
        );
        enqueueSnackbar("Expense edited.", {
          autoHideDuration: 3000,
          variant: "success",
          className: "notistack-styles",
        });
        setFilledFormData({
          id: crypto.randomUUID(),
          title: "",
          category: "",
          amount: "",
        });
      } else {
        setData((prevState) => {
          const newArray = [...prevState];
          newArray.push(filledFormData);
          return newArray;
        });
        enqueueSnackbar("Expense added.", {
          autoHideDuration: 3000,
          variant: "success",
          className: "notistack-styles",
        });
        setFilledFormData({
          id: crypto.randomUUID(),
          title: "",
          category: "",
          amount: "",
        });
      }
    }
  };

  //on reset handler
  const resetHandler = () => {
    setFilledFormData({
      id: crypto.randomUUID(),
      title: "",
      category: "",
      amount: "",
    });
  };

  return (
    <div className="form-wrapper">
      <form id="form">
        <label htmlFor="form-title">Title*</label>
        <input
          type="text"
          name="title"
          id="form-title"
          value={filledFormData.title}
          onChange={(e) => {
            setFilledFormData((prevState) => ({
              ...prevState,
              title: e.target.value,
            }));
          }}
        />
        <p className="formWarning">
          {!displayWarnings.title
            ? "Title should be atleast 3 characters."
            : ""}
        </p>
        <label htmlFor="form-category">Category*</label>
        <select
          name="category"
          id="form-category"
          value={filledFormData.category}
          onChange={(e) => {
            setFilledFormData((prevState) => ({
              ...prevState,
              category: e.target.value,
            }));
          }}
        >
          {
            <SelectOptionProvider
              categoriesList={categoriesList}
              defaultValues={{defaultValue:"default",defaultText:"Select Category",hidden:true}}
            />
          }
        </select>
        <p className="formWarning">
          {!displayWarnings.category ? "Category cannot be empty." : ""}
        </p>
        <label htmlFor="form-amount">
          Amount* <small>(Numbers only)</small>
        </label>
        <input
          type="number"
          name="amount"
          id="form-amount"
          step="0.01"
          value={filledFormData.amount}
          onChange={(e) => {
            setFilledFormData((prevState) => ({
              ...prevState,
              amount: e.target.value,
            }));
          }}
        />
        <p className="formWarning">
          {!displayWarnings.amount ? "Amount cannot be empty or '0'." : ""}
        </p>
        <div className="form-button-wrapper">
          <button
            type="submit"
            className="submit-button"
            onClick={submitHandler}
          >
            Add
          </button>
          <button type="reset" onClick={resetHandler}>
            Reset
          </button>
          <button
            type="button"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Add Category
          </button>
          <Modal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            categoriesList={categoriesList}
            setCategoriesList={setCategoriesList}
          />
        </div>
      </form>

      <div className="formConditionsWrapper">
        <h4>Input Conditions:</h4>
        <p>Title should be atleast 3 characters.</p>
        <p>Category cannot be empty.</p>
        <p>Amount cannot be empty or cannot be '0'.</p>
      </div>
    </div>
  );
}
