import React from "react";
import styles from "./SongsContainer.module.css";
import { SongCard } from "../SongCard/SongCard";
import { songInterface } from "../interfaces";

export interface SongsContainerProps {
  songs: {
    title: string | undefined;
    verse: songInterface;
  }[];
}

export const SongsContainer = ({ songs }: SongsContainerProps) => {
  return (
    <div className={styles.container}>
      {songs.map((song, index) => (
        <SongCard key={index} song={song.title} verse={song.verse.this} />
      ))}
    </div>
  );
};

SongsContainer.displayName = "SongsContainer";
