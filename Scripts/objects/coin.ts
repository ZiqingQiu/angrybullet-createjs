module objects {
    export class Coin extends objects.GameObject {
        //Private instance variables

        //Public properties

        //Constructors
        constructor() {
            super("coin");
            this.Start();
        }


        //Private methods


        //Public methods
        public Start(): void {

        }

        public Update(): void {
            this.CheckBounds();
        }

        public CheckBounds(): void {
            if (this.y > (480 + this.height))
            {
                this.alpha = 1;
            }
        }
    }
}