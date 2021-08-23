class World {
    constructor(width, height, depth) {
        this.width = width; // x
        this.height = height; // y
        this.depth = depth; // z
        this.center = {
            x: Math.floor(width / 2),
            y: Math.floor(height / 2),
            z: Math.floor(depth / 2)
        };
        this.cells = [];

        for(let i = 0; i < height * width * depth; i++) {
            let x = Math.floor(i % height);
            let y = Math.floor(( i / height ) % width);
            let z = Math.floor(i / ( height * width ));
            this.cells[i] = new Cell(i, x, y, z);    
        }
    }

    getCellNeighbors(cell) {
        const n000100 = this.getCellByCoords(cell.position.x,      cell.position.y + 1,  cell.position.z);
        const n000101 = this.getCellByCoords(cell.position.x,      cell.position.y + 1,  cell.position.z + 1);
        const n000111 = this.getCellByCoords(cell.position.x,      cell.position.y + 1,  cell.position.z - 1);
        const n010100 = this.getCellByCoords(cell.position.x + 1,  cell.position.y + 1,  cell.position.z);
        const n010101 = this.getCellByCoords(cell.position.x + 1,  cell.position.y + 1,  cell.position.z + 1)
        const n010111 = this.getCellByCoords(cell.position.x + 1,  cell.position.y + 1,  cell.position.z - 1)
        const n110100 = this.getCellByCoords(cell.position.x - 1,  cell.position.y + 1,  cell.position.z);
        const n110101 = this.getCellByCoords(cell.position.x - 1,  cell.position.y + 1,  cell.position.z + 1)
        const n110111 = this.getCellByCoords(cell.position.x - 1,  cell.position.y + 1,  cell.position.z - 1)

        const n001100 = this.getCellByCoords(cell.position.x,      cell.position.y - 1,  cell.position.z);
        const n001101 = this.getCellByCoords(cell.position.x,      cell.position.y - 1,  cell.position.z + 1);
        const n001111 = this.getCellByCoords(cell.position.x,      cell.position.y - 1,  cell.position.z - 1);
        const n011100 = this.getCellByCoords(cell.position.x + 1,  cell.position.y - 1,  cell.position.z);
        const n011101 = this.getCellByCoords(cell.position.x + 1,  cell.position.y - 1,  cell.position.z + 1);
        const n011111 = this.getCellByCoords(cell.position.x + 1,  cell.position.y - 1,  cell.position.z - 1);
        const n111100 = this.getCellByCoords(cell.position.x - 1,  cell.position.y - 1,  cell.position.z);
        const n111101 = this.getCellByCoords(cell.position.x - 1,  cell.position.y - 1,  cell.position.z + 1);
        const n111111 = this.getCellByCoords(cell.position.x - 1,  cell.position.y - 1,  cell.position.z - 1);

        const n000001 = this.getCellByCoords(cell.position.x,      cell.position.y,       cell.position.z + 1);
        const n000011 = this.getCellByCoords(cell.position.x,      cell.position.y,       cell.position.z - 1);
        const n010000 = this.getCellByCoords(cell.position.x + 1,  cell.position.y,       cell.position.z);
        const n010001 = this.getCellByCoords(cell.position.x + 1,  cell.position.y,       cell.position.z + 1);
        const n010011 = this.getCellByCoords(cell.position.x + 1,  cell.position.y,       cell.position.z - 1);
        const n110000 = this.getCellByCoords(cell.position.x - 1,  cell.position.y,       cell.position.z);
        const n110001 = this.getCellByCoords(cell.position.x - 1,  cell.position.y,       cell.position.z + 1);
        const n110011 = this.getCellByCoords(cell.position.x - 1,  cell.position.y,       cell.position.z - 1);

        return [
            n000100, n000101, n000111, n010100, n010101, n010111, n110100, n110101, n110111,
            n001100, n001101, n001111, n011100, n011101, n011111, n111100, n111101, n111111,
            n000001, n000011, n010000, n010001, n010011, n110000, n110001, n110011
        ];
    }

    getCellByCoords(x, y, z) {
        return this.cells[x + y * this.width + z * this.width * this.height];
    }
}





class WorldSerializer {
    constructor(game) {
        this.game = game;
        this.world = this.game.world;
    }

    serialize() {
        return JSON.stringify(this.worldToArrayOfAliveCells(this.world));
    }

    deserialize(jsonStringOfAliveCells) {
        const aliveCellsIndexes = JSON.parse(jsonStringOfAliveCells);
        this.arrayOfLifeCellsToWorld(aliveCellsIndexes);
        this.game.updateCubesVisibility();
    }

    worldToArrayOfAliveCells() {
        let aliveCellsIndexes = [];
        this.world.cells.forEach(cell => {
            if(cell.isAlive)
                aliveCellsIndexes.push(cell.index);
        });

        return aliveCellsIndexes;
    }

    arrayOfLifeCellsToWorld(aliveCellsIndexes) {
        this.game.clear();
        
        aliveCellsIndexes.forEach(cellIndex => {
            this.world.cells[cellIndex].isAlive = true;
        });
    }
}



class FileIO {
    constructor(worldSerializer) {
        this.reader = new FileReader();
        this.worldSerializer = worldSerializer;

        this.fileInput = document.createElement("input");
        this.fileInput.setAttribute("type","file");

        this.reader.onload = (e) => {
            const content = e.target.result;
            this.worldSerializer.deserialize(content);

            this.fileInput.value = '';
        };

        this.fileInput.addEventListener('change', this.readFile.bind(this), false);
    }

    static saveAs(data, filename) {
        var pom = document.createElement('a');
        pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
        pom.setAttribute('download', filename);
    
        if (document.createEvent) {
            var event = document.createEvent('MouseEvents');
            event.initEvent('click', true, true);
            pom.dispatchEvent(event);
        }
        else {
            pom.click();
        }
    }

    open() {
        this.fileInput.click();
    }

    readFile(e) {
        var file = e.target.files[0];

        if (!file) 
          return;

        this.reader.readAsText(file);
    }
}