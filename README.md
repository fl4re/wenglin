Javascript implementation of Weng-Lin Rating, using Bradley Terry model as described at [https://jmlr.csail.mit.edu/papers/volume12/weng11a/weng11a.pdf](https://jmlr.csail.mit.edu/papers/volume12/weng11a/weng11a.pdf)


## Installation

Add `wenglin` to your list of dependencies in `package.json`:

```bash
npm install --save wenglin
```

## Usage

Use CommonJS's `require`

```js
const {  
  Rater,  
  Team,  
  Player  
} = require('wenglin');
```

Default values for mu and sigma are 25. and 25 / 3.

Rater is the main rating processor. It is initialized with BETA parameter by default so it can me omitted.
Team and Players are used to initialize input data.
Players are initialized with **mu** and **sigma** square, by default **25** and **69.44**

```js
// Define two teams of two players each with default mu and sigma values. Also set team score.
const team_1 = new Team({players: [new Player(), new Player()], score: 60});
const team_2 = new Team({players: [new Player(), new Player()], score: 80});

const players = Rater()(team_1, team_2);
```

## Results

Players are considered immutable son new array of players is returned as a result.
```js
players = [
    [  
      {mu: 23.035814496704035, sigma: 8.17755635771097, sigma_sq: 66.8724279835391},  
      {mu: 23.035814496704035, sigma: 8.17755635771097, sigma_sq: 66.8724279835391}  
    ],  
    [  
      {mu: 26.964185503295965, sigma: 8.17755635771097, sigma_sq: 66.8724279835391},  
      {mu: 26.964185503295965, sigma: 8.17755635771097, sigma_sq: 66.8724279835391}  
    ]
]
```

Player can also be initialized with custom mu and sigma values
```js
const player = new Player({mu: 40, sigma: 73.25});
...
```
