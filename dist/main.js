/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module) => {

eval("class Game{\n    constructor(numDisks = 3){\n        this.numDisks = numDisks;\n        this.towers = [[...Array(numDisks).keys()].reverse(), [], []];\n        this.moves = 0;\n    }\n    run(reader, completionCallback){\n        this.promptMove(reader, (startTowerIdx, endTowerIdx) =>{\n            if(!(this.move(startTowerIdx,endTowerIdx))){\n                console.log(\"invalid move!\");\n            }\n            if(!this.isWon()){\n                //continue play\n                this.run(reader, completionCallback);\n            }\n            else{\n                this.printStacks();\n                console.log(\"You Win!\");\n                completionCallback();\n            }\n        });\n    }\n\n    printStacks(){\n        let towerString = \"\\n\\t\";\n        for(let diskIdx = this.numDisks-1; diskIdx >= 0; diskIdx--){\n            for(let towerIdx = 0; towerIdx < this.towers.length; towerIdx++){\n                let tower = this.towers[towerIdx];\n                if(tower[diskIdx] === undefined){\n                    towerString+= \"  -  \";\n                }\n                else{\n                    towerString += \"  \" + tower[diskIdx] + \"  \";\n                }\n            }\n            towerString += \"\\n\\t\";\n        }\n        towerString += \"  A    B    C\\n\"\n        console.log(towerString);\n    }\n\n    move(startTowerIdx, endTowerIdx){\n        if(this.isValidMove(startTowerIdx, endTowerIdx)){\n            let disk = this.towers[startTowerIdx].pop();\n            this.towers[endTowerIdx].push(disk);\n            this.moves++;\n            return true;\n        }\n        else{\n            return false;\n        }\n    }\n\n    isWon(){\n        return (this.towers[2].length === this.numDisks) || (this.towers[1].length === this.numDisks);\n    }\n\n    isValidMove(startTowerIdx, endTowerIdx){\n        if(startTowerIdx === -1){\n            return false;\n        }\n        const startTower = this.towers[startTowerIdx];\n        const endTower = this.towers[endTowerIdx];\n        if(startTower.length === 0){ //empty tower to start -- cannot take disk\n            return false;\n        }\n        else if(endTower.length === 0){ //empty tower to end -- can always place disk\n            return true;\n        }\n        else{ //non-empty start and end tower -- can place disk on end if top disk on start tower is smaller than top disk on end tower\n            const topStartDisc = startTower[startTower.length - 1];\n            const topEndDisc = endTower[endTower.length - 1];\n            return (topEndDisc > topStartDisc);\n        }\n    }\n\n\n    promptMove(reader, callback){\n        this.printStacks();\n        reader.question(\"Which tower would you like to remove a disk from? (type: 'A', 'B' or 'C') \", start => {\n            let startTowerIdx = this.getTowerIdxByLetter(start);\n            if(startTowerIdx === undefined){\n                console.log(\"Invalid Entry... Start Over!\\n\");\n                this.promptMove(reader, callback);\n            }\n            else{\n                reader.question(\"Which tower would you like to move the disk to? (type: 'A', 'B' or 'C') \", end => {\n                    let endTowerIdx = this.getTowerIdxByLetter(end);\n                    if(endTowerIdx === undefined){\n                        console.log(\"Invalid Entry... Start Over!\\n\\n\");\n                        this.promptMove(reader, callback);\n                    }\n                    else{\n                        callback(startTowerIdx, endTowerIdx);\n                    }\n                });\n            }\n        });\n    }\n    getTowerIdxByLetter(letter){\n        if(letter.toUpperCase() === 'A'){\n            return 0;\n        }\n        else if(letter.toUpperCase() === 'B'){\n            return 1;\n        }\n        else if(letter.toUpperCase() === 'C'){\n            return 2;\n        }\n        else{\n            return -1;\n        }\n    }\n    getTowerLetterByIdx(idx){\n        if(idx === 0){\n            return 'A';\n        }\n        else if(idx === 1){\n            return 'B';\n        }\n        else if(idx == 2){\n            return 'C';\n        }\n    }\n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const View = __webpack_require__(/*! ./towers-view.js */ \"./src/towers-view.js\");\nconst Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\n$(() => {\n  const rootEl = $('.view-figure');\n  const game = new Game();\n  const view = new View(rootEl, game);\n\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/towers-view.js":
/*!****************************!*\
  !*** ./src/towers-view.js ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\nclass View {\n    constructor($el, game){\n        this.$el = $el;\n        this.game = game || new Game();\n        this.setupTowers();\n        this.render();\n        this.startTower = null;\n        this.clickTowerHandler();\n    }\n    clickTowerHandler(){\n        $('.tower').on('click', (e)=>{\n            let $tower = $(e.currentTarget);\n            let towerNumber = $tower.attr('data-towerNumber');\n            if(this.startTower === null){\n                if(this.game.towers[towerNumber].length > 0){\n                    this.startTower = towerNumber;\n                    $tower.removeClass('hover-tower');\n                    $tower.addClass('selectedStartTower');\n                }\n            }\n            else{\n                let $endTower = $(`.tower[data-towerNumber= \"${this.startTower}\"]`);\n                $endTower.removeClass('selectedStartTower');\n                $endTower.addClass('hover-tower');\n                let move = this.game.move(this.startTower, towerNumber);\n                this.startTower = null;\n                if(move == false){\n                    alert('Invalid Move!');\n                }\n            }\n            this.render();\n            if(this.isWon()){\n                setTimeout(()=>{\n                    alert('Game Over -- You Win!');\n                    this.resetGame();\n                }, 100);\n\n            }\n        });\n    }\n    resetGame(){\n        this.game = new Game();\n        this.render();\n    }\n    isWon(){\n        return this.game.isWon();\n    }\n    setupTowers(){\n        const $game = $('<div>').addClass('game');\n        for(let t = 0; t< this.game.towers.length; t++){\n            const $tower = $('<ul>').addClass('tower').addClass(`tower-${t}`).addClass('hover-tower').attr('data-towerNumber', t);\n            for(let d = 0; d < this.game.numDisks; d++){\n                const $discPos = $('<li>').addClass('discPos').attr('data-discPos', d).attr('data-towerNumber', t);\n                    $tower.append($discPos);\n            }\n            $game.append($tower);\n        }\n        this.$el.append($game);\n        let $counter = $('<h3>').addClass('movesCounter').text(`Number of Moves: ${this.game.moves}`);\n        this.$el.append($counter);\n    }\n\n    render(){\n        for(let towerIdx = 0; towerIdx < this.game.towers.length; towerIdx++){\n            let $tower = $(`[data-towerNumber= \"${towerIdx}\"]`);\n            let tower = this.game.towers[towerIdx];\n\n            for(let discIdx = 0; discIdx < this.game.numDisks; discIdx++){\n                let $disc = $(`[data-towerNumber= \"${towerIdx}\"][data-discPos = \"${discIdx}\"]`);\n                if(tower[discIdx] !== undefined){\n                    let discNum = tower[discIdx];\n                    $disc.addClass(`disc-${discNum}`);\n                }\n                else{\n                    $disc.removeClass('disc-0 disc-1 disc-2');\n                }\n            }\n        }\n        $('.movesCounter').text(`Number of Moves: ${this.game.moves}`);\n    }\n}\nmodule.exports = View;\n\n//# sourceURL=webpack:///./src/towers-view.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;