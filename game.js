const WINDOW_WIDTH = 800;
const WINDOW_HEIGHT = 600;

var player1, player2;
var cursors;

var config = {
    type: Phaser.AUTO,
    width: WINDOW_WIDTH,
    height: WINDOW_WIDTH,
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

var game = new Phaser.Game(config);

function preload() {
    this.load.image('sky', './res/img/sky.png');
    this.load.image('star', './res/img/star.png');
    this.load.image('paddle', './res/img/paddle.png');
    this.load.image('paddletwo', './res/img/paddletwo.png');

    cursors = this.input.keyboard.createCursorKeys();
}
function create() {
    this.add.image(WINDOW_WIDTH/2, WINDOW_HEIGHT/2, 'sky');
    
    player1 = this.physics.add.sprite(WINDOW_WIDTH/4, WINDOW_HEIGHT/2, 'paddle');
    player2 = this.physics.add.sprite((WINDOW_WIDTH/4)*3, WINDOW_HEIGHT/2, 'paddletwo');

    player1.setCollideWorldBounds(true);
    player2.setCollideWorldBounds(true);

    this.physics.add.collider(player1, player2);
}

function update() {
    if (cursors.left.isDown) {
        player2.setVelocityX(-160);
    }
}