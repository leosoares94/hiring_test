import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./GameResults.module.css";
import { useNavigate } from "react-router-dom";

const GameResults = () => {
  const [results, setResults] = useState([]);

  const navigate = useNavigate();

  async function handleFetchGameResults() {
    const token = localStorage.getItem("token");

    const response = await axios
      .get("http://localhost:5000/api/memory/results", {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      .then((res) => res.data);

    setResults(response);
  }

  useEffect(() => {
    handleFetchGameResults();
  }, []);
  return (
    <div className={styles.wrapper}>
      <div className={styles.stack}>
        <div className={styles.container}>
          <h2>Your Results</h2>
          <div className={styles.stack}>
            {results.map((result) => (
              <div key={result.id} className={styles.stack}>
                <div className={styles.stack} style={{ paddingBottom: 5 }}>
                  <div>
       
                    {`${new Date(result.gameDate).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}`}
                  </div>

                  <div> {`Difficulty: ${result.difficulty}`}</div>
                  <div> {`Completed: ${result.completed}`}</div>
                  <div> {`Failed: ${result.failed}`}</div>
                  <div> {`Time taken: ${result.timeTaken}`}</div>
                </div>
                <br />
              </div>
            ))}
          </div>
        </div>
        <button className={styles.button} onClick={() => navigate("/play")}>Back</button>
      </div>
    </div>
  );
};

export default GameResults;
