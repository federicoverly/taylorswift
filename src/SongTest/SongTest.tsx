import { useCallback, useState } from "react";
import styles from "./SongTest.module.css";
import { useQuery } from "@tanstack/react-query";
import { Song, Taylor } from "../interfaces";
import disappointed from "./TS_disappointed.jpg";
import approval from "./TS_approval.webp";
import { removeBetweenBrackets } from "../utils/removeBetweenBrackets";
import { BackHomeButton } from "../BackHomeButton/BackHomeButton";
import { CustomButton } from "../CustomButton/CustomButton";
import { TestSongCard } from "../TestSongCard/TestSongCard";
import { CustomTextInput } from "../CustomTextInput/CustomTextInput";

export const SongTest = () => {
  const [song, setSong] = useState<string>("");
  const [randomQuote, setRandomQuote] = useState<{
    title: string;
    verse: string;
  }>();
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>(undefined);
  const [isAnswerVisible, setIsAnswerVisible] = useState<boolean>(false);
  const [clue, setClue] = useState<string>("");

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

    setSong("");
    setIsCorrect(undefined);
    setIsAnswerVisible(false);
    setClue("");

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

  const isCorrectAnswer = useCallback(() => {
    if (!randomQuote) return false;

    const cleanedTitle = removeBetweenBrackets(randomQuote.title)
      .toLowerCase()
      .trim();
    const cleanedSong = removeBetweenBrackets(song).toLowerCase().trim();

    return cleanedTitle === cleanedSong;
  }, [randomQuote, song]);

  const guessSong = useCallback(() => {
    setIsAnswerVisible(false);
    setIsCorrect(isCorrectAnswer());
  }, [isCorrectAnswer]);

  const clueProvider = useCallback(() => {
    if (!randomQuote) return "";

    const backendSongs = query.data as Taylor;

    const allSongs: Song[] = Object.values(backendSongs).flat();

    const selectedSong = allSongs.find((song) =>
      Object.keys(song).includes(randomQuote.title)
    );

    const selectedVerse = selectedSong
      ? Object.values(selectedSong[randomQuote.title]).find((verse) =>
          verse.this.toLowerCase().includes(randomQuote.verse.toLowerCase())
        )
      : undefined;

    if (selectedVerse) {
      setClue(selectedVerse.next);
    }

    return {
      title: randomQuote.title,
      verse: selectedVerse ? selectedVerse.next : "",
    };
  }, [query.data, randomQuote]);

  return (
    <div className={styles.appContainer}>
      <div className={styles.title}>
        Do you think you know a lot about Taylor Swift? Test your knowledge. I
        will give you a random quote and you gotta give me the song.
      </div>
      <CustomButton title={"Get a verse"} onClick={findRandomSonyLyric} />

      {randomQuote && (
        <>
          <TestSongCard verse={randomQuote.verse} />
          <CustomTextInput
            value={song}
            onChange={(e) => setSong(e.target.value)}
            placeholder="Type the song here!"
          />
          <CustomButton
            onClick={guessSong}
            title={"Guess"}
            disabled={song === ""}
          />
          <CustomButton
            title={"Give me the next line please"}
            onClick={clueProvider}
            disabled={clue !== ""}
          />
          {clue !== "" && <div className={styles.result}>{clue}</div>}
          <CustomButton
            title={"I am not that fan, give me the answer please!"}
            onClick={() => setIsAnswerVisible(true)}
          />
          {isAnswerVisible && (
            <div className={styles.result}>{randomQuote.title}</div>
          )}
        </>
      )}
      {isCorrect === true ? (
        <div className={styles.resultContainer}>
          <div className={styles.result}>
            Dreaming dreams with happy endings!
          </div>
          <img src={approval} alt="Happy Taylor" />
        </div>
      ) : isCorrect === false ? (
        <div className={styles.resultContainer}>
          <div className={styles.result}>Disappointments, close your eyes</div>
          <img src={disappointed} alt="Sad Taylor" />
        </div>
      ) : null}

      <BackHomeButton />
    </div>
  );
};
