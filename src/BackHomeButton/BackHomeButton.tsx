import React from "react";
import styles from "./BackHomeButton.module.css";
import { useNavigate } from "react-router-dom";

export const BackHomeButton = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate("/")} className={styles.button}>
      Back to home
    </button>
  );
};

BackHomeButton.displayName = "BackHomeButton";
