/*
* File name: instruction.ts
* Author: Ziqing(James) Qiu 300919236
* Last modified by: Ziqing(James) Qiu
* Date last modified: Jul 30 2018
* Description: scene object of instruction
* Revision history:
* Jul 24 2018 created file
* Aug 6 2018 add the instruction image combined with previous instruction
*/
module scenes {
    export class InstructionScene extends objects.Scene {
        //private instance variables
        private _space: objects.Space;

        //keyboard
        private _kb_w: createjs.Sprite;
        private _kb_a: createjs.Sprite;
        private _kb_s: createjs.Sprite;
        private _kb_d: createjs.Sprite;
        private _kb_up: createjs.Sprite;
        private _kb_down: createjs.Sprite;
        private _kb_left: createjs.Sprite;
        private _kb_right: createjs.Sprite;
        private _kb_space: createjs.Sprite;

        //label
        private _riseLabel: objects.Label;
        private _forwardLabel: objects.Label;
        private _diveLabel: objects.Label;
        private _backwardLabel: objects.Label;
        private _fireLabel: objects.Label;

        //btns
        private  _playButtton: objects.Button; 
        private  _backButtton: objects.Button; 

        //bitmap for instruction
        private _instructionimg: createjs.Bitmap;

        //public properties
        //constructor
        constructor() {
            super();

            this.Start();
        }

        //private methods
        private _positionKbBtn(spriteName: string, x: number, y: number): createjs.Sprite {
            let btnObj: createjs.Sprite = new createjs.Sprite(managers.Game.textureAtlas, spriteName);
            btnObj.x = x;
            btnObj.y = y;
            return btnObj;
        }

        private _positionLbl(spriteName: string, x: number, y: number): objects.Label {
            let lblObj: objects.Label = new objects.Label(spriteName, "20px", "Starjedi", "#FFFF00", x, y, false);
            return lblObj;
        }


        private _playButtonClick(): void{
            managers.Game.currentScene = config.Scene.LEVEL1;
        }

        private _backButtonClick(): void{
            managers.Game.currentScene = config.Scene.START;
        }

        //public methods
        public Start(): void {
            this._space = new objects.Space("space_lv1");

            //keyboard and label
            let xoffset: number = 50;
            let yoffset: number = 50;
            let lblxoffset: number = 100;
            let cur_x: number = 100;
            let cur_y: number = 100;

            this._kb_w = this._positionKbBtn("kb_w", cur_x, cur_y);
            cur_y += yoffset;
            this._kb_a = this._positionKbBtn("kb_a", cur_x, cur_y);
            cur_y += yoffset;
            this._kb_s = this._positionKbBtn("kb_s", cur_x, cur_y);
            cur_y += yoffset;
            this._kb_d = this._positionKbBtn("kb_d", cur_x, cur_y);
            cur_y += yoffset;
            this._kb_space = this._positionKbBtn("kb_blankspace", cur_x, cur_y);
            this._fireLabel = this._positionLbl("Fire Missiles", cur_x + lblxoffset + xoffset, cur_y);

            cur_y = 100;
            cur_x += xoffset;
            this._kb_up = this._positionKbBtn("kb_up", cur_x, cur_y);
            this._riseLabel = this._positionLbl("Forward -- Fast", cur_x + lblxoffset, cur_y);
            cur_y += yoffset;
            this._kb_left = this._positionKbBtn("kb_left", cur_x, cur_y);
            this._forwardLabel = this._positionLbl("Left -- Slow", cur_x + lblxoffset, cur_y);
            cur_y += yoffset;
            this._kb_down = this._positionKbBtn("kb_down", cur_x, cur_y);
            this._backwardLabel = this._positionLbl("Backward -- Slow", cur_x + lblxoffset, cur_y);
            cur_y += yoffset;
            this._kb_right = this._positionKbBtn("kb_right", cur_x, cur_y);
            this._diveLabel = this._positionLbl("Right -- Slow", cur_x + lblxoffset, cur_y);

            //btns
            this._backButtton = new objects.Button("btn_back", 180, 400);
            this._playButtton = new objects.Button("btn_start", 460, 400);

            //bitmap image
            this._instructionimg = new createjs.Bitmap(managers.Game.assetManager.getResult("instruction"));
            this._instructionimg.alpha = 1;

            //main
            this.Main();
        }

        public Update(): void {
            this._space.Update();
            if (managers.Game.keyboardManager.fire)
            {
                this._instructionimg.alpha = 0;
            }
        }

        public Destroy(): void {
            this.removeAllChildren();
        }

        public Main(): void {
            //add the space to the scene
            this.addChild(this._space);
            //add the keyboards to the scene
            this.addChild(this._kb_w);
            this.addChild(this._kb_up);
            this.addChild(this._kb_a);
            this.addChild(this._kb_left);
            this.addChild(this._kb_s);
            this.addChild(this._kb_down);
            this.addChild(this._kb_d);
            this.addChild(this._kb_right);
            this.addChild(this._kb_space);
            //add the labels to the scene
            this.addChild(this._riseLabel);
            this.addChild(this._forwardLabel);
            this.addChild(this._backwardLabel);
            this.addChild(this._diveLabel);
            this.addChild(this._fireLabel);
            //add the btns to the scene
            this.addChild(this._backButtton);
            this.addChild(this._playButtton);    
            this._playButtton.on("click", this._playButtonClick);
            this._backButtton.on("click", this._backButtonClick);       
            //add bit map on top at the beginning
            this.addChild(this._instructionimg);  
        }
    }
}