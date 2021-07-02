import React, { Fragment } from "react";
import { InputAdornment, Icon, Grid, Button, Tooltip } from "@material-ui/core";
import GridRadioObj from "./grid-radio-obj";
import GridCheckboxObj from "./grid-checkbox-obj";
import TextfieldObj from "./textfield-obj";
import "./form-item.css";
import EasyIcon from "./../common/easy-icon";

const FormItem = ({
  settings,
  formHandler,
  // blurHandler,
  param,
  value,
  error,
  gap,
  formData,
  errors
}) => {
  // const { field, size, compact, select } = settings;
  const renderAdornment = ({
    position,
    icon,
    iconComponent: Component,
    text,
    callback,
    style,
    disabled
  }) => {
    const param = {};
    if (callback) {
      param.onClick = () => {
        if (!disabled) {
          callback();
        }
      };
    }
    return (
      <InputAdornment position={position} {...param} {...style}>
        {text ? text : ""}
        {!text && Component ? (
          <Component />
        ) : (
          <Icon style={{ fontSize: 30 }}>{icon}</Icon>
        )}
      </InputAdornment>
    );
  };

  const checkError = field => {
    return errors[field] ? true : false;
  };
  const getHelperText = field => {
    return errors[field];
  };

  const {
    field,
    size,
    compact,
    select,
    radio,
    checkbox,
    adornment,
    submitOnEnter,
    schema,
    multirow,
    cluster,
    button,
    ...properties
  } = settings;
  const newProps = {
    ...properties,
    ...param
  };

  newProps.value = formData ? formData[field] : "";
  newProps.error = errors ? errors[field] : "";

  let mode = newProps.type;
  let multifieldProps;

  if (typeof field === "string") {
    newProps.id = field;
    newProps.name = field;
    newProps.margin = newProps.margin || "dense";
    newProps.variant = newProps.variant || "outlined";

    if (newProps.multiline) {
      newProps.rows = newProps.multiline;
      newProps.multiline = true;
    }

    if (radio) {
      mode = "radio";
    }

    if (checkbox) {
      mode = "checkbox";
    }
    if (button) {
      mode = "button";
    }
    if (select) {
      newProps.select = true;
      newProps.SelectProps = { native: true };
    }

    if (adornment) {
      newProps.InputProps = {};
      adornment.forEach(item => {
        newProps.InputProps[item.position + "Adornment"] = renderAdornment({
          ...item,
          ...properties
        });
      });
    }

    if (gap) {
      if (!newProps.style) {
        newProps.style = {};
      }
      newProps.style.marginTop = gap;
      newProps.style.marginBottom = gap;
    }
  }

  if (cluster) {
    mode = "cluster";
    multifieldProps = cluster.map((item, idx) => {
      const fieldProps = {
        ...newProps,
        ...item,
        name: item.field,
        id: item.field
      };
      fieldProps.margin = fieldProps.margin || "dense";
      fieldProps.variant = fieldProps.variant || "outlined";
      fieldProps.value = formData[item.field];
      fieldProps.error = errors[item.field];

      return fieldProps;
    });
  }

  if (multirow) {
    mode = "multirow";
    newProps.className = "multirow";

    multifieldProps = multirow.map((item, idx) => {
      const fieldProps = { ...newProps, id: item, name: item, label: "" };
      fieldProps.value = formData[item];
      fieldProps.error = errors[item];
      return fieldProps;
    });
  }

  if (submitOnEnter) {
  }

  let fieldObj;
  switch (mode) {
    case "checkbox":
      fieldObj = (
        <GridCheckboxObj
          {...newProps}
          options={checkbox}
          formHandler={formHandler}
          formData={formData}
        />
      );
      break;
    case "radio":
      fieldObj = (
        <GridRadioObj
          {...newProps}
          options={radio}
          formHandler={formHandler}
          formData={formData}
        />
      );
      break;
    case "cluster":
      fieldObj = (
        <Fragment>
          {multifieldProps.map((fieldProps, idx) => (
            <Grid key={idx} item xs={fieldProps.size || 12}>
              <TextfieldObj
                {...fieldProps}
                onChange={formHandler}
                fullWidth
                error={checkError(field)}
                helperText={getHelperText(field)}
                InputLabelProps={{
                  shrink: !compact,
                  style: {
                    color: "#000000",
                    fontWeight: "bold"
                  }
                }}
              />
            </Grid>
          ))}
        </Fragment>
      );
      break;
    case "multirow":
      fieldObj = (
        <Fragment>
          <TextfieldObj
            {...newProps}
            onChange={formHandler}
            fullWidth
            error={checkError(field)}
            helperText={getHelperText(field)}
            InputLabelProps={{
              shrink: !compact,
              style: { color: "#000000", fontWeight: "bold" }
            }}
          />
          {multifieldProps.map((fieldProps, idx) => (
            <TextfieldObj
              key={idx}
              {...fieldProps}
              onChange={formHandler}
              fullWidth
              error={checkError(fieldProps.field)}
              helperText={getHelperText(fieldProps.field)}
              InputLabelProps={{
                shrink: !compact,
                style: {
                  color: "#000000",
                  fontWeight: "bold"
                }
              }}
            />
          ))}
        </Fragment>
      );
      break;
    case "button":
      fieldObj = (
        <Tooltip {...newProps} title={newProps.tooltip} placement="right">
          <Button
            {...newProps}
            variant="contained"
            fullWidth
            color={newProps.color}
            disabled={newProps.disabled}
            onClick={newProps.onClick}
            style={{ marginTop: 10, marginLeft: -5, minWidth: 35 }}
          >
            {newProps.label}
            <EasyIcon icon={newProps.icon} />
          </Button>
        </Tooltip>
      );
      break;
    default:
      fieldObj = (
        <TextfieldObj
          {...newProps}
          // value={value || ""}
          value={formData[field] || newProps.value || ""}
          onChange={formHandler}
          fullWidth
          error={checkError(field)}
          helperText={getHelperText(field)}
          InputLabelProps={{
            shrink: !compact,
            style: { color: "#000000", fontWeight: "bold" }
          }}
          selectList={select}
        />
      );
  }

  return fieldObj;
};

export default FormItem;
