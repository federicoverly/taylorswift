import styles from "./App.module.css";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "./CustomButton/CustomButton";

function App() {
  const navigate = useNavigate();

  return (
    <div className={styles.appContainer}>
      <div className={styles.intro}>
        Hi Swifty! Welcome to the Heaven of Taylor Swift fans! 🌈 <br />
        Here you can find all the lyrics of Taylor Swift's songs and test your
        knowledge about her! <br />
        🎤 Are you ...ready for it? 🎶
      </div>
      <CustomButton
        title="Lyrics Searcher"
        onClick={() => navigate("/lyrics-search")}
      />
      <CustomButton
        title="Random Taylor Quote"
        onClick={() => navigate("/random-quote")}
      />
      <CustomButton
        title="Test Your Knowledge"
        onClick={() => navigate("/test")}
      />
      <CustomButton
        title="10 Songs Test!"
        onClick={() => navigate("/songs-test")}
      />
      <CustomButton
        title="Blank space"
        onClick={() => navigate("/blank-space")}
      />
    </div>
  );
}

export default App;
