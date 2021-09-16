const settings = new Settings();
const game = new Game(settings);

game.randomizeNeighbors(game.world.center, 1);

const gui = new userControls(game);

var control = new THREE.OrbitControls( game.sceneManager.camera, game.sceneManager.renderer.domElement );
//control.target.set(25.0,25.0, 25.0);

var GUIContainer = document.getElementById('gui-container');

