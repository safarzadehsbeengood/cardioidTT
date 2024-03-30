class Point {
    constructor(x, y, id) {
        this.pos = createVector(x, y);
        this.id = id;
    }
    show() {
        strokeWeight(6);
        stroke(255);
        point(this.pos.x, this.pos.y);
    }
}