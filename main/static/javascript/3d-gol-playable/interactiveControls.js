class Controller {
    constructor(game) {
        this.game = game;

        this.createCursor();

    }

    createCursor() {
        this.cursorMaterial = new THREE.MeshPhongMaterial({ 
            color: this.game.settings.controller.cursor.color, 
            opacity: this.game.settings.controller.cursor.opacity, 
            transparent: true 
        });  
    
        this.worldCenter = {
            x: this.game.world.center.x,
            y: this.game.world.center.y,
            z: this.game.world.center.z
        };

        this.cursor = {
            position: this.game.world.center,
            isVisible: this.game.settings.controller.cursor.isVisible
        };

        this.cursorCube = this.game.sceneManager.addMesh(this.game.boxGeometry, this.cursorMaterial, this.cursor.position, this.cursor.isVisible);

        this.guiVisibility;
    }

    resetCursorPosition() {
        this.setCursorPosition(this.worldCenter.x, this.worldCenter.y, this.worldCenter.z);
    }

    moveCursor(x, y, z) {
        if(!this.validAgainstWorldBoundaries(x, y, z)) 
            return;

        this.cursor.position.x += x; 
        this.cursor.position.y += y;
        this.cursor.position.z += z;

        this.updateCursorCubePosition();
    }

    setCursorPosition(x, y, z) {
        this.cursor.position.x = x;
        this.cursor.position.y = y;
        this.cursor.position.z = z;

        this.updateCursorCubePosition();
    }

    updateCursorCubePosition() {
        this.cursorCube.position.x = this.cursor.position.x;
        this.cursorCube.position.y = this.cursor.position.y;
        this.cursorCube.position.z = this.cursor.position.z;
    }

    validAgainstWorldBoundaries(x, y, z) {
        const finalPosition = {
            x: this.cursor.position.x + x,
            y: this.cursor.position.y + y,
            z: this.cursor.position.z + z,
        }

        const world = this.game.settings.world;

        if(finalPosition.x < 0 || finalPosition.x >= world.width ||
           finalPosition.y < 0 || finalPosition.y >= world.height ||
           finalPosition.z < 0 || finalPosition.z >= world.depth)
           return false;

        return true;
    }

    toggleCursorVisibility() {
        this.cursor.isVisible = !this.cursor.isVisible;
        this.cursorCube.visible = this.cursor.isVisible;
    }

    toggleGuiVisibility() {
        this.guiVisibility = !this.guiVisibility;

        const gui = document.getElementsByClassName("dg ac");
        if(this.guiVisibility)
            gui[0].style.visibility = 'hidden';
        else 
            gui[0].style.visibility = 'unset';
    }
}