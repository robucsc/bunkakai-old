class Tutorial extends Phaser.Scene{
    constructor() {
        super("tutorialScene");
    }

    preload(){
        // load splash screen
        // this.load.image('splash_screen', './assets/bunkakaiText.png');
        // this.load.image('background', './assets/day.jpg')

        this.load.spritesheet('playerIdle', './assets/miaIdleForward.png', {
            frameWidth: 128,
            frameHeight: 202,
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

        // debug scene change keys
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A); // art
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F); // fashion
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M); // music
        keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T); // tutorial

        // display splash screen
        // this.splashScreen = this.add.tileSprite(0, 0, 1912, 1024, 'background').setOrigin(0, 0);
        // this.splashScreen = this.add.tileSprite(0, 0, 1912, 1024, 'splash_screen').setOrigin(0, 0);

        this.anims.create({
            key: 'playerIdleAni',
            frames: this.anims.generateFrameNumbers('playerIdle', {start: 0, end: 3, first: 0}),
            repeat: -1,
            frameRate: 15
        });

        // add player to scene
        this.playerOne = new Runner(this, 512, 512, 'playerRun', 0, 30, false).setScale(1, 1).setOrigin(0, 0);
        this.playerOne.body.setAllowGravity(false)
        this.playerOne.anims.play('playerIdle');

        // menu dispay
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#f00',
            color: '#000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        // show menu text
        let centerX = game.config.width * .7;
        let centerY = game.config.height * .63;
        let textSpacer = 64;

        this.add.text(centerX, centerY - textSpacer - textSpacer, 'Bunkakai', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#f00';
        menuConfig.color = '#000';
        this.add.text(centerX, centerY - textSpacer, 'Use the ↑ arrow  to Jump', menuConfig).setOrigin(0.5);
        // this.add.text(centerX, centerY, '(L) to Love', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#f00';
        menuConfig.color = '#000';
        this.add.text(centerX, centerY + 0, 'Press the → arrow to Play', menuConfig).setOrigin(0.5);
    }

    update(){ // ideally every frame
        // if (Phaser.Input.Keyboard.JustDown(keyLEFT) || Phaser.Input.Keyboard.JustDown(keyRIGHT)){
        //     // yasashi modo desu
        //     game.settings = {
        //         spaceshipSpeed: 3,
        //         gameTimer: 600000
        //     }
            // this.sound.play('sfx_select');
            // this.scene.start("artScene");
        // }

        // debug scene change call
        this.utilities.sceneChange();
    }
}

