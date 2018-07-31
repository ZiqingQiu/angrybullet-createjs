/*
* File name: label.ts
* Author: Ziqing(James) Qiu 300919236
* Last modified by: Ziqing(James) Qiu
* Date last modified: Jul 30 2018
* Description: defines the game object of label
* Revision history:
* June 24 2018 created file
*/
module objects {
    export class Label extends createjs.Text {
        //Private Instance Variables

        //Public Properties

        //Constructors
        constructor (
            labelString: string,
            fontSize: string,
            fontFamily: string,
            fontColour: string,
            x: number = 0,
            y: number = 0,
            isCentered: boolean = false){
            super(labelString, fontSize + " " + fontFamily, fontColour);
            
            if(isCentered)
            {
                this.regX = this.getMeasuredWidth() * 0.5;
                this.regY = this.getMeasuredHeight() * 0.5;
            }

            this.x = x;
            this.y = y;

        }
        //Private Methods

        //Public Methods

    }
}