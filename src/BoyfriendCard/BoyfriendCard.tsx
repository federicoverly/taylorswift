import styles from "./BoyfriendCard.module.css";
import { BoyfriendInspiration } from "../interfaces";

export interface BoyfriendCardProps {
  boyfriendInspiration: BoyfriendInspiration;
}

export const BoyfriendCard = ({ boyfriendInspiration }: BoyfriendCardProps) => {
  return (
    <div className={styles.cardContainer}>
      <img
        src={boyfriendInspiration.boyfriendPicture}
        alt={boyfriendInspiration.boyfriend}
        className={styles.boyfriendImage}
      />
      <div className={styles.detailsContainer}>
        <div className={styles.boyfriend}>{boyfriendInspiration.boyfriend}</div>
        <div className={styles.song}>{boyfriendInspiration.song}</div>
        <div className={styles.keyLyrics}>{boyfriendInspiration.keyLyrics}</div>
      </div>
    </div>
  );
};

BoyfriendCard.displayName = "BoyfriendCard";
