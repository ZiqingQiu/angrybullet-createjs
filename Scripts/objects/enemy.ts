module objects {
    export class Enemy extends objects.GameObject {
        //Private Instance Variables


        //Public Properties

        //Constructor
        constructor() {
            super("enemy");
            this.Start();
        }
        //Private Methods
        public Reset(): void {
            this.x = Math.floor((Math.random() * (640 - this.width)) + this.halfWidth);
            this.y = - this.height;
            this.alpha = 0;
        }

        public Move(): void {
            this.y += this._dy;
        }

        public CheckBounds(): void {
            if (this.y >= 0 && this.alpha == 0)
            {
                this.alpha = 1;
            }


            //check lower bounds
            if (this.y >= 480 + this.height)
            {
                this.Reset();
            }
        }

        //Public Methods
        public Start(): void {
            this._dy = 10;
            this.Reset();
        }

        public Update(): void {
            this.Move();
            this.CheckBounds();
        }
    }
}