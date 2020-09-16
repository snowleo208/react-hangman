import React, { useState, useEffect } from 'react'
import HangmanGUI from './Hangman/HangmanGUI';
import wordlist from './wordlist';

const Hangman: React.FC = () => {
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
        const guessedStatus = masked.split('').map((letter: string) => arr.indexOf(letter) < 0 ? '_' : letter);

        // console.log('result: ' + masked, guessedStatus);
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

    const initWord = () => {
        // get word from word list using random index number
        let randomIndex: number = Math.floor(Math.random() * wordlist.length);
        let newWord = '';

        try {
            // try to get random word from word list
            newWord = wordlist[randomIndex];
        } catch (e) {
            // if failed, set a new one
            console.log(e);
            randomIndex = Math.floor(Math.random() * wordlist.length);
            newWord = wordlist[randomIndex];
        }

        // set new masked word
        const maskedWord = newWord.split('').map(() => '_').join('');

        setWord(newWord.toLowerCase());
        setGuessStatus(maskedWord);
    }

    const initGame = () => {
        setCount(0)
        setUsedWords([]);
        initWord();
        setIsEndGame(false);
    }

    const checkEndGame = () => {
        // end the game if meets certain condition
        if (count >= 7 || guessStatus.indexOf('_') < 0) {
            setIsEndGame(true);
        }
    }

    // check game status when guessStatus and count updated
    useEffect(checkEndGame, [guessStatus, count])

    // init game when component mounted for the first time
    useEffect(initGame, [])

    return (
        <>
            <h1>Hangman</h1>
            <HangmanGUI
                word={word}
                guessStatus={guessStatus}
                usedWords={usedWords}
                count={count}
                guess={guess}
                alphabet={alphabet}
                isEndGame={isEndGame}
                initGame={initGame}
            />
        </>
    );
}

export default Hangman;