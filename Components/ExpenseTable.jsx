import React, { useEffect, useRef, useState } from "react";
import "./ExpenseTable.css";
import ContextMenu from "./ContextMenu";
import TableRowProvider from "./TableRowProvider";
import { useSnackbar } from "notistack";

export default function ExpenseTable({
  data,
  setSelectedRowID,
  setContextMenuStyles,
}) {
  const [filteredData, setFilteredData] = useState(data);
  const [appliedFilter, setAppliedFilter] = useState("all");
  const [rowOrder, setRowOrder] = useState("ascending");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar(); //notistack - notifications
  // const [sortCallback, setSortCallback] = useState(() => () => {}); //sorting callback method

  const contextMenuHandler = (e) => {
    e.preventDefault();
    const { clientX, clientY } = e;
    setSelectedRowID(e.target.parentNode.id);
    setContextMenuStyles({
      display: "block",
      left: `${clientX}px`,
      top: `${clientY}px`,
    });
  };

  // filters data
  const filterData = (filter, data) => {
    if (filter !== "all") {
      setFilteredData(() => {
        return data.filter((val) => {
          return val.category === filter;
        });
      });
    } else {
      setFilteredData([...data]);
    }
  };

  // changes order of rows - asecending and descending based on amount
  const changeRowOrder = () => {
    if (rowOrder === "ascending") {
      setFilteredData((prevState) => [
        ...prevState.sort(
          (a, b) => parseFloat(a.amount) - parseFloat(b.amount)
        ),
      ]);
      setRowOrder("descending");
      enqueueSnackbar("Data sorted in Ascending order.", {
        autoHideDuration: 3000,
        variant: "success",
        className:"notistack-styles"
      });
    } else if (rowOrder === "descending") {
      setFilteredData((prevState) => [
        ...prevState.sort(
          (a, b) => parseFloat(b.amount) - parseFloat(a.amount)
        ),
      ]);
      setRowOrder("original");
      enqueueSnackbar("Data sorted in Descending order.", {
        autoHideDuration: 3000,
        variant: "success",
        className:"notistack-styles"
      });
    } else if (rowOrder === "original") {
      setFilteredData([...data]);
      setRowOrder("ascending");
      enqueueSnackbar("Data sorted in Original order.", {
        autoHideDuration: 3000,
        variant: "success",
        className:"notistack-styles"
      });
    }
  };

  useEffect(() => {
    filterData(appliedFilter, data);
  }, [data]);

  useEffect(() => {
    filterData(appliedFilter, data);
  }, [appliedFilter]);

  return (
    <>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>
                <select
                  name="category"
                  id="category"
                  onChange={(e) => {
                    setAppliedFilter(e.target.value);
                  }}
                >
                  <option value="all">All</option>
                  <option value="grocery">Grocery</option>
                  <option value="bills">Bills</option>
                  <option value="education">Education</option>
                </select>
              </th>
              <th className="amount-section">
                <div>
                  <span>Amount </span>
                  <button onClick={changeRowOrder}>↓↑</button>
                </div>
              </th>
            </tr>
          </thead>
          <tbody onContextMenu={contextMenuHandler}>
            {<TableRowProvider data={filteredData} />}
          </tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              <td></td>
              <td>
                ₹
                {filteredData.reduce((total, { amount }) => {
                  return total + parseFloat(amount);
                }, 0)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}