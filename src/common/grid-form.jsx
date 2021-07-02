import React, { Component, Fragment } from "react";
import { Grid, Typography, Hidden } from "@material-ui/core";
import GridFormItem from "./grid-form-item";
import { getFieldValue } from "./../utils/utilities";

class GridForm extends Component {
  state = { hidden: {}, disabled: {} };
  render() {
    const {
      blueprint,
      formHandler,
      formData,
      errors,
      customFunction,
      spacing,
    } = this.props;

    return (
      <Grid container spacing={spacing || 16}>
        {blueprint.map((field, idx) =>
          field.filler ? (
            field.label ? (
              <Fragment key={idx}>
                <Grid
                  xs={4}
                  item
                  style={{
                    fontWeight: "bold",
                    paddingTop: 2,
                    paddingBottom: 2,
                  }}
                >
                  {field.label}
                </Grid>
                <Grid xs={8} item style={{ paddingTop: 2, paddingBottom: 2 }}>
                  {field.select
                    ? getFieldValue(field.select, formData[field.field])
                    : formData[field.field]}
                </Grid>
              </Fragment>
            ) : (
              <Hidden xsDown key={idx}>
                <Grid
                  xs={12}
                  sm={field.filler}
                  item
                  style={field.style}
                  key={idx}
                >
                  <Typography variant="h3">{field.biggerHeading}</Typography>
                  <Typography variant="h5">{field.heading}</Typography>
                  <Typography variant="h6" align="center">
                    {field.headingCenter}
                  </Typography>
                  <Typography variant="h6" align="center">
                    {field.title}
                  </Typography>
                  <Typography variant="h6" align="left">
                    {field.title2}
                  </Typography>
                  <Typography variant="body1">{field.notes}</Typography>

                  {/* farid ttry starts */}
                  <Typography variant="body2">{field.notes2}</Typography>
                  <Typography variant="subtitle1">{field.subtitle1}</Typography>
                  <Typography variant="subtitle2">{field.subtitle2}</Typography>
                  <Typography variant="caption">{field.caption}</Typography>
                  <Typography variant="overline">{field.overline}</Typography>
                  <Typography variant="paragraph">{field.paragraph}</Typography>
                  <Typography variant="colorInherit">
                    {field.colorInherit}
                  </Typography>
                  <Typography variant="colorSecondary">
                    {field.colorSecondary}
                  </Typography>
                  <Typography variant="colorTextSecondary">
                    {field.colorTextSecondary}
                  </Typography>

                  {/*  
                | 'subtitle1'
                | 'subtitle2'
                | 'body1'
                | 'body2'
                | 'caption'
                | 'button'
                | 'overline'
                | 'srOnly'
                | 'alignLeft'
                | 'alignCenter'
                | 'alignRight'
                | 'alignJustify'
                | 'noWrap'
                | 'gutterBottom'
                | 'paragraph'
                | 'colorInherit'
                | 'colorSecondary'
                | 'colorTextSecondary'
                | 'colorError'
                | 'displayInline'
                | 'displayBlock'; 
                */}
                  {/* farid try ends */}
                </Grid>
              </Hidden>
            )
          ) : (
            <GridFormItem
              settings={field}
              formHandler={formHandler}
              // blurHandler={blurHandler}
              // param={fieldParams[field.field]}
              customFunction={customFunction}
              // error={errors[field.field]}
              // value={formData[field.field]}
              errors={errors}
              formData={formData}
              key={idx}
              spacing={spacing || 16}
            />
          )
        )}
      </Grid>
    );
  }
}

export default GridForm;
