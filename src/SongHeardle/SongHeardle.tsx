import { useCallback, useMemo, useState } from "react";
import styles from "./SongHeardle.module.css";
import { removeBetweenBrackets } from "../utils/removeBetweenBrackets";
import { BackHomeButton } from "../BackHomeButton/BackHomeButton";
import { CustomButton } from "../CustomButton/CustomButton";
import { CustomTextInput } from "../CustomTextInput/CustomTextInput";
import { songsQueries } from "../songsQueries";
import disappointed from "../SongTest/TS_disappointed.jpg";
import approval from "../SongTest/TS_approval.webp";

export const SongHeardle = () => {
  const [song, setSong] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>(undefined);

  const randomSong = useMemo(() => {
    return songsQueries[Math.floor(Math.random() * songsQueries.length)];
  }, []);

  const songAudio = useMemo(() => {
    return new Audio(randomSong.url);
  }, [randomSong]);

  const [songPart, setSongPart] = useState([0, 3]);

  const playPart = useCallback(
    ({ currentTime = songPart[0] }: { currentTime?: number }) => {
      songAudio.currentTime = currentTime;
      songAudio.play();
      setTimeout(() => {
        songAudio.pause();
      }, 3000);
    },
    [songAudio, songPart]
  );

  const nextPart = useCallback(() => {
    setSongPart([songPart[0] + 3, songPart[1] + 3]);
    playPart({ currentTime: songPart[0] + 3 });
  }, [playPart, songPart]);

  const isCorrectAnswer = useCallback(() => {
    if (!randomSong) return false;

    const cleanedTitle = removeBetweenBrackets(randomSong.name)
      .toLowerCase()
      .trim();
    const cleanedSong = removeBetweenBrackets(song).toLowerCase().trim();

    return cleanedTitle === cleanedSong;
  }, [randomSong, song]);

  const guessSong = useCallback(() => {
    setIsCorrect(isCorrectAnswer());
    setSong("");
  }, [isCorrectAnswer]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        Do you know Taylor's songs as well as you think you do? 🎵
        <br />
        Listen to a part of a song and try to guess which one it is! 🎤
        <br />I will give you 3 seconds. If you need more time, you can get
        extra 3 seconds by clicking on "Next part"! 🕒 <br />
        You can get as many seconds as you want, but remember that the more you
        listen, the less of a fan you might be! 🎶 <br />
        Good luck! 🍀
      </div>
      <CustomButton
        title="Play!"
        onClick={() => playPart({ currentTime: songPart[0] })}
      />
      <CustomButton title="Next part" onClick={nextPart} />
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

SongHeardle.displayName = "SongHeardle";
