import React, { useState, useEffect } from 'react'
import AlphabetList from './Hangman/AlphabetList'

const HangmanInterface: React.FC = () => {
    const [count, setCount] = useState(0);
    const [word, setWord] = useState('winter');
    const [guessStatus, setGuessStatus] = useState('______');
    const [usedWords, setUsedWords] = useState<string[]>([]);
    const [isEndGame, setIsEndGame] = useState(false);

    const alphabet: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');


    // check if alphabet is used
    const isAlphabetCorrect = (letter: string) => word.indexOf(letter) >= 0;

    const maskedGuess = (letter: string, arr: string[]) => {
        if (!letter) {
            throw new Error('letter is not exist!');
        }

        let masked = word;
        // masked alphabet that haven't guessed
        const guessedStatus = masked.split('').
            map((letter: string) => arr.indexOf(letter) < 0 ? '_' : letter);

        console.log('result: ' + masked, guessedStatus);
        setGuessStatus(guessedStatus.join(''));
    };

    // check if alphabet is used
    const isAlphabetUsedBefore = (word: string) => usedWords.indexOf(word) >= 0;

    const maskUsedWords = (word: string) => {
        if (!isAlphabetUsedBefore(word)) {
            // only activate when not in current array, add new alphabet to array
            setUsedWords(usedWords => [...usedWords, word]);

            // check if alphebet contains in secret word in func
            // masked the word again if yes in above
            maskedGuess(word, [...usedWords, word]);
        }
    }

    const guess = (word: string) => {
        // only can guess if count is less than eight
        if (count >= 8) {
            return;
        }

        // check if word used before, if yes, doesn't count
        if (isAlphabetUsedBefore(word)) {
            return;
        }

        // if not used before, add into usedWords
        maskUsedWords(word);

        if (!isAlphabetCorrect(word)) {
            // add one count per guess if failed
            setCount(count => count + 1);
        }
    }

    const checkEndGame = () => {
        // end the game if meets certain condition
        if (count >= 8 || guessStatus.indexOf('_') < 0) {
            setIsEndGame(true);
        }
    }

    useEffect(() => {
        checkEndGame();
        return () => { };
    }, [guessStatus, count])

    return (
        <>
            <h1>Hangman</h1>
            <p>{guessStatus}</p>
            {isEndGame && guessStatus.indexOf('_') < 0 ? <p>You Win!!</p> : ''}
            {isEndGame && guessStatus.indexOf('_') >= 0 && count >= 8 ? <p>You Lose!</p> : ''}
            <p>Count: {count}</p>
            <AlphabetList alphaList={alphabet} guess={guess} usedWords={usedWords} />
            {usedWords.length > 0 ? <p>Used words: {usedWords.map(item => item)}</p> : ''}
            {/* <footer>
                <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            </footer> */}
        </>
    );
}

export default HangmanInterface;