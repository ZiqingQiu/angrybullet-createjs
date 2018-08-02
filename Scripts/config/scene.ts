/*
* File name: scene.ts
* Author: Ziqing(James) Qiu 300919236
* Last modified by: Ziqing(James) Qiu
* Date last modified: Jul 30 2018
* Description: contains all the scene types
* Revision history:
* June 24 2018 created file
* Aug 2 2018 add all the three levels to scene
*/
module config {
    export enum Scene {
        START = 0,
        INSTRUCTION = 1,
        LEVEL1 = 2,
        LEVEL1_FINAL = 3,
        LEVEL2 = 4,
        LEVEL2_FINAL = 5,
        LEVEL3 = 6,
        LEVEL3_FINAL = 7,
        OVER
    }
}