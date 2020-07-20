



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



// debug scene change code
sceneChange(theKeyPressed) {
    if (theKeyPressed == Phaser.Input.Keyboard.JustDown(keyA)) {
        this.time.now = 0;
        this.sound.stopAll();
        // this.game.sound.mute = true;
        this.sound.play('sfx_select');
        this.scene.start("musicScene");
    }
    if (theKeyPressed == Phaser.Input.Keyboard.JustDown(keyF)) {
        this.time.now = 0;
        this.sound.stopAll();
        this.sound.play('sfx_select');
        this.scene.start("fashionScene");
    }
    if (theKeyPressed == Phaser.Input.Keyboard.JustDown(keyM)) {
        this.time.now = 0;
        this.sound.stopAll();
        // this.game.sound.mute = true;
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

