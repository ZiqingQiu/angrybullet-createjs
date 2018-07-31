/*
* File name: button.ts
* Author: Ziqing(James) Qiu 300919236
* Last modified by: Ziqing(James) Qiu
* Date last modified: Jul 30 2018
* Description: defines the game object of button
* Revision history:
* June 24 2018 created file
*/
module objects {
    export class Button extends objects.GameObject {
        //Private Instance Variables

        //Public Properties

        //Constructor
        constructor(imageString: string, x: number = 0, y: number = 0) {
            super(imageString);

            this.x = x;
            this.y = y;

            //mouse over is very expensive
            //this.on("mouseover", this._mouseOver);
            //this.on("mouseout", this._mouseOut);

        }
        //Private Methods

        //Public Methods
    }
}