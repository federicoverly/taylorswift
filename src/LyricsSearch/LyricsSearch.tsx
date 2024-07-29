import React, { useCallback, useMemo, useState } from "react";
import { Taylor, Song, songInterface } from "../interfaces";
import styles from "./LyricsSearch.module.css";
import { SongsContainer } from "../SongsContainer/SongsContainer";
import { useQuery } from "@tanstack/react-query";
import { CustomButton } from "../CustomButton/CustomButton";
import { CustomTextInput } from "../CustomTextInput/CustomTextInput";
import { BackHomeButton } from "../BackHomeButton/BackHomeButton";

export const LyricsSearch = () => {
  const [filter, setFilter] = useState<string>("");
  const [keywords, setKeywords] = useState<string>("");

  const query = useQuery({
    queryKey: ["taylor"],
    queryFn: () => {
      return fetch(
        "https://raw.githubusercontent.com/MargauxThw/TS-lyrics/main/AllDataApr1924.json"
      ).then((res) => res.json());
    },
  });

  const saveFilter = useCallback(() => {
    setKeywords(filter);
  }, [filter]);

  const filteredData = useMemo(() => {
    if (!query.data) return [];

    const backendSongs = query.data as Taylor;

    const allSongs: Song[] = Object.values(backendSongs).flat();

    const songsIncluding: {
      title: string | undefined;
      verse: songInterface;
    }[] = [];

    for (const song of allSongs as Song[]) {
      for (const lyrics of Object.values(song)) {
        for (const verse of lyrics) {
          if (verse.this.toLowerCase().includes(keywords.toLowerCase())) {
            const title = Object.keys(song).find((key) =>
              song[key].includes(verse)
            );

            const songObject = {
              title: title,
              verse: verse,
            };
            songsIncluding.push(songObject);
          }
        }
      }
    }

    const uniqueSongs = songsIncluding.filter(
      (song, index, self) =>
        index ===
        self.findIndex(
          (s) => s.title === song.title && s.verse.this === song.verse.this
        )
    );

    return uniqueSongs;
  }, [query.data, keywords]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        Fancy finding a Taylor quote to impress someone? Type a word below to
        find a song lyric that includes it!
      </div>
      <CustomTextInput
        value={filter}
        placeholder={"Type a word..."}
        onChange={(e) => setFilter(e.target.value)}
      />
      <CustomButton title={"Search"} onClick={saveFilter} />
      <SongsContainer songs={keywords !== "" ? filteredData : []} />
      {filteredData.length === 0 && keywords !== "" && (
        <div>No songs found</div>
      )}
      <BackHomeButton />
    </div>
  );
};

LyricsSearch.displayName = "LyricsSearch";
