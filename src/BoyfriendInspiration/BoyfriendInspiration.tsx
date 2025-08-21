import styles from "./BoyfriendInspiration.module.css";
import songInspiration from "./songInspiration.json";
import { BackHomeButton } from "../BackHomeButton/BackHomeButton";
import { BoyfriendCard } from "../BoyfriendCard/BoyfriendCard";

console.log(songInspiration);

export const BoyfriendInspiration = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        Do you know who inspired some of Taylor's songs? 🎵
        <br />
        Unsure? Check it out!
      </div>

      {songInspiration.map((song) => (
        <BoyfriendCard boyfriendInspiration={song} />
      ))}
      <BackHomeButton />
    </div>
  );
};

BoyfriendInspiration.displayName = "BoyfriendInspiration";
