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