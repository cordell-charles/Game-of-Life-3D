class Cell {

    constructor(index, x, y, z) {
        this.index = index;
        this.position = {x: x, y: y, z: z};
        this.isAlive = false;
        this.willDie = false;
        this.isBorn = false;
    }

    born() {
        this.isAlive = true;
        return this;
    }

    die() {
        this.isAlive = false;
        return this;
    }

    toggle() {
        this.isAlive = !this.isAlive;
        return this;
    }
}


class cellAppearance {
    constructor(game) {
        // This class defines the structure, drawing and material of the game space.
        this.game = game;
        this.sceneManager = this.game.sceneManager;
        this.settings = this.game.settings;

        this.cellMaterial = new THREE.MeshPhongMaterial({ opacity: this.settings.scene.cellOpacity, transparent: true });
        this.cellNormalMaterial = new THREE.MeshNormalMaterial({ opacity: this.settings.scene.cellOpacity, transparent: true });

        this.cubeBorderMaterial = new THREE.LineBasicMaterial( { color: this.game.settings.scene.cubeBorderColor } );
        this.cubeSpaceLines();

        this.showcubeBorder(this.settings.appearance.showcubeBorder);

        this.selectedMaterial = null;
        this.showCubesNormalMaterial(this.settings.appearance.showNormalMaterial);

        this.setMaterialOpacity(this.settings.appearance.materialOpacity);
        this.setCubesMaterialColor(this.settings.appearance.materialColor);
    }
    

    cubeSpaceLines() {
        const world = this.settings.world;

        const a = { x: 0,            y:0,             z: 0 };
        const b = { x: world.width,  y:0,             z: 0 };
        const c = { x: 0,            y:world.height,  z: 0 };
        const d = { x: world.height, y:world.height,  z: 0 };
        const h = { x: 0,            y:0,             z: world.depth };
        const g = { x: world.width,  y:0,             z: world.depth };
        const e = { x: 0,            y:world.height,  z: world.depth };
        const f = { x: world.height, y:world.height,  z: world.depth };

        this.cubeBorder = [];
        this.cubeBorder.push(this.sceneManager.drawLine(a, b, this.cubeBorderMaterial));
        this.cubeBorder.push(this.sceneManager.drawLine(b, d, this.cubeBorderMaterial));
        this.cubeBorder.push(this.sceneManager.drawLine(d, c, this.cubeBorderMaterial));
        this.cubeBorder.push(this.sceneManager.drawLine(c, a, this.cubeBorderMaterial));

        this.cubeBorder.push(this.sceneManager.drawLine(h, g, this.cubeBorderMaterial));
        this.cubeBorder.push(this.sceneManager.drawLine(g, f, this.cubeBorderMaterial));
        this.cubeBorder.push(this.sceneManager.drawLine(f, e, this.cubeBorderMaterial));
        this.cubeBorder.push(this.sceneManager.drawLine(e, h, this.cubeBorderMaterial));

        this.cubeBorder.push(this.sceneManager.drawLine(a, h, this.cubeBorderMaterial));
        this.cubeBorder.push(this.sceneManager.drawLine(b, g, this.cubeBorderMaterial));
        this.cubeBorder.push(this.sceneManager.drawLine(c, e, this.cubeBorderMaterial));
        this.cubeBorder.push(this.sceneManager.drawLine(d, f, this.cubeBorderMaterial));
    }

    showcubeBorder(show) {
        this.cubeBorder.forEach(b => {
            b.visible = show;
        });
    }

    showCubesNormalMaterial(show) {
        if(show)
            this.setCubesMaterial(this.cellNormalMaterial);
        else
            this.setCubesMaterial(this.cellMaterial);
    }

    setCubesMaterial(material) {
        this.selectedMaterial = material;
        this.game.cubes.forEach(c => { c.material = this.selectedMaterial });
    }

    setMaterialOpacity(opacity) {
        if(opacity < 0.0 || opacity > 1.0)
            return;

        this.cellMaterial.opacity = opacity;
        this.cellNormalMaterial.opacity = opacity;
    }

    setCubesMaterialColor(color) {
        this.cellMaterial.color.setRGB(color.r / 255, color.g / 255, color.b / 255);
    }
}





