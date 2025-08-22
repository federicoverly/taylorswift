import styles from "./BoyfriendInspiration.module.css";
import songInspiration from "./songInspiration.json";
import { BackHomeButton } from "../BackHomeButton/BackHomeButton";
import { BoyfriendCard } from "../BoyfriendCard/BoyfriendCard";
import { useCallback, useMemo, useState } from "react";
import {
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";

export const BoyfriendInspiration = () => {
  const [boyfriend, setBoyfriend] = useState<string>("");

  const boyfriendNames = useMemo(() => {
    return Array.from(new Set(songInspiration.map((song) => song.boyfriend)));
  }, []);

  const handleBoyfriendChange = useCallback((event: SelectChangeEvent) => {
    console.log(event);
    setBoyfriend(event.target.value as string);
  }, []);

  const filteredSongs = useMemo(() => {
    if (boyfriend === "" || !boyfriend) return songInspiration;
    return songInspiration.filter((song) => song.boyfriend === boyfriend);
  }, [boyfriend]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        Do you know who inspired some of Taylor's songs? 🎵
        <br />
        Unsure? Check it out!
      </div>

      <div className={styles.filterTitle}>Filter by boyfriend!</div>
      <FormControl>
        <InputLabel id="boyfriend-select-label">Boyfriend</InputLabel>

        <Select
          id="boyfriend-select-label"
          className={styles.select}
          value={boyfriend}
          onChange={handleBoyfriendChange}
          placeholder="Select a boyfriend"
          label="Boyfriend"
        >
          {boyfriendNames.map((name, index) => (
            <MenuItem key={index} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {filteredSongs.map((song) => (
        <BoyfriendCard boyfriendInspiration={song} />
      ))}
      <BackHomeButton />
    </div>
  );
};

BoyfriendInspiration.displayName = "BoyfriendInspiration";
