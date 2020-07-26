class SplashScene extends Phaser.Scene{
    


    constructor() {
        super("SplashScene");
    }


    

    preload(){

        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(centerX - 160, centerY, 320, 50);
        
        this.load.on('progress', function (value) {
            console.log(value);
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(centerX - 160, centerY, 300 * value, 30);
        });
                    
        this.load.on('fileprogress', function (file) {
            console.log(file.src);
        });
         
        this.load.on('complete', function () {
            console.log('complete');
        });



        // load splash screen
        this.load.image('splash_screen', './assets/bunkakaiText.png');
        this.load.image('background', './assets/day.jpg')
        // load audio files
        this.load.audio('sfx_select', './assets/iPhoneCameraSound.mp3');
        this.load.audio('sfx_explosion', './assets/sagoi.wav');
        this.load.audio('sagoi', './assets/sagoi.wav');
        this.load.audio('sfx_rocket', './assets/yeah.wav');
        this.load.audio('beem', './assets/yeah.wav');
        this.load.audio('artbgm', './assets/artbgm.ogg');
        this.load.audio('fashionbgm', './assets/bunkakaiFashionGroove.mp3');
        this.load.audio('musicbgm', './assets/bunkakaiFashionGroove.mp3');
        this.load.audio('ohno', './assets/ohno.wav');

        //////////From Art Scene

        // background images
        this.load.image('redHeart', './assets/redHeart.png');
        this.load.image('hills', './assets/hills.png');
        this.load.image('sky', './assets/sky.png');
        this.load.image('nightSky', './assets/starryBackground.jpg');
        this.load.image('moon', './assets/moon.png');

        // particle images
        this.load.image('circle', './assets/circle-8x8.png');

        // items
        this.load.spritesheet('cItems', './assets/collectableItems.png', {
            frameWidth: 64,
            frameHeight: 64,
            startFrame: 0,
            endFrame: 2
        });

        // art images
        this.load.image('starryNight', './assets/starryNight.png');
        this.load.image('fields', './assets/fields.png');
        this.load.image('bridge', './assets/bridge.png');

        // tile map assets
        this.load.image('grass', './assets/grassTiles192x192.png');                   // grass tile sheet
        this.load.tilemapTiledJSON('grassLayerMap', './assets/artSceneMap.json');  // Tiled JSON file desu

        //////////
        


        

    }


    create(){


      
    }

    update(){ // ideally every frame
        
            this.scene.start("bunkakaiScene");
        

    }
}

