import React, { ReactNode } from 'react';
import AlphabetList from '../AlphabetList';
import './HangmanGUI.scss';
import Image from '../Image';

interface IHangmanGUI {
    guess: Function;
    initGame: Function;
    word: string;
    guessStatus: string;
    isEndGame: boolean;
    count: number;
    alphabet: string[];
    usedWords: string[];
    children?: ReactNode;
}

const HangmanGUI: React.FC<IHangmanGUI> = ({ word, guess, guessStatus, isEndGame, count, usedWords, alphabet, initGame }) => (
    <>
        <div className="c-hangman__guess">
            {(guessStatus).split('').map((letter: string, idx: number) =>
                <p key={`guess-${letter}-${idx}`}>{letter}</p>)}
        </div>
        {usedWords.length > 0 ? <p>Used words: {usedWords.map(item => item)}</p> : ''}
        {isEndGame && guessStatus.indexOf('_') < 0 ? <p className="c-hangman__win">You win!!</p> : ''}
        {isEndGame && guessStatus.indexOf('_') >= 0 && count >= 7 ? (
            <div className="c-hangman__lose">
                <p className="c-hangman__lose--text">You lose! Correct word is: <span>{word}</span>.</p>
                <button className="c-hangman__lose--btn" onClick={() => initGame()}>Try again?</button>
            </div>
        ) : ''}
        <AlphabetList
            alphaList={alphabet}
            guess={guess}
            usedWords={usedWords}
            isEndGame={isEndGame}
        />
        <p><span className="c-hangman__title">{count > 1 ?
            'Wrong Guesses' : 'Wrong Guess'}</span>: {count}</p>
        <Image count={count} />
        <footer className="c-footer">
            <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> | Built by Yuki <a href="https://github.com/snowleo208" target="_blank" rel="noopener noreferrer">@snowleo208</a></div>
        </footer>
    </>
)

export default HangmanGUI;