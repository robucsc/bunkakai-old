// Collectable prefab
class Collectable extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue, direction) {
        super(scene, x, y, texture, frame);
        this.direction = direction;
        // add object to the existing scene
        scene.add.existing(this);

        // store point value
        this.points = pointValue;
    }
    update(){
        // move Collectable right
        this.x -= game.settings.spaceshipSpeed;
        // wraparound from right to left edge
        if (this.x <= 0 - this.width){
            this.reset();
        }
    }
    reset(){
        // this.x = game.config.width;
        this.x = this.scene.playerOne.x + 1337;
        this.alpha = 1;
    }
}