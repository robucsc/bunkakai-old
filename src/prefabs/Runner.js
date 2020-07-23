// Runner prefab
class Runner extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, pointValue, direction) {
        super(scene, x, y, texture, frame);
        this.direction = direction;
        // add object to the existing scene
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.ACCELERATION = 500;
        this.MAX_X_VEL = 500;   // pixels/second
        this.MAX_Y_VEL = 1500;
        this.DRAG = 600;
        this.JUMP_VELOCITY = -650;

        this.body.setMaxVelocity(this.MAX_X_VEL, this.MAX_Y_VEL);
        this.setAccelerationX(this.scene.runnerAccelerationX);

        // allow player to jump through platforms
        this.body.checkCollision.up = false;
        // set the double jump state
        this.doubleJump = false;

    }

    update() {

        this.moveForward();

        if (Phaser.Input.Keyboard.JustDown(keyUP)) {
            this.jump();
        }

        this.levelFinish();

    }

    reset() {

    }

    moveForward() { // this allows the runner to not run into platforms during a jump
        if (this.body.velocity.y != 0) {
            this.body.checkCollision.right = false;
        } else {
            this.body.checkCollision.right = true;
        }
    }

    jump() {
        // make runner go up
        if (this.body.velocity.y == 0) { // the main jump code
            console.log('jump one ', this.body.velocity.y)
            this.setVelocityY(this.scene.jumpVelocity);
            this.doubleJump = true;

        } else if (this.doubleJump) { // a second press gives a boost jump
            console.log('jump two ', this.body.velocity.y)
            this.setVelocityY(this.scene.doublejumpVelocity);
            this.doubleJump = false;
        }
    }

    levelFinish(){
        if (this.x >= this.scene.pixelLength) { // stop the runner at level end
            this.setAccelerationX(0);
            this.setVelocityX(0);
        }
        // victory dance

    }

}