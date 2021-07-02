import Joi from "joi-browser";
import { toast } from "react-toastify";
import { Component } from "react";

class FormBase extends Component {
  state = {
    ...this.state,
    data: {},
    error: {},
    errors: {},
    listPBT: [],
    listPTD: [],
    schema: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    // console.log(21, this.state.data, this.schema, options);
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};

    // eslint-disable-next-line
    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();

    // console.log(43, errors);
    this.setState({ errors: errors || {} });
    if (errors) {
      let txt = "";
      // eslint-disable-next-line
      for (let x in errors) {
        txt += errors[x] + " .\n ";
      }
      toast.error(txt);
    } else if (this.doSubmit) {

      this.doSubmit();
    }
  };

  handleChange = ({ currentTarget: input }) => {
    let data = { ...this.state.data };
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    data[input.name] = input.value;

    switch (input.type) {
      case "checkbox":
        if (input.checked) {
          data[input.name] = input.value;
        } else {
          data[input.name] = "";
        }
        break;
      default:
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];
    }
    // console.log(72, input);

    if (this.doChange) {
      data = this.doChange(input, data);
    }

    if (this.doFilter) {
      data = this.doFilter(input, data);
    }

    if (this.onEditTextPenyelenggaraan) {
      this.onEditTextPenyelenggaraan(input, data);
    }

    this.setState({ data, errors });
  };

  getData = () => {
    const data = { ...this.state.data };
    return data;
  };
}

export default FormBase;
