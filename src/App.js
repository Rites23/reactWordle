import { useEffect,useState } from "react";
import wordBank from "./data/db.json"
import Wordle from "./components/Wordle"

function App() {

  const [solution, setSolution] = useState(null)
  const date= new Date();
  let year = date.getFullYear();

  useEffect(()=>{
      const randomSolution = wordBank.solutions[Math.floor(Math.random()* wordBank.solutions.length-1)]
      setSolution(randomSolution.word)
    },[]);


  return (
    <div className="App">
      <h1>Word Guess (Wordle)</h1>
      {solution && <Wordle solution={solution}/>}
      <footer>
        <span>Ritesh Balu {year}</span>
      </footer>
    </div>
  );
}

export default App

