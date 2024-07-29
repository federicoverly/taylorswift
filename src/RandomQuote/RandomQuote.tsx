import React, { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Song, Taylor } from "../interfaces";
import styles from "./RandomQuote.module.css";
import { SongCard } from "../SongCard/SongCard";
import { BackHomeButton } from "../BackHomeButton/BackHomeButton";
import { CustomButton } from "../CustomButton/CustomButton";

export const RandomQuote = () => {
  const [randomQuote, setRandomQuote] = useState<{
    title: string;
    verse: string;
  }>();
  const query = useQuery({
    queryKey: ["taylor"],
    queryFn: () => {
      return fetch(
        "https://raw.githubusercontent.com/MargauxThw/TS-lyrics/main/AllDataApr1924.json"
      ).then((res) => res.json());
    },
  });

  const findRandomSonyLyric = useCallback(() => {
    if (!query.data) return "";

    const backendSongs = query.data as Taylor;

    const allSongs: Song[] = Object.values(backendSongs).flat();

    const randomSong = allSongs[Math.floor(Math.random() * allSongs.length)];

    const randomTitle =
      Object.keys(randomSong)[
        Math.floor(Math.random() * Object.keys(randomSong).length)
      ];

    const randomVerse = Object.values(randomSong[randomTitle]).map(
      (verse) => verse.this
    )[
      Math.floor(Math.random() * Object.values(randomSong[randomTitle]).length)
    ];

    setRandomQuote({
      title: randomTitle,
      verse: randomVerse,
    });

    return {
      title: randomTitle,
      verse: randomVerse,
    };
  }, [query.data]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        You are not sure? Click on the button below to get a random Taylor lyric
        that will inspire you today!
      </div>
      <CustomButton title="Random Taylor Quote" onClick={findRandomSonyLyric} />

      {randomQuote && (
        <SongCard song={randomQuote.title} verse={randomQuote.verse} />
      )}
      <BackHomeButton />
    </div>
  );
};

RandomQuote.displayName = "RandomQuote";
