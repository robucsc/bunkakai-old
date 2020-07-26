class Bunkakai extends Phaser.Scene{


    constructor() {
        super("bunkakaiScene");
    }


    

    preload(){
        


        // load splash screen
        this.load.image('splash_screen', './assets/bunkakaiText.png');
        this.load.image('background', './assets/day.jpg')

        //////////
                // player spritesheets
        this.load.spritesheet('playerRun', './assets/miaSprite.png', {
            frameWidth: 128,
            frameHeight: 202,
            startFrame: 0,
            endFrame: 7
        });

        this.load.spritesheet('playerIdle', './assets/miaIdleForward.png', {
            frameWidth: 128,
            frameHeight: 202,
            startFrame: 0,
            endFrame: 3
        });

        this.load.spritesheet('playerVictory', './assets/miaVictoryPose.png', {
            frameWidth: 128,
            frameHeight: 202,
            startFrame: 0,
            endFrame: 4
        });

        this.load.spritesheet('playerjump', './assets/miaInAir.png', {
            frameWidth: 128,
            frameHeight: 202,
            startFrame: 0,
            endFrame: 3
        });

        // thief walk
        this.load.spritesheet('enemyOneWalk', './assets/thiefWalk.png', {
            frameWidth: 128,
            frameHeight: 176,
            startFrame: 0,
            endFrame: 3
        });
        //////////

        this.load.tilemapTiledJSON('artMap', './assets/artMap.json');  // Tiled JSON file desu


    }


    create(){
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)

        // display splash screen
        // this.splashScreen = this.add.tileSprite(0, 0, 1912, 1024, 'background').setOrigin(0, 0);
        // this.splashScreen = this.add.tileSprite(0, 0, 1912, 1024, 'splash_screen').setOrigin(0, 0);



    }

    update(){ // ideally every frame
        
        this.scene.launch("tutorialScene");

    }
}

