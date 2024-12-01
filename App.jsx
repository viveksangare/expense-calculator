import React, { useEffect, useState } from "react";
import ExpenseForm from "./Components/ExpenseForm";
import ExpenseTable from "./Components/ExpenseTable";
import "./App.css";
import { dbData, categoryData } from "./data";
import ContextMenu from "./Components/ContextMenu";
import { SnackbarProvider } from "notistack";
import useLocalStorage from "./hooks/useLocalStorage";

export default function App() {
  const [fetchedData, setFetchedData] = useState(dbData);
  const [data, setData] = useLocalStorage("expenseData", fetchedData); //useable data with localstorage functionality
  const [categoriesList, setCategoriesList] = useLocalStorage(
    "categoryList",
    categoryData
  ); //categories data from DB
  const [filledFormData, setFilledFormData] = useState({
    id: crypto.randomUUID(),
    title: "",
    category: "",
    amount: "",
  }); // entered form data

  const [isFormValid, setIsFormValid] = useState({
    title: false,
    category: false,
    amount: false,
  }); // form validation status

  const [contextMenuStyles, setContextMenuStyles] = useState({
    display: "none",
    top: "0px",
    left: "0px",
  }); // context menu styles

  const [selectedRowID, setSelectedRowID] = useState(null); //sets Right clicked row ID

  // form validation check
  useEffect(() => {
    if (filledFormData.title.length > 2)
      setIsFormValid((prevState) => ({ ...prevState, title: true }));
    else setIsFormValid((prevState) => ({ ...prevState, title: false }));

    if (filledFormData.category.length)
      setIsFormValid((prevState) => ({ ...prevState, category: true }));
    else setIsFormValid((prevState) => ({ ...prevState, category: false }));

    if (
      typeof parseFloat(filledFormData.amount) === "number" &&
      parseFloat(filledFormData.amount) > 0
    )
      setIsFormValid((prevState) => ({ ...prevState, amount: true }));
    else setIsFormValid((prevState) => ({ ...prevState, amount: false }));
  }, [filledFormData]);

  return (
    <SnackbarProvider>
      <div
        style={{ fontFamily: "'Raleway', 'sans-serif'" }}
        onClick={() => {
          if (contextMenuStyles.display !== "none") {
            setContextMenuStyles({
              display: "none",
              top: "0px",
              left: "0px",
            });
          }
        }}
      >
        <div className="app-container">
          <h1>Track Your Expenses</h1>
          <div className="data-container">
            <div className="app-inner-wrapper">
              <ExpenseForm
                filledFormData={filledFormData}
                setFilledFormData={setFilledFormData}
                isFormValid={isFormValid}
                setData={setData}
                data={data}
                categoriesList={categoriesList}
                setCategoriesList={setCategoriesList}
              />
            </div>
            <div className="app-inner-wrapper">
              <ExpenseTable
                data={data}
                setData={setData}
                setFilledFormData={setFilledFormData}
                setSelectedRowID={setSelectedRowID}
                setContextMenuStyles={setContextMenuStyles}
              />
            </div>
            <ContextMenu
              contextMenuStyles={contextMenuStyles}
              setContextMenuStyles={setContextMenuStyles}
              data={data}
              setData={setData}
              selectedRowID={selectedRowID}
              setFilledFormData={setFilledFormData}
            />
          </div>
        </div>
      </div>
    </SnackbarProvider>
  );
}
