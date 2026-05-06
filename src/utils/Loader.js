import React from "react";
import "./Loader.css";

const Loader = ({
  variant = "section",
  size = "medium",
  label = "Loading...",
  progress,
}) => {
  const resolvedLabel =
    progress !== undefined ? `${progress}%` : label;

  return (
    <div className={`loader loader--${variant}`}>
      <div className={`loader-spinner loader-spinner--${size}`}></div>
      {resolvedLabel ? (
        <div className={`loader-text loader-text--${variant}`}>
          {resolvedLabel}
        </div>
      ) : null}
    </div>
  );
};

export default Loader;
