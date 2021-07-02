import Joi from "joi-browser";

const Schema = {
  email: Joi.string().allow("").required().error((errors) => {
    return {
      message: "Sila isi email",
    };
  }), //email
  name: Joi.string().allow("").required().error((errors) => {
    return {
      message: "Sila isi nama",
    };
  }), //nama
  nric: Joi.string().allow("").required().error((errors) => {
    return {
      message: "Sila isi no kad pengenalan",
    };
  }), // nric

};

export default Schema;
