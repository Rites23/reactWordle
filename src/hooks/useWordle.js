import { useState } from "react"

const useWordle = (solution)=>{
    const [turn, setTurn] = useState(0) 
    const [currentGuess, setCurrentGuess] = useState('')
    const [guesses, setGuesses] = useState([...Array(6)]) // each guess as an array - hostiry of guesses
    const [history, setHistory] = useState([]) // each guess is a string to check for duplicates
    const [isCorrect, setIsCorrect] = useState(false)
    const [usedKeys, setUsedKeys] = useState({}) //{a:"green" , b:"grey", c:"yellow"}
  
    // format a guess into an array of letter objects 
    // e.g. [{key: 'a', color: 'yellow'}]
    const formatGuess = ()=>{
       let solutionArray =[...solution]
       let formattedGuess  =[...currentGuess].map((letter)=>{
            return {key:letter, color:'grey'}
       })

       //find green letters (correct position)
       formattedGuess.forEach((letter, index)=>{
            if(solutionArray[index] === letter.key){
                formattedGuess[index].color = "green"
                solutionArray[index]=null
            }
       })

       //find yellow leters (in word but wrong position)
       formattedGuess.forEach((letter, index)=>{
        if(solutionArray.includes(letter.key) && letter.color !=="green"){
            formattedGuess[index].color = "yellow"
            solutionArray[solutionArray.indexOf(letter.key)]=null
            }  
        })

        return formattedGuess


    }
    
    //add new guess to guess state --history
    //update isCorrect if guess is correect
    //add one to the turn

    const addNewGuess = (formattedGuess)=>{
        if(currentGuess === solution){
            setIsCorrect(true)
        }

        setGuesses((prevGuesses)=>{
            let newGuesses = [...prevGuesses]
            newGuesses[turn] = formattedGuess
            return newGuesses
        })

        setHistory((prevHistory)=>{
            return [...prevHistory, currentGuess]
        })

        setTurn((prevTurn)=>{
            return prevTurn + 1
        })
        setUsedKeys((prevUsedKeys)=>{
            let newKeys = {...prevUsedKeys}

            formattedGuess.forEach((letter)=>{
                const currentColor = newKeys[letter.key]

                if(letter.color ==="green"){
                    newKeys[letter.key]="green"
                    return 
                }
                if(letter.color ==="yellow" && currentColor!=="green"){
                    newKeys[letter.key]="yellow"
                    return 
                }
                if(letter.color ==="grey" && currentColor !== "green" && currentColor !== "yellow"){
                    newKeys[letter.key]="grey"
                    return 
                }
            })
            return newKeys
        })
        setCurrentGuess("")
    }

    //handle keyup event and track current guess
    //handle guess when user presses enter

    const handleKeyUp = ({key})=>{

        console.log('gaba',key);

        if (key === 'Enter') {
            // only add guess if turn is less than 5
            if (turn > 5) {
              console.log('you used all your guesses!')
              return
            }
            // do not allow duplicate words
            if (history.includes(currentGuess)) {
              console.log('you already tried that word.')
              return
            }
            // check word is 5 chars
            if (currentGuess.length !== 5) {
              console.log('word must be 5 chars.')
              return
            }
            const formatted =formatGuess()
            addNewGuess(formatted)
          }

          if (key === 'Backspace' || key==='Del') {
            setCurrentGuess(prev => prev.slice(0, -1))
            return
          }
          if (/^[A-Za-z]$/.test(key)) {
            if (currentGuess.length < 5) {
              setCurrentGuess(prev => prev + key)
            }
          }
    }


    return {addNewGuess,turn,currentGuess, guesses, isCorrect, handleKeyUp, usedKeys}
}

export default useWordle