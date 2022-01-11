import {createContext, useState} from 'react';
import jwt_decode from "jwt-decode";

import { keys, endpoints } from '../util/constants';

const WOTDContext = createContext({});

export const WOTDProvider = ({children}) => {
    const [startTime, setStartTime] = useState(null);
    const [isHardmode, setIsHardmode] = useState(false);
    /**
     * An array of feedback from the server
     * 
     * Server response looks like: {guess: "towel", feedback:[1,-1,-1,0,1]},
     */
    const [history, setHistory] = useState([]);
    /**
     * An key-value pair for all keys on the keyboard.
     * -1: Incorrect
     *  0: Correct letter, incorrect position
     *  1: Correct letter, correct position
     */
    const [feedback, setFeedback] = useState(keys.filter((str) => str.length === 1).reduce((prev, curr) => ({...prev, [curr]:null}),{}));

    const guess = (word, JWT) => {
        const isFirstGuess = !history.length;
        if(isFirstGuess){
            setStartTime(Date.now());
        }


        const payload = isFirstGuess ? {guess: word, isHardmode, startTime} : {guess: word, JWT};
        const response = fetch(endpoints.feedback, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        })
            .then(response => response.json())
            .then(data => {
                // add feedback to history
                setHistory([...history, data.feedback]);
                // add feedback to wotd feedback
                setFeedback(Object.assign(feedback, data.feedback));
            })

        return response.json();
    };

    /**
     * Load a game from local storage
     * @param {JWT} WOTDtoken A JWT token stored in local storage
     */
    const loadGame = (WOTDtoken) => {
        const game = jwt_decode(WOTDtoken);
        setStartTime(game.startTime);
        setIsHardmode(game.isHardmode);
        setHistory(game.history);
        generateFeedback(game.history);
    };
    /**
     * Utility func tp help load a game from a JWT
     * @param {[{guess: string, feedback: array[int]}]} history  History of the current match
     */
    const generateFeedback = (history) => {
        const initialFeedback = keys.filter((str) => str?.length === 1).reduce((prev, curr) => ({...prev, [curr]:null}),{});
        const newFeedback = history.map(round => [...round.guess].reduce((prev, curr, i) => ({...prev, [curr]:round.feedback[i]}),{}));
        setFeedback(Object.assign(initialFeedback, ...newFeedback));
    }
    const restartGame = () => {
        setStartTime(null);
        setHistory([]);
        setFeedback(keys.filter((str) => str.length === 1).reduce((prev, curr) => ({...prev, [curr]:''}),{}));
        // delete WOTD JWT from local storage
    };

    return (
        <WOTDContext.Provider value={{
            startTime,
            isHardmode,
            history,
            feedback,
            guess,
            setIsHardmode,
            loadGame,
            restartGame,
        }}>
            {children}
        </WOTDContext.Provider>
    );
}

export default WOTDContext;