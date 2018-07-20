module objects {
    export class Island extends objects.GameObject {
        //Private Instance Variables


        //Public Properties

        //Constructor
        constructor() {
            super("island");
            this.Start();
        }
        //Private Methods
        public Reset(): void {
            this.x = Math.floor((Math.random() * (640 - this.width)) + this.halfWidth);
            this.y = - this.height;
        }

        public Move(): void {
            this.y += this._dy;
        }

        public CheckBounds(): void {
            //check lower bounds
            if (this.y >= 480 + this.height)
            {
                this.Reset();
            }
        }

        //Public Methods
        public Start(): void {
            this._dy = 5;
            this.Reset();
        }

        public Update(): void {
            this.Move();
            this.CheckBounds();
        }
    }
}