// Runner prefab
class Runner extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, pointValue, direction) {
        super(scene, x, y, texture, frame);
        this.direction = direction;
        // add object to the existing scene
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.ACCELERATION = 500;
        this.MAX_X_VEL = 200;   // pixels/second
        this.MAX_Y_VEL = 2000;
        this.DRAG = 600;
        this.JUMP_VELOCITY = -650;

        this.body.setMaxVelocity(this.MAX_X_VEL, this.MAX_Y_VEL);
        this.setAccelerationX(100);

        this.doubleJump = false;

    }

    update() {

        if (this.x >= 1912) {
            this.reset();
        }
        this.moveForWard();

        if (Phaser.Input.Keyboard.JustDown(keyUP)) {
            this.jump();
        }

    }

    reset() {
        // this.x = game.config.width;
        // this.x = 640;
    }

    moveForWard() {

    }

    jump() {
        // make runner go up
        if (this.body.velocity.y == 0) {
            console.log('jump one ', this.body.velocity.y)
            this.setVelocityY(-700);
            this.doubleJump = true;

        } else if (this.doubleJump) {
            console.log('jump two ', this.body.velocity.y)
            this.setVelocityY(-500);
            this.doubleJump = false;
    }
}

}