import React from "react";
import styles from "./TestSongCard.module.css";

export interface TestSongCardProps {
  verse: string;
}

export const TestSongCard = ({ verse }: TestSongCardProps) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.verse}>{verse}</div>
    </div>
  );
};

TestSongCard.displayName = "TestSongCard";
