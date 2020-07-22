class Bunkakai extends Phaser.Scene{
    constructor() {
        super("bunkakaiScene");
    }


    // Loading screen technique
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
        // load splash screen
        this.load.image('splash_screen', './assets/bunkakaiText.png');
        this.load.image('background', './assets/day.jpg')
        // load audio files
        this.load.audio('sfx_select', './assets/iPhoneCameraSound.mp3');
        this.load.audio('sfx_explosion', './assets/sagoi.wav');
        this.load.audio('sfx_rocket', './assets/yeah.wav');
        this.load.audio('beem', './assets/yeah.wav');
        this.load.audio('artbgm', './assets/artbgm.ogg');
        this.load.audio('fashionbgm', './assets/bunkakaiFashionGroove.mp3');
        this.load.audio('musicbgm', './assets/bunkakaiFashionGroove.mp3');
        this.load.audio('ohno', './assets/ohno.wav');
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
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)){
            // yasashi modo desu
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 600000
            }
            this.sound.play('sfx_select');
            this.scene.start("artScene");
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            // hardo modo desu
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 450000
                // gameTimer: 7000
            }
            this.time.now = 0;
            this.sound.play('sfx_select');
            this.scene.start("artScene");
        }
    }
}

