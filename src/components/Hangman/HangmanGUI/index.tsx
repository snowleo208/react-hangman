import React, { ReactNode } from 'react';
import AlphabetList from '../AlphabetList';
import './HangmanGUI.scss';

interface IHangmanGUI {
    guess: Function;
    initGame: Function;
    guessStatus: string;
    isEndGame: boolean;
    count: number;
    alphabet: string[];
    usedWords: string[];
    children?: ReactNode;
}

const HangmanGUI: React.FC<IHangmanGUI> = ({ guess, guessStatus, isEndGame, count, usedWords, alphabet, initGame }) => (
    <>
        <div className="c-hangman__guess">
            {guessStatus.split('').map((letter: string, idx: number) =>
                <p key={`guess-${letter}-${idx}`}>{letter}</p>)}
        </div>
        {isEndGame && guessStatus.indexOf('_') < 0 ? <p>You Win!!</p> : ''}
        {isEndGame && guessStatus.indexOf('_') >= 0 && count >= 8 ? (
            <div className="c-hangman__lose">
                <p className="c-hangman__lose--text">You Lose!</p>
                <button className="c-hangman__lose--btn" onClick={() => initGame()}>Try again?</button>
            </div>
        )
            : ''}
        <p><span className="c-hangman__title">{count > 1 ?
            'Wrong Guesses' : 'Wrong Guess'}</span>: {count}</p>
        <AlphabetList alphaList={alphabet} guess={guess} usedWords={usedWords} />
        {usedWords.length > 0 ? <p>Used words: {usedWords.map(item => item)}</p> : ''}
        {/* <footer>
        <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </footer> */}
    </>
)

export default HangmanGUI;