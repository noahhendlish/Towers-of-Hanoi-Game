class Game{
    constructor(numDisks = 3){
        this.numDisks = numDisks;
        this.towers = [[...Array(numDisks).keys()].reverse(), [], []];
        this.moves = 0;
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
            let disk = this.towers[startTowerIdx].pop();
            this.towers[endTowerIdx].push(disk);
            this.moves++;
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
        const startTower = this.towers[startTowerIdx];
        const endTower = this.towers[endTowerIdx];
        if(startTower.length === 0){ //empty tower to start -- cannot take disk
            return false;
        }
        else if(endTower.length === 0){ //empty tower to end -- can always place disk
            return true;
        }
        else{ //non-empty start and end tower -- can place disk on end if top disk on start tower is smaller than top disk on end tower
            const topStartDisc = startTower[startTower.length - 1];
            const topEndDisc = endTower[endTower.length - 1];
            return (topEndDisc > topStartDisc);
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