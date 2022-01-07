# Wordle #
## Gameplay ##
### Word of the day ###
1. Every day a word is selected and stored in the DB
2. Each user (verified by a JWT) is able to play one game
    * User submits a word and the server responds with feedback on each letter; correct letter and position (1), correct letter but incorrect position (0), and incorrect letter (-1). This response is verified via a JWT so that users cant fake data
    * user needs to guess the word of the day in the least amount of guesses
    * if hardmode is enabled, the user must use correct feedback in subsequent guesses
3. record statistics for the Word-of-the-Day (Split between hardmode) in database to be displayed at the end

#### JWT structure ####
```
{
    settings: {
        "letters": 5,
        "startTime": 19847389430 // ms since 1901
        "hard": true, // any hints must be used in subsequent guesses
    },
    history: [
        {guess: "towel", feedback: {0: 1, 1: -1, 2: -1, 3: 0, 4: 1}},
        {guess: "tesla", feedback: {0: 1, 1: 1, 2: -1, 3: 0, 4: -1}},
        {guess: "tepal", feedback: {0: 1, 1: 1, 2: 1, 3: 1, 4: 1}},
    ]
}
```
### Freemode ###
1. user sends a guess to the server
2. server picks a word from the wordlist and adds it to the JWT (encrypted so the user cant cheat) and provides feedback
3. all subsequent guesses will use the encrypted selected word in the JWT
4. record statistics for freemode (Split between hardmode) in database to display at the end
#### JWT structure ####
```
{
    settings: {
        "letters": 5,
        "word": random-encrypted-word // encrypted word for the current game
        "hard": true, // any hints must be used in subsequent guesses
    },
    history: [
        {
            guess: "towel",
            feedback: {0: 1, 1: -1, 2: -1, 3: 0, 4: 1}
        },
        {
            guess: "tesla",
            feedback: {0: 1, 1: 1, 2: -1, 3: 0, 4: -1}
        },
        {
            guess: "tepal",
            feedback: {0: 1, 1: 1, 2: 1, 3: 1, 4: 1}
        },
    ],
}
```
### WOTD, Statistics & History ###
* Statistics will be split between Freemode and Word-of-the-Day as well as the mode the game was played in
* history will just be an array of past words of the day

```
{
    wotd: {
        current: {
            startTime: 123456789876,
            word: "white",
            statistics: {
                easy: [
                    {user: 1234-abcd-uuid, guesses: 6},
                    {user: 5678-efgh-uuid, guesses: 2},
                    {user: 9101-ijkl-uuid, guesses: 12},
                ],
                hard: [
                    {user: 1234-abcd-uuid, guesses: 3},
                    {user: 5678-efgh-uuid, guesses: 4},
                    {user: 9101-ijkl-uuid, guesses: 5},
                ],
            }
        },
        history: [
            {
                startTime: 123456789876,
                word: "tepal",
                statistics: {
                    easy: [
                        {user: 1234-abcd-uuid, guesses: 6},
                        {user: 5678-efgh-uuid, guesses: 2},
                        {user: 9101-ijkl-uuid, guesses: 12},
                    ],
                    hard: [
                        {user: 1234-abcd-uuid, guesses: 3},
                        {user: 5678-efgh-uuid, guesses: 4},
                        {user: 9101-ijkl-uuid, guesses: 5},
                    ],
                }
            },
            {
                startTime: 1231242345346,
                word: "tiger",
                statistics: {
                    easy: [
                        {user: 1234-abcd-uuid, guesses: 6},
                        {user: 1234-abcd-uuid, guesses: 6},
                    ],
                    hard: [
                        {user: 9101-ijkl-uuid, guesses: 5},
                        {user: 1234-abcd-uuid, guesses: 6},
                    ],
                }
            },
        ],
    },
    freemode: {
        "tepal": {
            easy: [
                {user: 1234-abcd-uuid, guesses: 6},
                {user: 1234-abcd-uuid, guesses: 6},
            ],
            hard: [
                {user: 9101-ijkl-uuid, guesses: 5},
                {user: 1234-abcd-uuid, guesses: 6},
            ],
        },
        "white": {
            easy: [
                {user: 1234-abcd-uuid, guesses: 6},
                {user: 1234-abcd-uuid, guesses: 6},
            ],
            hard: [
                {user: 9101-ijkl-uuid, guesses: 5},
                {user: 1234-abcd-uuid, guesses: 6},
            ],
        },
    },
    words: ["tepal", "tiger", "white", "green"],
}
```