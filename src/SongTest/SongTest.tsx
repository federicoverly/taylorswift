import { useCallback, useState } from "react";
import styles from "./SongTest.module.css";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { SongCard } from "../SongCard/SongCard";
import { Song, Taylor } from "../interfaces";
import disappointed from "./TS_disappointed.jpg";
import approval from "./TS_approval.webp";
import { removeBetweenBrackets } from "../utils/removeBetweenBrackets";

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

  const navigate = useNavigate();

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

      <button onClick={findRandomSonyLyric} className={styles.button}>
        Get a verse
      </button>

      {randomQuote && (
        <>
          <SongCard song={"Guess the song!"} verse={randomQuote.verse} />
          <input
            type="text"
            value={song}
            onChange={(e) => setSong(e.target.value)}
            className={styles.input}
            placeholder="Type the song here!"
          />
          <button
            onClick={guessSong}
            className={styles.button}
            disabled={song === ""}
          >
            Guess!
          </button>
          <button onClick={clueProvider} className={styles.button}>
            Give me the next line please
          </button>
          {clue !== "" && <div className={styles.result}>{clue}</div>}
          <button
            onClick={() => setIsAnswerVisible(true)}
            className={styles.button}
          >
            I am not that fan, give me the answer please!
          </button>
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

      <button onClick={() => navigate("/")} className={styles.button}>
        Go back to the main page
      </button>
    </div>
  );
};
