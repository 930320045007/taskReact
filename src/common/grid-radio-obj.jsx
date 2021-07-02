import React, { Fragment } from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
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
    transform: "scale(0.75)"
  },
  group: {
    marginLeft: 8
  },
  radio: {
    height: 30,
    lineHeight: 30
    // paddingLeft: 8
    // paddingLeft: 8
  }
};

const GridRadioObj = ({ classes, settings }) => {
  const { field, label, options } = settings;
  return (
    <Fragment>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" className={classes.formLabel}>
          {label}
        </FormLabel>
        <RadioGroup
          aria-label={label}
          name={field}
          className={classes.group}
          // value={this.state.value}
          // onChange={this.handleChange}
        >
          {options.map((option, idx) => (
            <FormControlLabel
              key={idx}
              value={option.value}
              control={<Radio color="primary" />}
              label={option.label}
              labelPlacement={option.align || "end"}
              className={classes.radio}
              {...option.params}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Fragment>
  );
};

export default withStyles(styles)(GridRadioObj);
