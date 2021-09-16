class userControls {
    constructor(game) {
        this.game = game;
        this.controller = this.game.controller;
        this.world = this.game.world;
        this.settings = this.game.settings;
        this.appearance = this.game.appearance;

        this.gui = new dat.GUI({ autoPlace: true });

        this.cursorPosition = {
            x: this.controller.cursor.position.x,
            y: this.controller.cursor.position.y,
            z: this.controller.cursor.position.z,
        }

        this.nbrsBecomeAliveProbability = 0.5;

        this.projection = {
            isRunning: false, 
            speed: 2
        }

        this.gameRules = {
            underpopulated: game.rules.underpopulated,
            overpopulated: game.rules.overpopulated,
            born: game.rules.born
        }

        this.setupCursorFolder();
        this.setupAppearanceFolder();
        this.setupProjectionFolder();
        this.setupRulesFolder();
        this.ExitControl();
    }

    setupCursorFolder() {
        const cursorControls = this.gui.addFolder("Cursor")
        cursorControls.add(this.cursorPosition, 'x', 0, this.world.width - 1).name('X').step(1).onChange(this.updateCursorPosition.bind(this));
        cursorControls.add(this.cursorPosition, 'y', 0, this.world.width - 1).name('Y').step(1).onChange(this.updateCursorPosition.bind(this));
        cursorControls.add(this.cursorPosition, 'z', 0, this.world.width - 1).name('Z').step(1).onChange(this.updateCursorPosition.bind(this));

        const toggleButton = { toggle: () => { 
            this.game.toggleCellAtCoords((this.controller.cursor.position)); 
        }};
        cursorControls.add(toggleButton, 'toggle').name("Toggle Cell");
        cursorControls.open();

    }
    
    updateCursorPosition() {
        this.controller.setCursorPosition(this.cursorPosition.x, this.cursorPosition.y, this.cursorPosition.z);
    }

    toggleCell() {
        this.game.toggleCellAtCoords(this.cursor.position); 
    }


    setupAppearanceFolder() {
        const appearanceControls = this.gui.addFolder("Cells Appearance");

        appearanceControls.add(this.settings.appearance, 'materialOpacity', 0.01, 1).name('Transparency').step(0.01).onChange(() => this.appearance.setMaterialOpacity(this.settings.appearance.materialOpacity));
        appearanceControls.addColor(this.settings.appearance, 'materialColor').name('Colour').onChange(() => this.appearance.setCubesMaterialColor(this.settings.appearance.materialColor));

        appearanceControls.open();
    }


    setupProjectionFolder() {
        const projectionControls = this.gui.addFolder("Projection");

        this.stepButton = { step: () => this.game.step() };
        projectionControls.add(this.stepButton, 'step').name("Step");

        projectionControls.add(this.projection, 'speed', 0.5, 4).name('Speed').step(0.5).onChange(this.setProjectionSpeed.bind(this));
        projectionControls.add(this.projection, 'isRunning').name('Run').onChange(this.switchProjectionState.bind(this));
        
        const rotateButton = { rotate: () => this.game.rotate() };
        projectionControls.add(rotateButton, 'rotate').name("Rotatation");


        const clearButton = { clear: () => this.game.clear() };
        projectionControls.add(clearButton, 'clear').name("Clear");

        const viewDemo = { demo:function(){location.href="/3d-projection"}};
        projectionControls.add(viewDemo, 'demo').name("View Demo Projection")

        projectionControls.open();
    }

    switchProjectionState() {
        if(this.projection.isRunning)
            this.game.run();
        else
            this.game.stop();
    }

    setProjectionSpeed() {
        this.game.setProjectionSpeed(this.projection.speed);
    }

    setupRulesFolder() {
        const rulesControls = this.gui.addFolder("Rules");
        rulesControls.add(this.gameRules, 'underpopulated', 0, 26).name('Underpopulation').step(1).onChange(this.changeRules.bind(this));
        rulesControls.add(this.gameRules, 'overpopulated', 0, 26).name('Overpopulation').step(1).onChange(this.changeRules.bind(this));
        rulesControls.add(this.gameRules, 'born', 0, 26).name('Born').step(1).onChange(this.changeRules.bind(this));

        rulesControls.open();
    }

    changeRules() {
        this.game.rules = this.gameRules;
    }

    ExitControl() {

        const exitingControls = this.gui.addFolder("Exit");

        const homeButton = { return:function(){ location.href="/" }};
        exitingControls.add(homeButton,'return').name("Return to Home");


        const gamePageButton = { view:function(){location.href="/game-layout"}};
        exitingControls.add(gamePageButton, 'view').name("Other Games")

    }

}