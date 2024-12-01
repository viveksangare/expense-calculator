import React from "react";

export default function SelectOptionProvider({
  categoriesList,
  defaultValues,
}) {
  const returnValue = categoriesList.map((val) => {
    return (
      <option key={val.value} value={val.value}>
        {val.text}
      </option>
    );
  });

  if (defaultValues) {
    returnValue.unshift(
      <option
        key={defaultValues.defaultValue}
        value={defaultValues.defaultValue}
        hidden={defaultValues.hidden}
      >
        {defaultValues.defaultText}
      </option>
    );
  }

  return <>{returnValue}</>;
}