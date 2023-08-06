# Pong-Phaser

![image](https://github.com/spenceryonce/Pong-Phaser/assets/9080157/e3c39382-df12-4905-b345-f24fe66122ca)


## Overview

Pong-Phaser is a simple Pong game built with Phaser 3. It is designed for two players, with Player 1 using WASD controls and Player 2 using arrow keys. The first player to reach 5 points wins the game, and the game can be reset at any time by pressing the spacebar. The ball bounces off paddles with different sound effects, and a winning player text is displayed when someone reaches 5 points.

## Code Overview

### Main Game Config

- The game is rendered at a resolution of 800x600.
- Arcade physics is enabled for smooth gameplay.
- The preload, create, and update functions are defined for game setup and maintenance.

### Variables

- Player paddles, ball, score text, and win text are defined as variables.
- Keybindings and scores are initialized.
- Window width and height are stored for reference.
- A paddle separation ratio is used for initial positioning.

### Functions

- `ResetBall()`: This function resets the ball to the center of the screen and assigns a random velocity to it.

- `BounceBall()`: When called, this function plays a random paddle bounce sound effect.

- `checkBallPositionForScore()`: This function checks if the ball has passed a paddle and increments the score accordingly.

- `ResetPlayerPositions()`: This function repositions the paddles to their start positions.

- `ResetGame()`: When invoked, this function resets the scores and game objects, effectively restarting the game.

- `ScoreLimitReached()`: If called, this function stops the ball and paddles when someone wins the game.

### Main Game Loop

- The game loop continuously checks the ball's position to update scores.
- If the score limit is reached, it shows the winning text.
- The game can be reset at any time by pressing the spacebar.
- The score text is continuously updated during the game.

### Assets

- Paddle and ball sprites are used for player and game element representation.
- A background sky image creates an immersive environment.
- There are four ball bounce sound effects for added realism and feedback.

## Next Steps

Here are some potential improvements for the Pong-Phaser game:

- Add particle effects on ball bounces to enhance visual appeal.
- Allow players to customize their keybindings for more comfortable controls.
- Implement an AI opponent option for single-player mode.
- Increase ball speed over time to make the game more challenging.
- Add a menu system to offer a better user experience.

## Credits

Game created by [Spencer Yonce].
