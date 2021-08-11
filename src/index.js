const View = require('./towers-view.js');
const Game = require('./game.js');
$(() => {
  const rootEl = $('.view-figure');
  const game = new Game();
  const view = new View(rootEl, game);

});
