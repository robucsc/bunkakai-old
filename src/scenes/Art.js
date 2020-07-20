class Art extends Phaser.Scene {

    constructor() {
        super("artScene");
    }

    preload() {
        // background images
        this.load.image('redHeart', './assets/redHeart.png');
        this.load.image('hills', './assets/hills.png');
        this.load.image('sky', './assets/sky.png');
        this.load.image('nightSky', './assets/starryBackground.jpg');
        this.load.image('moon', './assets/moon.png');

        // particle images
        this.load.image('circle', './assets/circle-8x8.png');

        // art images
        this.load.image('staryNight', './assets/staryNight.png');
        this.load.image('fields', './assets/fields.png');
        this.load.image('bridge', './assets/bridge.png');

        // player spritesheets
        this.load.spritesheet('playerRun', './assets/miaSprite.png', {
            frameWidth: 128,
            frameHeight: 202,
            startFrame: 0,
            endFrame: 7
        });

        // tile map assets
        this.load.image('grass', './assets/grasstp.png');                   // grass tile sheet
        this.load.tilemapTiledJSON('artMap', './assets/artMap.json');  // Tiled JSON file desu
    }

    create() {

        // collectable flight path zones
        this.top = 128;
        this.middle = 320;
        this.bottom = 512;

        // place background images
        this.sky = this.add.image(0,0, "nightSky").setOrigin(0, 0);
        this.nightSky = this.add.tileSprite(0, 0, 1912, 1024, 'nightSky').setOrigin(0, 0).setVisible(false);
        var moon = this.add.sprite(48, 32, 'moon').setScale(1, 1).setOrigin(0, 0); // moon desu
        this.sky = this.add.tileSprite(0, 0, 934, 500, 'sky').setOrigin(0, 0).setVisible(false);
        this.hills = this.add.tileSprite(0, 0, 934, 500, 'hills').setOrigin(0, 0).setVisible(false);

        this.nightSky.alpha = 0; // set sky initial alpha to not visiable

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

        // add ground/grass tile map
        const groundMap = this.add.tilemap('artMap');
        const tileset = groundMap.addTilesetImage('akgrass', 'grass');
        const worldLayer = groundMap.createStaticLayer('grassLayer', tileset, 0, 0);
        // console.log('groundMap ', groundMap, 'tileset ', tileset, 'worldLayer', worldLayer)

        // set collisions
        // groundLayer.setCollisionByProperty({ floor: true });

        // add player
        this.playerOne = new Runner(this, 704, 575, 'playerRun', 0, 30, false).setScale(1, 1).setOrigin(0, 0);

        // follow playerOne with the camera
        this.cameras.main.startFollow(this.playerOne);
        this.cameras.main.followOffset.set(-256, 64);
        this.cameras.main.setDeadzone(0, 2048);
        // this.cameras.main.setBounds(0, 0, 1912, 1024);

        // add kokoro
        // this.myKokoro = new Kokoro(this, this.playerOne.x, this.playerOne.y, 'redHeart', 0).setScale(0.5, 0.5).setOrigin(0, 0);
        // this.myKokoro.alpha = 0;

        // add collectableItem
        this.collectableItem = [new Collectable(this, 192, this.top, 'staryNight', 0, 10, false).setScale(2, 2).setOrigin(0, 0),
            new Collectable(this, 96, this.middle, 'fields', 0, 10, false).setScale(2, 2).setOrigin(0, 0),
            new Collectable(this, 0, this.bottom, 'bridge', 0, 10, false).setScale(2, 2).setOrigin(0, 0)];

        // add display hearts - normally these are setVisibale to false
        this.displayKokoro = [this.add.sprite(1528, 48, 'bridge').setScale(1, 1).setOrigin(0, 0).setVisible(true),
            this.add.sprite(1568, 48, 'redHeart').setScale(0.75, 0.75).setOrigin(0, 0).setVisible(true),
            this.add.sprite(1608, 48, 'redHeart').setScale(0.75, 0.75).setOrigin(0, 0).setVisible(true),
            this.add.sprite(1648, 48, 'redHeart').setScale(0.75, 0.75).setOrigin(0, 0).setVisible(true),
            this.add.sprite(1688, 48, 'redHeart').setScale(0.75, 0.75).setOrigin(0, 0).setVisible(true)];

        // playerOne animation config
        this.anims.create({
            key: 'playerAni',
            frames: this.anims.generateFrameNumbers('playerRun', {start: 0, end: 8, first: 0}),
            repeat: -1,
            frameRate: 15
        });

        // start playerOne animation
        this.playerOne.anims.play('playerAni');

        // Particle System
        // this.particles = this.add.particles('circle');
        // this.particles.createEmitter({
        //     speed: 100,
        //     gravity: { x: 0, y: 200 },
        //     scale: { start: 0.1, end: 1 },
        //     tint: [0x008080, 0x008B8B, 0x00FFFF, 0xff0000],
        // }).startFollow(this.miku, 32, 32); // particle offset from followee

        // define control keys
        keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        // debug scene change keys
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A); // art
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F); // fashion
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M); // music

        // score
        this.p1Score = 0;

        // score display
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#f00',
            color: '#000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(96, 48, this.p1Score, scoreConfig);
        this.capturedHearts = 0;
        this.kokoros = 0;

        // game over flag
        this.gameOver = false;

        // play clock
        this.moreTime = 0;
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer + this.moreTime, () => {
            this.add.text(game.config.width / 2, game.config.height / 2, 'おわい!', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width / 2, game.config.height / 2 + 64, '(L)ove to Play or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

    }

    update() { // ideally every frame
        // check key input for restart, keyUP for one handed play
        if (this.gameOver && (Phaser.Input.Keyboard.JustDown(keyL))) {
            this.time.removeAllEvents();
            this.scene.restart(this.p1Score);
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.time.removeAllEvents();
            this.scene.start("menuScene");
        }

        // update player
        this.playerOne.update();

        // debug scene change call
        this.sceneChange();

        // global audio mute
        this.muteAudio();

        // if (this.clock.getElapsedSeconds() > 5) {
        //     this.cameras.main.zoomTo(1.5, 3000, 'Stepped', false);
        // }

        // this.sidewalk.tilePositionX += 4;
        this.hills.tilePositionX += 1;
        this.sky.tilePositionX += .5;
        this.nightSky.tilePositionX += .5;

        if (!this.gameOver) {
            // this.myKokoro.update();
            if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            this.playerOne.update();        // update playerOne
            }
            this.collectableItem[0].update();
            this.collectableItem[1].update();
            this.collectableItem[2].update();
        }

        // crissCross - evasive pattern for collectables
        if (this.clock.getElapsedSeconds() > 5) {
            this.crissCross(this.collectableItem[0]);
            this.crissCross(this.collectableItem[1]);
            this.crissCross(this.collectableItem[2]);
        }

        // change the sky
        // console.log(this.time.now);
        if (this.clock.getElapsedSeconds() > 10 && this.clock.getElapsedSeconds() < 40) {
            this.nightSky.alpha = 1;
            this.sky.alpha -= .001;
        } else {
            this.sky.alpha += .001;
            this.nightSky.alpha -= .005;
        }

        // Love ani movement
        // if (this.boom){ // explosion movement
        //     this.boom.x -= game.settings.spaceshipSpeed - 3;
        // }

        // check heart collection
        if (this.checkCollision(this.playerOne, this.collectableItem[0])) {
            this.collected(this.collectableItem[0]);
        }
        if (this.checkCollision(this.playerOne, this.collectableItem[1])) {
            this.collected(this.collectableItem[1]);
        }
        if (this.checkCollision(this.playerOne, this.collectableItem[2])) {
            this.collected(this.collectableItem[2]);
        }

        // check kokoro playerOne collision
        // if (this.checkCollision(this.playerOne, this.myKokoro)){
        //     console.log('playerOne Loved');
        //     this.myKokoro.reset();
        //     this.letsExplode(this.playerOne);
        // }
    }

    checkCollision(sprite, collectable) {
        // AABB bounds checking - simple AABB checking
        if (sprite.x < collectable.x + collectable.width &&
            sprite.x + sprite.width > collectable.x &&
            sprite.y < collectable.y + collectable.height &&
            sprite.height + sprite.y > collectable.y) {
            return true;
        } else {
            return false;
        }
    }

    letsExplode(collectable) {
        // collectable.alpha = 0;                             // temporarily hid ship
        // create explosion sprite at ship's position
        this.boom = this.add.sprite(collectable.x, collectable.y, 'explosion').setOrigin(0, 0);

        this.boom.anims.play('explode');            // play explode animation
        this.boom.on('animationcomplete', () => {   // callback after animation completes
            // collectable.reset();                           // reset ship position
            // collectable.alpha = 1;                         // make ship visible again
            this.boom.destroy();                    // remove explosion sprite
        });
        this.p1Score += collectable.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');
    }

    collected(collectable) {
        collectable.alpha = 0;
        this.p1Score += collectable.points;
        this.scoreLeft.text = this.p1Score;
        if (this.kokoros <= 5) {
            this.capturedHearts += 1;
            this.kokoroMeter(this.capturedHearts);
        } else {
            this.capturedHearts = 0;
        }
        this.sound.play('beem');
        collectable.reset(); // reset ship position
    }

    crissCross(collectable) { // special thanks to Darcy for helping me with this one!!!
        if (collectable.direction) {
            // make collectable go up - later this could be a function
            collectable.y -= .5;
            // collectable.y -= Math.sin(collectable.x);
            // this.y = Math.sin(this.x) * n + this.initialY
            if (collectable.y <= this.top) {
                collectable.direction = false;
            }
            return;

        } else if (!collectable.direction) {
            // make collectable go down - later this could be a function
            collectable.y += .5;
            // collectable.y += Math.sin(collectable.x);
            if (collectable.y >= this.bottom) {
                collectable.direction = true;
            }
            return;
        }
    }

    // crissCross(collectable) { // special thanks to Darcy for helping me with this one!!!
    //     // if (collectable.direction) {
    //         // make collectable go up - later this could be a function
    //         // collectable.y -= .5;
    //         // collectable.y -= Math.sin(collectable.x);
    //     collectable.y = (Math.sin(collectable.x) * 10 + collectable.y) ;
    //         // if (collectable.y <= this.top) {
    //         //     collectable.direction = false;
    //         // }
    //         // return;
    //
    //     // }
    // }

    // display kokoro - this should probably have been a switch statement
    kokoroMeter(capturedHearts) {
        if (capturedHearts == 10) {
            this.displayKokoro[0].setVisible(true);
            this.kokoros += 1;
        } else if (capturedHearts == 20) {
            this.displayKokoro[1].setVisible(true);
            this.kokoros += 1;
        } else if (capturedHearts == 30) {
            this.displayKokoro[2].setVisible(true);
            this.kokoros += 1;
        } else if (capturedHearts == 40) {
            this.displayKokoro[3].setVisible(true);
            this.kokoros += 1;
        } else if (capturedHearts == 50) {
            this.displayKokoro[4].setVisible(true);
            this.kokoros += 1;
        }
    }

    kokoroDropped() {
        console.log('the kokoro has been dropped')
        this.displayKokoro[this.kokoros - 1].setVisible(false);
        this.kokoros -= 1;
        this.capturedHearts -= 10;
        if (this.capturedHearts < 0) {
            this.capturedHearts = 0;
        }
    }

    // debug scene change code
    sceneChange() {
        if (Phaser.Input.Keyboard.JustDown(keyF)) {
            this.time.now = 0;
            // this.sound.stopAll();
            this.BGMmusic.mute = true;
            this.sound.play('sfx_select');
            this.scene.start("fashionScene");
        }
        if (Phaser.Input.Keyboard.JustDown(keyM)) {
            this.time.now = 0;
            // this.sound.stopAll();
            this.BGMmusic.mute = true;
            this.sound.play('sfx_select');
            this.scene.start("musicScene");
        }
    }

    muteAudio(){ // found info for this on https://gist.github.com/zackproser/1aa1ee41f326fc00dfb4
        // if (Phaser.Input.Keyboard.JustDown(keyX)) {
        //     if (!this.game.sound.mute) {
        //         this.game.sound.mute = true;
        //     } else {
        //         this.game.sound = false;
        //     }
        // }
    }
}