class Game {
    constructor(settings) {
        this.settings = settings.allSettings;
        this.rules = this.settings.game.rules;

        this.boxGeometry = new THREE.BoxGeometry();

        this.world = new World(this.settings.world.width, this.settings.world.height, this.settings.world.depth);
        this.sceneManager = new SceneManager(this.settings.scene, this.settings.camera)
        this.controller = new Controller(this);

        this.cubes = [];
        this.appearance = new cellAppearance(this);

        this.populateWorld();

        //this.sceneManager.addAmbientLight(this.settings.scene.ambientLightColor);
        this.sceneManager.addLight({x:-1, y: 2, z: 4}, 0xFFFFFF, 1);
        this.sceneManager.addLight({x: 1, y:-1, z:-2}, 0xFFFFFF, 1);

        this.isRunning = false;
        this.simulationSpeed = 1; // 1 = one step per second
        this.timers = [];
    }

    populateWorld() {
        this.world.cells.forEach(c => {
            if(c != undefined) {
                let cube = this.sceneManager.addMesh(this.boxGeometry, this.appearance.selectedMaterial, c.position, c.isAlive)
                this.cubes.push(cube);
            }
        });
    }
 
    randomizeNeighbors(position, probability) {
        const centerCell = this.world.getCellByCoords(position.x, position.y, position.z);
        const neighbors = this.world.getCellNeighbors(centerCell);
        neighbors.forEach(n => {
            if(Math.random() >= 1.0 - probability && n != undefined) 
                n.born();
            else
                n.die();
        });

        this.setCellStates();
    }

    step() {
        this.applyRules();
        this.setCellStates();
    }

    run() {
        // first stop and remove all previous intervals
        stop();

        // now set the new one
        this.timers.push(setInterval(this.step.bind(this), 1000 / this.simulationSpeed));
        this.isRunning = true;
    }

    stop() {
        if(!this.isRunning)
            return;

        this.timers.forEach(t => {
            clearInterval(t);
        });

        this.timers = [];
        this.isRunning = false;
    }

    setSimulationSpeed(speed) {
        if(this.isRunning) {
            this.stop();
            this.simulationSpeed = speed;
            this.run();
            
            return;
        }

        this.simulationSpeed = speed;
    }

    applyRules() {
        for(let i = 0; i < this.world.cells.length; i++) {
            const cell = this.world.cells[i];
            let aliveNeighbors = this.countAliveNeighbors(cell);
    
            if(cell.isAlive) 
            {
                if(aliveNeighbors <= this.rules.underpopulated) {
                    cell.willDie = true;
                    continue;
                }
                else if(aliveNeighbors >= this.rules.overpopulated) {
                    cell.willDie = true;
                    continue;
                }
            }
            else if(!cell.isAlive) 
            {
                if(aliveNeighbors == this.rules.ideal)
                    cell.isBorn = true;
                    continue
            }
        }
    }

    countAliveNeighbors(cell) {
        const neighbors = this.world.getCellNeighbors(cell);
        let counter = 0;
        neighbors.forEach(n => {
            if(n != undefined) {
                if(n.isAlive)
                counter++;
            }
        });
        return counter;
    }

    setCellStates() {
        for(let i = 0; i < this.world.cells.length; i++) {
            const cell = this.world.cells[i];
            if(cell.willDie && cell.isAlive) {
                cell.die();
            }
            if (cell.isBorn && !cell.isAlive) {
                cell.born();
            }
    
            this.cubes[i].visible = cell.isAlive;
    
            cell.isBorn = false;
            cell.willDie = false;
        }
    }

    updateCubesVisibility() {
        for(let i = 0; i < this.world.cells.length; i++) {
            const cell = this.world.cells[i]; 
            this.cubes[i].visible = cell.isAlive;
        }
    }

    toggleCellAtCoords(position) {
        const cell = this.world.getCellByCoords(position.x, position.y, position.z).toggle();
        this.cubes[cell.index].visible = cell.isAlive;
    }

    clear() {
        this.world.cells.forEach(c => {
            c.isAlive = false;
            this.cubes[c.index].visible = c.isAlive;
        });
    }
}