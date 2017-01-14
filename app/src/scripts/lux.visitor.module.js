//lux.visitor.module.js

// import GeoLocation from 'geodesy';

import * as THREE from '../../vendors/threejs/three.min';

export class LuxVisitor {

    constructor(x, y, velocity, orientation) {

        this.xPos = x; //x position
        this.yPos = y; //y position
        this.velocity = velocity; // meters per second
        this.orientation = orientation; //in degrees, 0/360 = NORTH, 180 = SOUTH
        this.history = []; //history of locations

        //push initial location to history
        this.pushLocation();

    }

    getPos() {
        return {'x': this.getXPos(), 'y': this.getYPos()};
    }

    setXPos(x) {
        this.xPos = x;
        return this.xPos;
    }

    getXPos() {
        return this.xPos;
    }

    setYPos(y) {
        this.yPos = y;
        return this.yPos;
    }

    getYPos() {
        return this.yPos;
    }

    setVelocity(velocity) {
        this.velocity = velocity;
        return this.velocity;
    }

    getVelocity() {
        return this.velocity;
    }

    setOrientation(orientation) {
        this.orientation = orientation;
        return this.orientation;
    }

    getOrientation() {
        return this.orientation;
    }

    toRadians(angle) {
        return angle * (Math.PI / 180);
    }

    toDegrees(angle) {
        return angle * (180 / Math.PI);
    }

    /**
     * Adds a new location to the history of a lux visitor
     * @returns {Array}
     */
    pushLocation() {
        this.history.push(new THREE.Vector2(this.getXPos(), this.getYPos()));
        return this.history;
    }

    getLocationHistory() {
        return this.history;
    }


    /**
     * update position of LuxVisitor given timeElapsed in seconds, and how much the orientation can deviate from current (degrees)
     */

    updatePosition(timeElapsed, orientationChange) {

        let getRandomInt = (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        };

        let dx, dy;
        //decompose into components
        dx = this.getVelocity() * Math.cos(this.toRadians(this.getOrientation()));
        dy = this.getVelocity() * Math.sin(this.toRadians(this.getOrientation()));
        //add x component to current xPos
        this.setXPos(this.getXPos() + (dx * timeElapsed));
        //add y component to current yPos
        this.setYPos(this.getYPos() + (dy * timeElapsed));

        //update orientation
        this.setOrientation(this.getOrientation() + getRandomInt(-orientationChange,orientationChange))

        //push new location
        this.pushLocation();

    }

    toString() {
        return 'visitor: ' +
            'x: ' + this.getXPos() + ' ' +
            'y: ' + this.getYPos() + ' ' +
            'velocity: ' + this.getVelocity() + ' ' +
            'orientation: ' + this.getOrientation();
    }

}