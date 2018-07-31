/*
* File name: vec2.ts
* Author: Ziqing(James) Qiu 300919236
* Last modified by: Ziqing(James) Qiu
* Date last modified: Jul 30 2018
* Description: manages the distance calculation between two objects
* Revision history:
* June 24 2018 created file
*/
module math {
    export class Vec2 extends createjs.Point {

        //Private Instance Variables

        //Public Properties

        //Constructor
        constructor(x: number = 0, y: number = 0) {
            super(x, y);
        }
        //Private Methods

        //Public Methods
        public static Distance(P1: Vec2, P2: Vec2): number
        {
            return Math.floor(Math.sqrt(Math.pow(P2.x - P1.x, 2) + Math.pow(P2.y - P1.y, 2)));
        }
    }
}