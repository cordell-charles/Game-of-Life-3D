class userControls {
    constructor(game) {
        this.game = game;
        this.world = this.game.world;
        this.settings = this.game.settings;
        this.appearance = this.game.appearance;

        this.gui = new dat.GUI({ autoPlace: true });


        this.nbrsBecomeAliveProbability = 0.5;

        this.projection = {
            isRunning: false, 
            speed: 3
        }

        this.setupAppearanceFolder();
        this.setupProjectionFolder();
        this.ExitControl();
    }



    setupAppearanceFolder() {
        const appearanceControls = this.gui.addFolder("Cells Appearance");

        appearanceControls.add(this.settings.appearance, 'materialOpacity', 0.01, 1).name('Transparency').step(0.01).onChange(() => this.appearance.setMaterialOpacity(this.settings.appearance.materialOpacity));

        appearanceControls.open();
    }


    setupProjectionFolder() {
        const projectionControls = this.gui.addFolder("Projection Options");

        this.stepButton = { step: () => this.game.step() };
        projectionControls.add(this.stepButton, 'step').name("Step");

        projectionControls.add(this.projection, 'isRunning').name('Run').onChange(this.switchProjectionState.bind(this));

        const clearButton = { clear: () => this.game.clear() };
        projectionControls.add(clearButton, 'clear').name("Clear");

        const resetButton = { new:function(){location.href="/3d-projection"}};
        projectionControls.add(resetButton, 'new').name("Reset")


        projectionControls.open();
    }

    switchProjectionState() {
        if(this.projection.isRunning) {
            this.game.run();
        }
        else {
            this.game.stop();
        }
    }

    ExitControl() {

        const exitingControls = this.gui.addFolder("Exit");

        const homeButton = { return:function(){ location.href="/" }};
        exitingControls.add(homeButton,'return').name("Return to Home");


        const gamePageButton = { view:function(){location.href="/game-layout"}};
        exitingControls.add(gamePageButton, 'view').name("Other Games")

        const newGameButton = { own:function(){location.href="/3d-game"}};
        exitingControls.add(newGameButton, 'own').name("Try your own")

        exitingControls.open();
    }

}