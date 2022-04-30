import { useState } from 'react';
import { fromEvent } from 'rxjs';
import { share } from 'rxjs/operators';

import Row from '../components/row';

const Wordle = ({ letterCount, maxGuesses }) => {
  const keydownEvent$ = fromEvent(document, 'keydown').pipe(share());
  const [game, setGame] = useState(
    [...Array(maxGuesses)].map((e) => Array(letterCount).fill(''))
  );
  const [currentRound, setCurrentRound] = useState(0);

  return (
    <div>
      {Array.from({ length: maxGuesses }).map((_, index) => {
        return (
          <Row
            key={`row-${index}`}
            isActive={index === currentRound}
            round={game[index]}
            keydownEvent$={keydownEvent$}
            setRound={(round) => {
              const updatedGame = [...game];
              updatedGame[index] = round;
              setGame(updatedGame);
            }}
            incrementRound={() => setCurrentRound(currentRound + 1)}
          />
        );
      })}
    </div>
  );
};

export default Wordle;
