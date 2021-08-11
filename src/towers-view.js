const Game = require("./game.js");
class View {
    constructor($el, game){
        this.$el = $el;
        this.game = game || new Game();
        this.setupTowers();
        this.render();
        this.startTower = null;
        this.clickTowerHandler();
    }
    clickTowerHandler(){
        $('.tower').on('click', (e)=>{
            let $tower = $(e.currentTarget);
            let towerNumber = $tower.attr('data-towerNumber');
            if(this.startTower === null){
                if(this.game.towers[towerNumber].length > 0){
                    this.startTower = towerNumber;
                    $tower.removeClass('hover-tower');
                    $tower.addClass('selectedStartTower');
                }
            }
            else{
                let $endTower = $(`.tower[data-towerNumber= "${this.startTower}"]`);
                $endTower.removeClass('selectedStartTower');
                $endTower.addClass('hover-tower');
                let move = this.game.move(this.startTower, towerNumber);
                this.startTower = null;
                if(move == false){
                    alert('Invalid Move!');
                }
            }
            this.render();
            if(this.isWon()){
                setTimeout(()=>{
                    alert('Game Over -- You Win!');
                    this.resetGame();
                }, 100);

            }
        });
    }
    resetGame(){
        this.game = new Game();
        this.render();
    }
    isWon(){
        return this.game.isWon();
    }
    setupTowers(){
        const $game = $('<div>').addClass('game');
        for(let t = 0; t< this.game.towers.length; t++){
            const $tower = $('<ul>').addClass('tower').addClass(`tower-${t}`).addClass('hover-tower').attr('data-towerNumber', t);
            for(let d = 0; d < this.game.numDisks; d++){
                const $discPos = $('<li>').addClass('discPos').attr('data-discPos', d).attr('data-towerNumber', t);
                    $tower.append($discPos);
            }
            $game.append($tower);
        }
        this.$el.append($game);
        let $counter = $('<h3>').addClass('movesCounter').text(`Number of Moves: ${this.game.moves}`);
        this.$el.append($counter);
    }

    render(){
        for(let towerIdx = 0; towerIdx < this.game.towers.length; towerIdx++){
            let $tower = $(`[data-towerNumber= "${towerIdx}"]`);
            let tower = this.game.towers[towerIdx];

            for(let discIdx = 0; discIdx < this.game.numDisks; discIdx++){
                let $disc = $(`[data-towerNumber= "${towerIdx}"][data-discPos = "${discIdx}"]`);
                if(tower[discIdx] !== undefined){
                    let discNum = tower[discIdx];
                    $disc.addClass(`disc-${discNum}`);
                }
                else{
                    $disc.removeClass('disc-0 disc-1 disc-2');
                }
            }
        }
        $('.movesCounter').text(`Number of Moves: ${this.game.moves}`);
    }
}
module.exports = View;