import React, { Fragment } from "react";
import { Grid } from "@material-ui/core";
import FormItem from "../common/form-item";

const GridFormItem = props => {
  const clusterProps = {};

  if (props.settings.cluster) {
    clusterProps.container = true;
    clusterProps.spacing = props.spacing;
    if (!clusterProps.style) {
      clusterProps.style = {};
    }
    clusterProps.style.marginRight = props.spacing / 2;
  }
  return (
    <Fragment>
      <Grid item sm={props.settings.size || 12} xs={12} {...clusterProps}>
        <FormItem {...props} />
      </Grid>
    </Fragment>
  );
};

export default GridFormItem;
