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
        this.setAccelerationX(300);

        // allow player to jump through platforms
        this.body.checkCollision.up = false;
        this.doubleJump = false;

    }

    update() {

        if (this.x >= 15000) {
            this.setAccelerationX(0);
            this.setVelocityX(0);
        }

        this.moveForward();

        if (Phaser.Input.Keyboard.JustDown(keyUP)) {
            this.jump();
        }

    }

    reset() {
        // this.x = game.config.width;
        // this.x = 640;
    }

    moveForward() {
        if (this.body.velocity.y != 0) {
            this.body.checkCollision.right = false;

        } else {
            this.body.checkCollision.right = true;
        }

    }

    jump() {
        this.body.checkCollision.right = false;
        // make runner go up
        if (this.body.velocity.y == 0) {
            console.log('jump one ', this.body.velocity.y)
            this.setVelocityY(-850);
            this.doubleJump = true;

        } else if (this.doubleJump) {
            console.log('jump two ', this.body.velocity.y)
            this.setVelocityY(-600);
            this.doubleJump = false;
        }
        this.body.checkCollision.right = true;
    }

}