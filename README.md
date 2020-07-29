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

Rater is the main rating processor. It is initialized with BETA parameter by default so it can me omitted.
Team and Players are used to initialize input data.
Players are initialized with mu and sigma square, by default 25 and 69.44

```js
// Define two teams of two players each with default mu and sigma values
const teams = [  
  new Team([new Player(25, 64.44), new Player(25, 64.44)]),  
  new Team([new Player(25, 64.44), new Player(25, 64.44)])  
];
// Team scoring. this array must match teams array in size
const ranks = [30, 70];  

const rates = Rater()(teams, ranks);
```

Resulting rates after processing teams and ranks:
```js
[  
  {mu: 23.035814496704035, sigma: 8.17755635771097, sigma_sq: 66.8724279835391},  
  {mu: 23.035814496704035, sigma: 8.17755635771097, sigma_sq: 66.8724279835391}  
],  
[  
  {mu: 26.964185503295965, sigma: 8.17755635771097, sigma_sq: 66.8724279835391},  
  {mu: 26.964185503295965, sigma: 8.17755635771097, sigma_sq: 66.8724279835391}  
]
```
