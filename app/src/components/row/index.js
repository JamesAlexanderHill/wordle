import styled from 'styled-components';
import { skipWhile, filter, map, tap } from 'rxjs/operators';

import Tile from '../tile';

import { validLetterKeys, validActionKeys } from '../../util/constants.js';
import { useEffect, useState } from 'react';

const RowContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Row = ({ isActive, round, setRound, keydownEvent$, incrementRound }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState(Array(round.length).fill(null));

  useEffect(() => {
    const letters$ = keydownEvent$.pipe(
      // tap((e) => console.log('test', { round, length: round.length })),
      skipWhile(() => currentIndex >= round.length),
      filter((e) => isActive && validLetterKeys.includes(e.code)),
      map(({ key }) => key.toUpperCase())
    );

    const actions$ = keydownEvent$.pipe(
      filter((e) => isActive && validActionKeys.includes(e.code)),
      map(({ key }) => key.toUpperCase())
    );
    const enter$ = actions$.pipe(
      filter((action) => action === 'ENTER'),
      skipWhile(() => currentIndex < round.length)
    );
    const delete$ = actions$.pipe(
      filter((action) => action === 'BACKSPACE'),
      skipWhile(() => round[0] === '')
    );

    const handleDelete = () => {
      console.log('delete');
      const updatedRound = [...round];
      updatedRound[currentIndex - 1] = '';
      setCurrentIndex(currentIndex - 1);
      setRound(updatedRound);
    };
    const handleEnter = () => {
      console.log('enter');
      setFeedback(getFeedback(round));
      incrementRound();
    };
    const handleLetter = (letter) => {
      console.log('letter', letter);
      const updatedRound = [...round];
      updatedRound[currentIndex] = letter;
      setCurrentIndex(currentIndex + 1);
      setRound(updatedRound);
    };

    const deleteSubscription = delete$.subscribe(() => handleDelete());
    const enterSubscription = enter$.subscribe(() => handleEnter());
    const letterSubscription = letters$.subscribe((key) => handleLetter(key));

    const getFeedback = (guess) => {
      const target = 'MEGAN'.split('');
      // const feedback = Array(guess.length).fill(null);
      return guess.map((letter, index) => {
        if (target[index] === guess[index]) {
          return 1;
        } else if (target.includes(letter)) {
          return 0;
        }
        return -1;
      });
    };

    return function cleanUp() {
      letterSubscription.unsubscribe();
      deleteSubscription.unsubscribe();
      enterSubscription.unsubscribe();
    };
  }, [keydownEvent$, isActive, currentIndex, round, setRound, incrementRound]);

  return (
    <RowContainer>
      {Array.from({ length: round.length }).map((_, index) => {
        return (
          <Tile
            key={`tile-${index}`}
            isActive={isActive}
            letter={round[index]}
            feedback={feedback[index]}
          />
        );
      })}
    </RowContainer>
  );
};

export default Row;
