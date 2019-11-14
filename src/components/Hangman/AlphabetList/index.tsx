import React, { ReactNode } from 'react'

interface IAlphabetList {
    children?: ReactNode;
    alphaList: string[];
    usedWords: string[];
    guess: Function;
}

const AlphabetList: React.FC<IAlphabetList> = ({ alphaList, usedWords, guess }) => {
    return (
        <div className="c-alphabet">
            {alphaList.map(letter =>
                <button
                    className={usedWords.indexOf(letter) >= 0 ? "c-alphabet__item disable" : "c-alphabet__item"}
                    key={letter}
                    onClick={() => guess(letter)}
                    disabled={usedWords.indexOf(letter) >= 0}
                >
                    {letter}
                </button>)
            }
        </div>
    );
}

export default AlphabetList;