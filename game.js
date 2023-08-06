const WINDOW_WIDTH = 800;
const WINDOW_HEIGHT = 600;
const SEP_RATIO = 10;

let player1, player2;
let cursors;
let ball;
let randomBallVelocity = 0;

let p1Score = 0;
let p2Score = 0;
let scoreText;
let winText;
let sky;


const config = {
    type: Phaser.AUTO,
    width: WINDOW_WIDTH,
    height: WINDOW_WIDTH,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }, //we have no gravity in space
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}

function ResetBall() {
    ball.setAlpha(1);
    ball.setPosition(WINDOW_WIDTH/2, WINDOW_HEIGHT/2);
    let randomNumForDirection = Phaser.Math.Between(1, 100);
    if (randomNumForDirection > 50) {
        ball.setVelocityX(Phaser.Math.Between(120, 350));
        ball.setVelocityY(Phaser.Math.Between(120, 350));
    } else {
        ball.setVelocityX(Phaser.Math.Between(-350, -120));
        ball.setVelocityY(Phaser.Math.Between(-350, -120));
    }
}

function BounceBall(player, ball) {
    //player ball bounce sound
    let randomNumForSound = Phaser.Math.Between(1, 100);
    if (randomNumForSound > 75) {
        this.sound.play('high');
    } else if (randomNumForSound > 50) {
        this.sound.play('higher');
    } else if (randomNumForSound > 25) {
        this.sound.play('med');
    } else {
        this.sound.play('low');
    }
}


const game = new Phaser.Game(config);

function preload() {
    this.load.image('sky', './res/img/sky.png');
    this.load.image('star', './res/img/star.png');
    this.load.image('paddle', './res/img/paddle.png');
    this.load.image('paddletwo', './res/img/paddletwo.png');
    this.load.image('ball', './res/img/ball.png');


    this.load.audio('high', './res/sounds/highboop.wav');
    this.load.audio('higher', './res/sounds/higherboop.wav');
    this.load.audio('low', './res/sounds/lowboop.wav');
    this.load.audio('med', './res/sounds/medboop.wav');
}
function create() {
    sky = this.add.image(WINDOW_WIDTH/2, WINDOW_HEIGHT/2, 'sky');
    sky.setScale(1.1);

    cursors = this.input.keyboard.createCursorKeys();

    player1 = this.physics.add.sprite(WINDOW_WIDTH/SEP_RATIO, WINDOW_HEIGHT/2, 'paddle').setImmovable();
    player2 = this.physics.add.sprite((WINDOW_WIDTH/SEP_RATIO)*(SEP_RATIO-1), WINDOW_HEIGHT/2, 'paddletwo').setImmovable();
    player1.setCollideWorldBounds(true);
    player2.setCollideWorldBounds(true);


    ball = this.physics.add.sprite(WINDOW_WIDTH/2, WINDOW_HEIGHT/2, 'ball');
    ball.setCollideWorldBounds(true);
    ball.setBounce(1,1);
    ball.setCircle(27, 0, 0);
    
    this.physics.add.collider(player1, ball);
    this.physics.add.collider(player2, ball);

    this.physics.add.overlap(player1, ball, BounceBall, null, this);
    ResetBall();

    //UI
    scoreText = this.add.text(WINDOW_WIDTH/2-50, 16, p1Score + ' - ' + p2Score, { fontSize: '44px', fill: '#fff' });
    winText = this.add.text(150, WINDOW_HEIGHT/2-50, '', { fontSize: '60px', fill: '#fff' });


    const rKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    rKey.on('down', (key, event) =>
    {
        event.stopPropagation();
        ResetBall();
    });

    //player1 controls
    const wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    wKey.on('down', (key, event) =>
    {
        event.stopPropagation();
        player1.setVelocityY(-360);
    });
    const sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    sKey.on('down', (key, event) =>
    {
        event.stopPropagation();
        player1.setVelocityY(360);
    });

    //player2 controls
    const upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    upKey.on('down', (key, event) =>
    {
        event.stopPropagation();
        player2.setVelocityY(-360);
    });
    const downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    downKey.on('down', (key, event) =>
    {
        event.stopPropagation();
        player2.setVelocityY(360);
    });

    console.log(ball.body);
}

function checkBallPositionForScore(position) {
    if (position.x < 10) {
        p2Score++;
        ResetBall();
    } else if (position.x > WINDOW_WIDTH-70) {
        p1Score++;
        ResetBall();
    }
}

function ResetPlayerPositions() {
    player1.setPosition(WINDOW_WIDTH/SEP_RATIO, WINDOW_HEIGHT/2);
    player2.setPosition((WINDOW_WIDTH/SEP_RATIO)*(SEP_RATIO-1), WINDOW_HEIGHT/2);
}

function ResetGame() {
    p1Score = 0;
    p2Score = 0;
    ResetText();
    ResetPlayerPositions();
    ResetBall();
}

function ResetText() {
    winText.setText('');
}

// SUMMARY: Called when a player reaches 5 points, 
//stops the ball and players, 
//and makes the ball less visible
function ScoreLimitReached() {
    ball.setAlpha(0.5);
    ball.setVelocityX(0);
    ball.setVelocityY(0);
    player1.setVelocityY(0);
    player2.setVelocityY(0);
}

function update() {
    player1.setVelocityX(0);
    player2.setVelocityX(0);

    checkBallPositionForScore(ball.body.position);

    if(p1Score >= 5 || p2Score >= 5) {
        ScoreLimitReached();
        if (p1Score > p2Score) {
            winText.setText('Player 1 Wins!');
        } else {
            winText.setText('Player 2 Wins!');
        }
    }
    this.input.keyboard.on('keydown', (event) => {
        //check for spacebar to reset game
        if (event.keyCode === 32) {
            ResetGame();
        }
    });
    scoreText.setText(p1Score + ' - ' + p2Score);
}