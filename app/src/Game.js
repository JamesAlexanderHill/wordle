import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fromEvent } from 'rxjs';
import { filter, tap, map, throttleTime } from 'rxjs/operators'

const validKeyCodes = ['Backspace','Enter','KeyQ','KeyW','KeyE','KeyR','KeyT','KeyY','KeyU','KeyI','KeyO','KeyP','KeyA','KeyS','KeyD','KeyF','KeyG','KeyH','KeyJ','KeyK','KeyL','KeyZ','KeyX','KeyC','KeyV','KeyB','KeyN','KeyM'];

// const LetterCard = styled.div`
//     padding: 10px;
// `;

// const StyledInput = styled.input`
//     display: block;
// `;

// const GuessInput = ({isDisabled, value, handleGuess, index}) => {
//     return (
//         <form onSubmit={(e) => {
//             e.preventDefault();
//             handleGuess(e.target.value, index)
//         }}>
//             <StyledInput name="guess" disabled={isDisabled} value={value} />
//         </form>
//     );
// }

const Round = () => {
    const [guess, setGuess] = useState('');

    // const keypress$ = Observable.fromEvent(document, 'keyup')
    //     // .throttle(150)
    //     .pipe(
    //         tap((e) => console.log('keyup', e))
    //     )

    const keyup$ = fromEvent(document, 'keyup').pipe(
        tap((e) => console.log('keyup', e)),
        filter(e => validKeyCodes.includes(e.code)),
        map(e => e.key.toUpperCase()),
    );
    keyup$.subscribe();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('guess', guess);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input value={guess} onChange={(e) => setGuess(e.target.value)}/>
        </form>
    )
}

const Game = ({letterCount, attempts}) => {
    // const [guessList, setGuessList] = useState(Array(attempts).fill(''))

    // const handleGuess = (guess, index) => {
    //     console.log('handleGuess', {guess, index})
    // };

    // useEffect(function componentDidMount() {
    //     console.log(guessList)
    // }, [guessList]);

    return (
        <main>
            <Round />
        </main>
    );
}

export default Game;