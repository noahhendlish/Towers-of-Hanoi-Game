class Game{
    constructor(numDisks = 3){
        this.numDisks = numDisks;
        this.towers = [[...Array(numDisks).keys()].reverse(), [], []];
    }
    run(reader, completionCallback){
        this.promptMove(reader, (startTowerIdx, endTowerIdx) =>{
            if(!(this.move(startTowerIdx,endTowerIdx))){
                console.log("invalid move!");
            }
            if(!this.isWon()){
                //continue play
                this.run(reader, completionCallback);
            }
            else{
                this.printStacks();
                console.log("You Win!");
                completionCallback();
            }
        });
        //until end game (stack of disks is sorted from largest to smallest from bottom to top) on the last rod
        //get move from player:
            //allow player to move one disk at a time 
            //(each move consisting of taking upper disk from one stack and placing it on top of another stack/empty rod)
            //no disk may be placed on top of a disk that is smaller than it
        //check if move is valid
        //if valid, make move, if not, ask player to make valid move
    }

    printStacks(){
        let towerString = "\n\t";
        for(let diskIdx = this.numDisks-1; diskIdx >= 0; diskIdx--){
            for(let towerIdx = 0; towerIdx < this.towers.length; towerIdx++){
                let tower = this.towers[towerIdx];
                if(tower[diskIdx] === undefined){
                    towerString+= "  -  ";
                }
                else{
                    towerString += "  " + tower[diskIdx] + "  ";
                }
            }
            towerString += "\n\t";
        }
        towerString += "  A    B    C\n"
        console.log(towerString);
    }

    move(startTowerIdx, endTowerIdx){
        if(this.isValidMove(startTowerIdx, endTowerIdx)){
            let startTowerLetter = this.getTowerLetterByIdx(startTowerIdx);
            let endTowerLetter = this.getTowerLetterByIdx(endTowerIdx);
            console.log("Moving...");
            let disk = this.towers[startTowerIdx].pop();
            this.towers[endTowerIdx].push(disk);
            console.log(`Moved ${disk} from tower ${startTowerLetter} to tower ${endTowerLetter} \n`);
            return true;
        }
        else{
            return false;
        }
    }

    isWon(){
        return (this.towers[2].length === this.numDisks) || (this.towers[1].length === this.numDisks);
    }

    isValidMove(startTowerIdx, endTowerIdx){
        if(startTowerIdx === -1){
            return false;
        }
        if(this.towers[startTowerIdx].length === 0){ //empty tower to start -- cannot take disk
            return false;
        }
        else if(this.towers[endTowerIdx].length === 0){ //empty tower to end -- can always place disk
            return true;
        }
        else{ //non-empty start and end tower -- can place disk on end if top disk on start tower is smaller than top disk on end tower
            return (this.towers[endTowerIdx][0] > this.towers[startTowerIdx][0]);
        }
    }


    promptMove(reader, callback){
        this.printStacks();
        reader.question("Which tower would you like to remove a disk from? (type: 'A', 'B' or 'C') ", start => {
            let startTowerIdx = this.getTowerIdxByLetter(start);
            if(startTowerIdx === undefined){
                console.log("Invalid Entry... Start Over!\n");
                this.promptMove(reader, callback);
            }
            else{
                reader.question("Which tower would you like to move the disk to? (type: 'A', 'B' or 'C') ", end => {
                    let endTowerIdx = this.getTowerIdxByLetter(end);
                    if(endTowerIdx === undefined){
                        console.log("Invalid Entry... Start Over!\n\n");
                        this.promptMove(reader, callback);
                    }
                    else{
                        callback(startTowerIdx, endTowerIdx);
                    }
                });
            }
        });
    }
    getTowerIdxByLetter(letter){
        if(letter.toUpperCase() === 'A'){
            return 0;
        }
        else if(letter.toUpperCase() === 'B'){
            return 1;
        }
        else if(letter.toUpperCase() === 'C'){
            return 2;
        }
        else{
            return -1;
        }
    }
    getTowerLetterByIdx(idx){
        if(idx === 0){
            return 'A';
        }
        else if(idx === 1){
            return 'B';
        }
        else if(idx == 2){
            return 'C';
        }
    }
}

module.exports = Game;