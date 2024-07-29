import React from "react";
import styles from "./CustomTextInput.module.css";

interface CustomTextInputProps {
  value: string;
  disabled?: boolean;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CustomTextInput = ({
  value,
  disabled = false,
  placeholder,
  onChange,
}: CustomTextInputProps) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      className={styles.input}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
};

CustomTextInput.displayName = "CustomTextInput";
