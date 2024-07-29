import React from "react";
import styles from "./SongCard.module.css";

export interface SongCardProps {
  song: string | undefined;
  verse: string;
}

export const SongCard = ({ song, verse }: SongCardProps) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.verse}>{verse}</div>
      <div className={styles.song}>{song}</div>
    </div>
  );
};

SongCard.displayName = "SongCard";
