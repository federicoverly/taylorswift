import React, { useCallback, useMemo, useState } from "react";
import { BackHomeButton } from "../BackHomeButton/BackHomeButton";
import { useQuery } from "@tanstack/react-query";
import { Taylor, Song } from "../interfaces";
import styles from "./BlankSpace.module.css";
import { CustomButton } from "../CustomButton/CustomButton";

export const BlankSpace = () => {
  const [randomQuote, setRandomQuote] = useState<string>();

  const [guess, setGuess] = useState<string>("");
  const query = useQuery({
    queryKey: ["taylor"],
    queryFn: () => {
      return fetch(
        "https://raw.githubusercontent.com/MargauxThw/TS-lyrics/main/AllDataApr1924.json"
      ).then((res) => res.json());
    },
  });

  const findRandomSong = useCallback(() => {
    if (!query.data) return "";

    const backendSongs = query.data as Taylor;

    const allSongs: Song[] = Object.values(backendSongs).flat();

    const randomSong = allSongs[Math.floor(Math.random() * allSongs.length)];

    const randomTitle =
      Object.keys(randomSong)[
        Math.floor(Math.random() * Object.keys(randomSong).length)
      ];

    const randomVerse = Object.values(randomSong[randomTitle]).map(
      (verse) => verse
    )[
      Math.floor(Math.random() * Object.values(randomSong[randomTitle]).length)
    ];

    setGuess("");
    setRandomQuote(`${randomVerse.this}, ${randomVerse?.next}`);
  }, [query.data]);

  const blankSpaceParts = useMemo(() => {
    if (randomQuote === "" || !randomQuote) return;

    const longWords = randomQuote
      .split(" ")
      .filter((word) => word.length > 3)
      .join(" ");

    const randomWordFromQuote =
      longWords.split(" ")[
        Math.floor(Math.random() * randomQuote.split(" ").length)
      ];

    if (!randomWordFromQuote) return;

    const quoteWithoutRandomWord = randomQuote.replace(
      randomWordFromQuote,
      "_ ".repeat(randomWordFromQuote.length)
    );
    return {
      firstPart: quoteWithoutRandomWord.split("_")[0],
      secondPart:
        quoteWithoutRandomWord.split("_")[
          quoteWithoutRandomWord.split("_").length - 1
        ],
      word: randomWordFromQuote.replace(/[^a-zA-Z0-9\s]/g, ""),
    };
  }, [randomQuote]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        But I've got a blank space, baby and you should complete the lyrics!
      </div>
      <CustomButton
        onClick={findRandomSong}
        title={randomQuote !== "" ? "Give me another one" : "Let's go!"}
      />
      {!blankSpaceParts && (
        <div className={styles.verse}>This one is too tough, try again!</div>
      )}
      {randomQuote !== "" && blankSpaceParts && (
        <div className={styles.quote}>
          <div className={styles.verse}>
            {blankSpaceParts.firstPart}
            <input
              value={guess}
              placeholder={blankSpaceParts.word
                .replace(/[a-zA-Z]/g, "_ ")
                .toUpperCase()}
              onChange={(e) => setGuess(e.target.value)}
              className={styles.input}
              maxLength={blankSpaceParts.word.length}
            />
            {blankSpaceParts.secondPart}
            {guess.toLowerCase() === blankSpaceParts.word.toLowerCase() &&
            guess.length > 0 ? (
              <div className={styles.result}>What a Swiftie you are!</div>
            ) : guess.length > 0 ? (
              <div className={styles.result}>Not quite there yet!</div>
            ) : null}
          </div>
        </div>
      )}
      <BackHomeButton />
    </div>
  );
};
