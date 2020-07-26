class Bunkakai extends Phaser.Scene{
    // constructor() {
    //     super({key:"bunkakaiScene",
    //         pack: {
    //             files: [
    //                 { type: 'image', key: 'splash_screen', url: './assets/bunkakaiText.png' },
    //                 { type: 'image', key: 'background', url: './assets/day.jpg' }
    //             ]
    //         }});
    // }


    constructor() {
        super("bunkakaiScene");
    }


    // // Loading screen technique
    // constructor() {
    //     super({key: "menuScene",
    //         pack: {
    //             files: [
    //                 { type: 'image', key: 'loading', url: './Assets/loading_screen.png' }
    //             ]
    //         }});
    // }
    //
    // this.add.image(0,0,"loading").setOrigin(0)

    preload(){



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
            endFrame: 16
        });

        this.load.spritesheet('playerjump', './assets/miaInAir.png', {
            frameWidth: 128,
            frameHeight: 202,
            startFrame: 0,
            endFrame: 3
        });

        // thief walk
        this.load.spritesheet('antagonistWalk', './assets/thiefWalk.png', {
            frameWidth: 128,
            frameHeight: 176,
            startFrame: 0,
            endFrame: 3
        });

    }


    create(){
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)

        // display splash screen
        this.splashScreen = this.add.tileSprite(0, 0, 1912, 1024, 'background').setOrigin(0, 0);
        this.splashScreen = this.add.tileSprite(0, 0, 1912, 1024, 'splash_screen').setOrigin(0, 0);

        // Camera fade in
        this.cameras.main.fadeIn(1500, 0, 0, 0)
    }

    update(){ // ideally every frame
        if (Phaser.Input.Keyboard.JustDown(keyLEFT) || Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            // yasashi modo desu
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 600000
            }
            this.cameras.main.fadeOut(1500, 0, 0, 0)
            this.sound.play('sfx_select');
            this.scene.start("artScene");
        }

    }
}


