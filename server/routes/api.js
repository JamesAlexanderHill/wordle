const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const db = require('../database');

/**
 * Middleware
 */
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

/**
 * API test
 */
router.get("/", (req, res) => res.status(200).json({
    version: 'v1.0.0',
    endpoints: {
        '/api/words:GET': {type: 'GET', response: 'The current wordlist'},
        '/api/words:POST': {type: 'POST', 'request-body': 'A list of 5 letter words', response: 'Success or Failure'},
        '/api/feedback:POST': {type: 'POST', 'request-body': 'A single 5 letter word', response: 'Feedback for each letter of the current guess'},
    },
}));

/**
 * Return the current wordlist
 */
 router.get("/words", (req, res) => {
    db.get('words', (err, value) => {
        const wordlist = value || [];
        return res.status(200).json(wordlist);
    });
});

/**
 * Add an array of words to the database
 */
router.post("/words", (req, res) => {
    const words = req.body.words;
    if (!words) return res.status(400).json({ error: 'Wordlist not passed in request body' });

    db.get('words', (err, value) => {
        const wordlist = value || [];
        const newWords = words.filter((word) => !wordlist.includes(word));
        wordlist.push(...newWords);

        db.put('words', wordlist, (err) => {
            if(err) return res.status(400).json({ error: `Words couldnt be added to the database` });

            return res.status(200).json(wordlist);
        });
    });
});

/**
 * Provide feedback for a guess
 */
 router.post("/feedback", (req, res) => {
    const game = req.body.game;
    const isNewGame = game.history.length <= 1;
    const currentGuess = game.history.at(-1).guess;
    if (!game) return res.status(400).json({ error: 'Game is invalid' });

    // check the latest guess is in the wordlist
    db.get('words', (err, value) => {
        const wordlist = value || [];
        if (!wordlist.includes(currentGuess)) return res.status(400).json({ error: `Guess does not exist in current wordlist` });

        
        const feedback = guessFeedback(correctAnswer, currentGuess);
    });

    // db.get('history', (err, value) => {
    //     const history = value || [];
    //     if (g)
    //     const newWords = words.filter((word) => !wordlist.includes(word));
    //     wordlist.push(...newWords);

    //     db.put('words', wordlist, (err) => {
    //         if(err) return res.status(400).json({ error: `Words couldnt be added to the database` });

    //         return res.status(200).json(wordlist);
    //     });
    // });
});

module.exports = router;