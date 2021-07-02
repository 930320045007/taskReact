import React from "react";
import GridForm from "../common/grid-form";
import Schema from "./../schema/schema-wqs";
import {
  Button,
} from "@material-ui/core";
import PrivateFormPage from "./../common/private-form-page";
import { Delete, Update } from '@material-ui/icons';

let style = {
  tablecss: {
    width: "100%",
    border: "1px solid black",
    margin: "10px"
  },
  thtdcss: {
    border: "1px solid black"
  },
  hover: {
    "&:hover": { transform: "scaleY(1.5)" }

  }
};

class Form extends PrivateFormPage {
  state = {
    isUpdate: false,
    list: [],
    errors: {},
    data: {},
    blueprint: [
      {
        field: "email",
        label: "Email",
        size: 4,
      },
      {
        filler: 8,
      },
      {
        field: "name",
        label: "Nama",
        size: 4,
      },
      {
        filler: 8,
      },
      {
        field: "nric",
        label: "No IC",
        size: 4,
      }
    ]
  }

  doSubmit = () => {
    const { data, list } = this.state;
    list.push(data)
    this.setState({ list, data: {} })
    console.log(data);
  }
  deleteRow = (nric) => {
    let { list } = this.state;
    list = list.filter((x) => x.nric !== nric)
    this.setState({ list })
  }
  updateRow = (nric) => {
    let { data, list } = this.state;
    data = list.find(obj => obj.nric === nric)
    this.setState({ data, isUpdate: nric })
  }
  handleUpdate = () => {
    let { data, list, isUpdate } = this.state;
    // list = list.filter((y) => y.nric === isUpdate).map(z => z = { ...data })
    let tempList = []
    for (let i = 0; i < list.length; i++) {
      if (list[i].nric === isUpdate) {
        list[i] = { ...data }
      }
      tempList.push(list[i])
    }
    console.log(data)
    this.setState({ data: {}, list: tempList, isUpdate: false })
  }
  schema = Schema;
  render() {
    const { blueprint, data, errors, list, isUpdate } = this.state;
    return (<div><GridForm
      blueprint={blueprint}
      formHandler={this.handleChange}
      formData={data}
      errors={errors}
      spacing={1}
    />
      <Button
        onClick={isUpdate ? this.handleUpdate : this.handleSubmit}
        color="primary"
        variant="contained"
        style={{ marginLeft: 10 }}
      >
        &nbsp;{isUpdate ? "KEMASKINI" : "SIMPAN"}
      </Button>
      <table style={style.tablecss}>
        <tr>
          <th style={style.thtdcss}>Email</th>
          <th style={style.thtdcss}>Name</th>
          <th style={style.thtdcss}>No IC</th>
          <th style={style.thtdcss}>Update</th>
          <th style={style.thtdcss}>Delete</th>
        </tr>
        {list.map(obj => (
          <tr>
            <td style={style.thtdcss}>{obj.email}
            </td>
            <td style={style.thtdcss}>{obj.name}
            </td>
            <td style={style.thtdcss}>{obj.nric}
            </td>
            <td style={style.thtdcss}>
              <Button
                onClick={() => this.updateRow(obj.nric)}
                color="primary"
                variant="contained">
                <Update />
              </Button>
            </td>
            <td style={style.thtdcss}>
              <Button
                onClick={() => this.deleteRow(obj.nric)}
                color="secondary"
                variant="contained"
              >
                <Delete />
              </Button>
            </td>

          </tr>))}
      </table>

    </div>);
  }
}

export default Form;