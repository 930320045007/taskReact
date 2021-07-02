import React from "react";
import { TextField } from "@material-ui/core";

const TextfieldObj = ({ selectList: select, ...newProps }) => {
  return (
    <TextField {...newProps}>
      {select
        ? select.map((option, idx) => (
            <option key={idx} value={option.value || option.id}>
              {option.label || option.name}
            </option>
          ))
        : ""}
    </TextField>
  );
};

export default TextfieldObj;
