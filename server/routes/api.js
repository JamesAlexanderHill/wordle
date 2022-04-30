const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const db = require('../database');

const words = [
    'MEGAN',
    'JAMES',
    'MITCH',
    'BATCH',
    'HOUSE',
];

const formatDate = (date) => date.toLocaleDateString('en-AU', {year: 'numeric', month: '2-digit', day: '2-digit'});

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
        '/api/wotd:GET': {type: 'GET', response: 'The current wordlist'},
        '/api/wotd:POST': {type: 'POST', 'request-body': 'A list of 5 letter words', response: 'array with feedback (-1, 0, 1) for each letter'},
        // '/api/feedback:POST': {type: 'POST', 'request-body': 'A single 5 letter word', response: 'Feedback for each letter of the current guess'},
    },
}));

/**
 * Return the current wordlist
 */
router.get("/wotd", (req, res) => res.status(200).json(words));
/**
 * Returns feedback for the daily word
 */
const getFeedback = (guess, target) => {
    return guess.split('').map((letter, index) => {
        if (target[index] === guess[index]) {
        return 1;
        } else if (target.includes(letter)) {
        return 0;
        }
        return -1;
    });
};
router.post("/wotd", (req, res) => {
    const guess = req.body.guess;
    if(!guess) return res.status(400).json({ error: 'Guess not passed in request body' });

    db.get('wordle', (err, storedList) => {
        const today = new Date();

        // dont have a storedList => select wotd, create and store wordlist and return feedback
        // dont have a wotd => select wotd, update wordList and return feedback
        if(!storedList || !storedList[formatDate(today)]) {
            const rand = Math.floor(Math.random() * words.length-1);
            const wordList = storedList || {};
            const wotd = words[rand];
            wordList[formatDate(today)] = wotd;
            db.put('wordle', wordList, (err) => {
                return res.status(200).json(getFeedback(guess, wotd)); 
            });
        } else {
            // have a wotd => return feedback
            const wotd = storedList[formatDate(today)];
            return res.status(200).json(getFeedback(guess, wotd));
        }
    });
});

module.exports = router;