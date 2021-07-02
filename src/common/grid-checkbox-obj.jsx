import React, { Fragment } from "react";
import {
  FormControl,
  FormLabel,
  FormGroup,
  Checkbox,
  FormControlLabel,
  withStyles
} from "@material-ui/core";

const styles = {
  formControl: {
    width: "100%",
    border: "solid 1px rgba(0, 0, 0, 0.23)",
    borderRadius: 4,
    padding: 8
  },
  formLabel: {
    transform: "scale(0.75)",
    color: "#000000",
    fontWeight: "bold"
  },
  group: {
    marginLeft: 8
  },
  checkbox: {
    height: 30,
    lineHeight: 30
  }
};

const GridCheckboxObj = ({ classes, ...settings }) => {
  const {
    field,
    combined,
    label,
    options,
    style,
    formHandler,
    formData
  } = settings;

  const groupOptions = {
    "aria-label": label,
    className: classes.group
  };
  if (combined) {
    groupOptions.name = field;
  }
  return (
    <Fragment>
      <FormControl
        component="fieldset"
        className={classes.formControl}
        style={style}
      >
        <FormLabel component="legend" className={classes.formLabel}>
          {label}
        </FormLabel>
        <FormGroup {...groupOptions}>
          {options.map((option, idx) => (
            <FormControlLabel
              key={idx}
              id={option.field}
              name={option.field}
              value={option.value}
              control={<Checkbox color="primary" />}
              label={option.label}
              labelPlacement={option.align || "end"}
              className={classes.checkbox}
              disabled={option.disabled}
              checked={formData[option.field] === option.value}
              {...option.params}
              onChange={formHandler}
            />
          ))}
        </FormGroup>
      </FormControl>
    </Fragment>
  );
};

export default withStyles(styles)(GridCheckboxObj);
