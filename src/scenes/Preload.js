class Preload extends Phaser.Scene{


    constructor() {
        super("preloadScene");
    }


    

    preload(){

        var progressBar = this.add.graphics();//creates progressBar
        var progressBox = this.add.graphics();//boarder around progressBar
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(centerX - 110, centerY + 400, 320, 50);

        // progressBar.clear();
        progressBar.fillStyle(0xffffff, 1);
        progressBar.fillRect(centerX - 110, centerY + 400, 300 * .5, 30);
        



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



    }


    create(){
        





    }

    update(){ // ideally every frame
        
        this.scene.launch("tutorialScene");

    }
}

