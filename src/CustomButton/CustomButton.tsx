import React from "react";
import styles from "./CustomButton.module.css";

interface CustomButtonProps {
  title: string;
  onClick: () => void;
  disabled?: boolean;
}

export const CustomButton = ({
  title,
  disabled = false,
  onClick,
}: CustomButtonProps) => {
  return (
    <button className={styles.button} onClick={onClick} disabled={disabled}>
      {title}
    </button>
  );
};

CustomButton.displayName = "CustomButton";
