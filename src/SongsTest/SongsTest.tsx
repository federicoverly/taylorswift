import { useCallback, useState } from "react";
import styles from "./SongsTest.module.css";
import { useQuery } from "@tanstack/react-query";
import { Song, Taylor } from "../interfaces";
import { removeBetweenBrackets } from "../utils/removeBetweenBrackets";
import { TestSongCard } from "../TestSongCard/TestSongCard";
import happy from "./happy.jpg";
import sad from "./sad.jpg";
import { BackHomeButton } from "../BackHomeButton/BackHomeButton";
import { CustomButton } from "../CustomButton/CustomButton";
import { CustomTextInput } from "../CustomTextInput/CustomTextInput";

export const SongsTest = () => {
  const [song, setSong] = useState<string>("");
  const [randomQuote, setRandomQuote] = useState<{
    title: string;
    verse: string;
  }>();
  const [clue, setClue] = useState<string>("");
  const [verseNumber, setVerseNumber] = useState<number>(1);
  const [totalPoints, setTotalPoints] = useState<number>(0);

  const query = useQuery({
    queryKey: ["taylor"],
    queryFn: () => {
      return fetch(
        "https://raw.githubusercontent.com/MargauxThw/TS-lyrics/main/AllDataApr1924.json"
      ).then((res) => res.json());
    },
  });

  const startTest = useCallback(() => {
    if (!query.data) return "";

    setVerseNumber(1);
    setTotalPoints(0);
    setSong("");
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

  const findRandomSonyLyric = useCallback(() => {
    if (!query.data) return "";

    setSong("");
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
    const isCorrect = isCorrectAnswer();

    setVerseNumber(verseNumber + 1);
    setTotalPoints(isCorrect ? totalPoints + 1 : totalPoints);
    setClue("");
    setSong("");
    findRandomSonyLyric();
  }, [findRandomSonyLyric, isCorrectAnswer, totalPoints, verseNumber]);

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
    <div className={styles.container}>
      <div className={styles.title}>
        Step up your game. 10 songs test! How far can you go?
      </div>
      {verseNumber !== 11 && (
        <div className={styles.gameContainer}>
          <CustomButton
            title={
              verseNumber === 1 && !randomQuote
                ? "Start!"
                : "I am not doing great, restart!"
            }
            onClick={startTest}
          />
          {randomQuote && (
            <>
              <TestSongCard verse={randomQuote.verse} />
              <CustomTextInput
                value={song}
                onChange={(e) => setSong(e.target.value)}
                placeholder="Type the song here!"
                disabled={verseNumber === 11}
              />
              <CustomButton
                onClick={guessSong}
                title={"Guess"}
                disabled={song === "" || verseNumber === 11}
              />
              <CustomButton
                onClick={clueProvider}
                title={"Give me the next line please"}
                disabled={verseNumber === 11}
              />
              {clue !== "" && <div className={styles.clue}>{clue}</div>}
              <div className={styles.followUp}>
                Verse N°: {verseNumber} - Accumulated Points: {totalPoints}
              </div>
            </>
          )}
        </div>
      )}

      {verseNumber === 11 && (
        <div className={styles.resultsContainer}>
          <div className={styles.finalPoints}>
            Your total score is: {totalPoints} out of 10!
          </div>
          {totalPoints === 10 ? (
            <div className={styles.finalResult}>
              <div>Well done! You are a true Swiftie!</div>
              <img src={happy} alt="happy" className={styles.image} />
            </div>
          ) : (
            <div className={styles.finalResult}>
              <div>Not bad! Keep going! Just slightly disappointed</div>
              <img src={sad} alt="sad" className={styles.image} />
            </div>
          )}
          <CustomButton title={"Restart!"} onClick={startTest} />
        </div>
      )}
      <BackHomeButton />
    </div>
  );
};

SongsTest.displayName = "SongsTest";
