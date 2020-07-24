class Bunkakai extends Phaser.Scene{


    constructor() {
        super("bunkakaiScene");
    }


    

    preload(){
        // load splash screen
        this.load.image('splash_screen', './assets/bunkakaiText.png');
        this.load.image('background', './assets/day.jpg')

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



    }

    update(){ // ideally every frame
        
        this.scene.launch("tutorialScene");

    }
}

