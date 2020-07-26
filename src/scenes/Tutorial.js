class Tutorial extends Phaser.Scene{
    constructor() {
        super("tutorialScene");
    }

    preload(){
        /**
         * Progress bar credit to 
         * https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/
         */

        
        var progressBar = this.add.graphics();//creates progressBar
        var progressBox = this.add.graphics();//boarder around progressBar
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(centerX - 110, centerY + 400, 320, 50);

        // progressBar.clear();
        progressBar.fillStyle(0xffffff, 1);
        progressBar.fillRect(centerX - 110, centerY + 400, 300 * .75, 30);


        // this.load.on('progress', function (value) {//uses the built in progress event from Phaser
        //     console.log(value);
        //     progressBar.clear();
        //     progressBar.fillStyle(0xffffff, 1);
        //     progressBar.fillRect(250, 280, 300 * value, 30);
        // });
                    
        // this.load.on('fileprogress', function (file) {//can be used to display info of each loading file
        //     console.log(file.src);
        // });
         
        // this.load.on('complete', function () {//phaser event for end of loading to destroy the loading screen
        //     console.log('complete');
        //     progressBar.destroy();
        //     progressBox.destroy();
        // });

        //////////

        // background images
        this.load.image('redHeart', './assets/redHeart.png');
        this.load.image('hills', './assets/hills.png');
        this.load.image('sky', './assets/sky.png');
        this.load.image('nightSky', './assets/starryBackground.jpg');
        this.load.image('moon', './assets/moon.png');
        this.load.image('sidewalk', './assets/sidewalk.png');
        this.load.image('day', './assets/day.jpg');

        //////////

        // // load spritesheets
        // this.load.spritesheet('kittyRun', './assets/miaSprite.png', {
        //     // frameWidth: 115,
        //     // frameHeight: 64,
        //     frameWidth: 128,
        //     frameHeight: 202,
        //     startFrame: 0,
        //     endFrame: 7
        // });

        // tile map assets



        // load audio files
        this.load.audio('sfx_select', './assets/iPhoneCameraSound.mp3')
        this.load.audio('sfx_explosion', './assets/sagoi.wav');
        this.load.audio('sfx_rocket', './assets/yeah.wav');
        this.load.audio('beem', './assets/yeah.wav');
        this.load.audio('artbgm', './assets/artbgm.ogg');
        this.load.audio('fashionbgm', './assets/bunkakaiFashionGroove.mp3');
        this.load.audio('musicbgm', './assets/bunkakaiFashionGroove.mp3');
        this.load.audio('ohno', './assets/ohno.wav');

        //////////



        //////////

    }


    create(){

        // display splash screen
        this.splashScreen = this.add.tileSprite(0, 0, 1912, 1024, 'background').setOrigin(0, 0);
        this.splashScreen = this.add.tileSprite(0, 0, 1912, 1024, 'splash_screen').setOrigin(0, 0);

        this.scene.remove("bunkakaiScene");
        this.scene.remove("preloadScene");

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

        this.utilities = new utilities(this); // add utils example: this.utilities.crissCross();

        // BGM config
        this.BGMconfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0.5 // start after half a second
        }
        // BGM play, this was really tricky Big thanks to Ben and Darcy!
        if (this.sound.get('artbgm') == null) { // check to see if it exists
            this.BGMmusic = this.sound.add('artbgm', this.BGMconfig); // add music
            this.BGMmusic.play(this.BGMconfig); // play music
        }

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

        // if(Phaser.Input.Keyboard.JustDown(keyLEFT)){

        //     this.scene.start("artScene");

        // }

         // debug scene change call
        this.utilities.sceneChange();

        

        // this.utilities.sceneChange();
    }
}

