var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create,  update: update });
var cursors;
var player;
var starfield;
var direction;

function preload () {
            // game.load.image('logo', 'phaser.png');
            game.load.image('background', 'assets/bgPlaceHolder.png');
            game.load.spritesheet('test', 'assets/char.png', 57, 57);
            game.load.audio('bgSound', ['assets/bgSound.mp3']);

        }
function create () {

        	music = game.add.audio('bgSound');

        	music.play();

        	//  We're going to be using physics, so enable the Arcade Physics system
        	game.physics.startSystem(Phaser.Physics.ARCADE);

        	//  The scrolling starfield background
        	starfield = game.add.tileSprite(0, 0, 800, 600, 'background');

        	// The player and its settings
        	        	player = game.add.sprite(32, game.world.height - 150, 'test');

        	//  We need to enable physics on the player
        	game.physics.arcade.enable(player);

		    //  Player physics properties. Give the little guy a slight bounce.
		    player.body.bounce.y = 0.2;
		    player.body.gravity.y = 150;
		    player.body.collideWorldBounds = true;

		    //  Our two animations, walking left and right.
		    player.animations.add('left', [0, 1, 2, 3,4,5,6,7,8,9,10], 20,true);
		    player.animations.add('right', [12, 13, 14, 15,16,17,18,19,20,21], 20,true);
		    player.animations.add('face-right', [22, 23, 24, 25, 26], 4, true);
		    player.animations.add('turnRight', [27,28,29],4,true);
		    player.animations.add('face-left', [30,31, 32,33,34], 4, true);

		    cursors = game.input.keyboard.createCursorKeys();
}
function update (){
        	//  Reset the players velocity (movement)
        	player.body.velocity.x = 0;
        	if (cursors.left.isDown){
	        //  Move to the left
		        player.body.velocity.x = -200;
		        if(direction== "left"){
		        	player.animations.play('left');
		    	}
		        direction="left";
	    	}
	    	else if (cursors.right.isDown){
	        //  Move to the right
	        	if(direction =="left"){
	        		console.log("TurnLeft");
	        		player.animations.play('turnRight');
	        	}
	        	player.body.velocity.x = 200;

	        	player.animations.play('right');
	        	direction="right";

	        }
	        else{
	        	console.log(direction);
	    	// player.animations.play('right');
	        //  Stand still
	        // player.frame =0;
	     	if (direction=="right"){
	     		player.animations.play('face-right');
	     	}
	     	else if(direction =="left"){
				player.animations.play('face-left');
	     	}
	        // 	player.animations.stop();
	        // player.frame = 11;
	    	}
}