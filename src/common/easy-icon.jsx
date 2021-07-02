import React, { Suspense } from "react";
import PropTypes from "prop-types";
import iconList from "../config/icons";
import CircularProgress from "@material-ui/core/CircularProgress";

const renderLoader = () => <CircularProgress />;

const EasyIcon = ({ icon }) => {
  const Icon = iconList[icon];
  return (
    <Suspense fallback={renderLoader()}>
      <Icon />
    </Suspense>
  );
};

EasyIcon.propTypes = {
  icon: PropTypes.string.isRequired
};

export default EasyIcon;
