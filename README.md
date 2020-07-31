Javascript implementation of Weng-Lin Rating, using Bradley Terry model as described at [https://jmlr.csail.mit.edu/papers/volume12/weng11a/weng11a.pdf](https://jmlr.csail.mit.edu/papers/volume12/weng11a/weng11a.pdf)  
  
  
## Installation  
  
Add `wenglin` to your list of dependencies in `package.json`:  
  
```bash  
npm install --save wenglin  
```  
  
## Importing wenglin module  
  
Use CommonJS's `require`  
  
```js  
const {    
  Rater,    
  Team,    
Player } = require('wenglin');  
```  
  
## Modules  
  
Player skill is represented by two parameters: mu and sigma  
Mu is the actual skill of the player and sigma is its standard deviation.  
Default values for mu and sigma are 25. and 25 / 3.  
  
**Rater** is the main rating processor. It is initialized with BETA (sigma / 2) parameter by default so it can me omitted.  

```js
const rater = new Rater();
const rater = new Rater(BETA);
```

Once rater is initialized, it can be invoked with all teams as separated arguments:

```js
rater(team_1, team_2, team_3, ...);
```

**Team**: Team represents a set of players, each with its skill data and a score. Score scale does not matter. It is compared between teams pairs and considered win, draw or loss.

```js 
const team_1 = new Team({players: [player_1, player_2, ...], score: 119});
const team_1 = new Team({players: [player_x, player_y, ...], score: 342});
```

**Player** This class stores a player's skill, mu and sigma.
Player class is initialized with default mu and sigma but can also be overwritten.

```js
const player = new Player({mu: 25, sigma: 25 / 3,});
```

**Player** skill can be obtained calling its **skill** method
```js
> const player = new Player({mu: 25, sigma: 25 / 3, ref: my_db_player});
> player.skill()
{ mu: 25, sigma_sq: 69.44444444444446, sigma: 8.333333333333334 }
```

Player can also store a reference to an object of your choice to keep track of players in your implementation and ease its usage after Rater results are returned.

```js
> const my_db_player = {foo: 'bar'};
> const player = new Player({mu: 25, sigma: 25 / 3, ref: my_db_player});
> player.ref()
{ foo: 'bar' } 
```


## Full usage example
  
```js  
> const team_1 = new Team({players: [new Player(), new Player()], score: 60});  
> const team_2 = new Team({players: [new Player(), new Player()], score: 80});  
> const team_3 = new Team({players: [new Player(), new Player()], score: 80});  
  
> Rater()(team_1, team_2, team_3);  

[  
  Player {  _mu: 21.07162899340807, _sigma: 8.018753738744802, _sigma_sq: 64.30041152263375,_ref: undefined},  
  Player {  _mu: 21.07162899340807, _sigma: 8.018753738744802, _sigma_sq: 64.30041152263375, _ref: undefined},  
  Player {  _mu: 26.964185503295965, _sigma: 8.018753738744802, _sigma_sq: 64.30041152263375, _ref: undefined},  
  Player {  _mu: 26.964185503295965, _sigma: 8.018753738744802, _sigma_sq: 64.30041152263375, _ref: undefined},  
  Player {  _mu: 26.964185503295965, _sigma: 8.018753738744802, _sigma_sq: 64.30041152263375, _ref: undefined},  
  Player {  _mu: 26.964185503295965, _sigma: 8.018753738744802, _sigma_sq: 64.30041152263375, _ref: undefined}  
]
```  
  
## Results  
  
Rater output is an array of Player objects with the new rating and in the same input order. Original players are kept intact. After results are returned by rater, you can iterate over result items to obtain each reference and data at your side.

```js  
> const result = Rater()(team_1, team_2, ...);  
> player_1_skill = result.map(it => it.skill())  
[  
 {mu: 23.035814496704035, sigma: 8.17755635771097, sigma_sq: 66.8724279835391},  
 {mu: 23.035814496704035, sigma: 8.17755635771097, sigma_sq: 66.8724279835391},  
 {mu: 26.964185503295965, sigma: 8.17755635771097, sigma_sq: 66.8724279835391},  
 {mu: 26.964185503295965, sigma: 8.17755635771097, sigma_sq: 66.8724279835391}  
]  
```  
  
