class Bunkakai extends Phaser.Scene{


    constructor() {
        super("bunkakaiScene");
    }


    

    preload(){

        var progressBar = this.add.graphics();//creates progressBar
        var progressBox = this.add.graphics();//boarder around progressBar
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(centerX - 110, centerY + 400, 320, 50);

        // progressBar.clear();
        progressBar.fillStyle(0xffffff, 1);
        progressBar.fillRect(centerX -110, centerY + 400, 300 * .25, 30);
        


        // load splash screen
        this.load.image('splash_screen', './assets/bunkakaiText.png');
        this.load.image('background', './assets/day.jpg')



        this.load.tilemapTiledJSON('artMap', './assets/artMap.json');  // Tiled JSON file desu

                //////////

        // art images
        this.load.image('starryNight', './assets/starryNight.png');
        this.load.image('fields', './assets/fields.png');
        this.load.image('bridge', './assets/bridge.png');
        // particle images
        this.load.image('circle', './assets/circle-8x8.png');

        //////////


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
        
        this.scene.launch("preloadScene");

    }
}

