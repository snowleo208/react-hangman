import React, { ReactNode } from 'react'
import './AlphabetList.scss';

interface IAlphabetList {
    children?: ReactNode;
    alphaList: string[];
    usedWords: string[];
    guess: Function;
    isEndGame: boolean;
}

const AlphabetList: React.FC<IAlphabetList> = ({ alphaList, usedWords, guess, isEndGame }) => {
    return (
        <div className="c-alphabet">
            {alphaList.map(letter =>
                <button
                    className="c-alphabet__item"
                    key={letter}
                    onClick={() => guess(letter)}
                    disabled={usedWords.indexOf(letter) >= 0 || isEndGame}
                >
                    {letter}
                </button>)
            }
        </div>
    );
}

export default AlphabetList;