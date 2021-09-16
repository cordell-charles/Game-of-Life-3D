class cell {

    constructor(width, height, depth) {
        this.width = width; // x-axis
        this.height = height; // y-axis
        this.depth = depth; // z-axis
        
        this.center = {
            /*
            x: Math.floor(width / 2),
            y: Math.floor(height / 2),
            z: Math.floor(depth / 2)
            */
            
            x: 0,
            y: 0,
            z: 0
            
            
        };

        this.cells = [];

        for(var i = 0; i < height * width * depth; i++) {

            var x = Math.floor(i % height);
            var y = Math.floor(( i / height ) % width);
            var z = Math.floor(i / ( height * width ));

            this.cells[i] = new Cell(i, x, y, z);    
        }
    }


    getCellNeighbors(cell) {
        const cell1 = this.getCellPosition(cell.position.x,cell.position.y + 1,cell.position.z);
        const cell2 = this.getCellPosition(cell.position.x,cell.position.y + 1,cell.position.z + 1);
        const cell3 = this.getCellPosition(cell.position.x,cell.position.y + 1,cell.position.z - 1);
        const cell4 = this.getCellPosition(cell.position.x + 1,cell.position.y + 1,cell.position.z);
        const cell5 = this.getCellPosition(cell.position.x + 1,cell.position.y + 1,cell.position.z + 1)
        const cell6 = this.getCellPosition(cell.position.x + 1,cell.position.y + 1,cell.position.z - 1)
        const cell7 = this.getCellPosition(cell.position.x - 1,cell.position.y + 1,cell.position.z);
        const cell8 = this.getCellPosition(cell.position.x - 1,cell.position.y + 1,cell.position.z + 1)
        const cell9 = this.getCellPosition(cell.position.x - 1,cell.position.y + 1,cell.position.z - 1)
        const cell10 = this.getCellPosition(cell.position.x,cell.position.y,cell.position.z - 1);
        const cell11 = this.getCellPosition(cell.position.x + 1,cell.position.y,cell.position.z);
        const cell12 = this.getCellPosition(cell.position.x + 1,cell.position.y,cell.position.z + 1);
        const cell13 = this.getCellPosition(cell.position.x + 1,cell.position.y,cell.position.z - 1);
        const cell14 = this.getCellPosition(cell.position.x - 1,cell.position.y,cell.position.z);
        const cell15 = this.getCellPosition(cell.position.x - 1,cell.position.y,cell.position.z + 1);
        const cell16 = this.getCellPosition(cell.position.x - 1,cell.position.y,cell.position.z - 1);
        const cell17 = this.getCellPosition(cell.position.x,cell.position.y - 1,cell.position.z);
        const cell18 = this.getCellPosition(cell.position.x,cell.position.y - 1,cell.position.z + 1);
        const cell19 = this.getCellPosition(cell.position.x,cell.position.y - 1,cell.position.z - 1);
        const cell20 = this.getCellPosition(cell.position.x + 1,cell.position.y - 1,cell.position.z);
        const cell21 = this.getCellPosition(cell.position.x + 1,cell.position.y - 1,cell.position.z + 1);
        const cell22 = this.getCellPosition(cell.position.x + 1,cell.position.y - 1,cell.position.z - 1);
        const cell23 = this.getCellPosition(cell.position.x - 1,cell.position.y - 1,cell.position.z);
        const cell24 = this.getCellPosition(cell.position.x - 1,cell.position.y - 1,cell.position.z + 1);
        const cell25 = this.getCellPosition(cell.position.x - 1,cell.position.y - 1,cell.position.z - 1);
        const cell26 = this.getCellPosition(cell.position.x,cell.position.y,cell.position.z + 1);


        return [ 
                cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, cell9, cell10, 
                cell11, cell12, cell13, cell14, cell15, cell16, cell17,cell18, 
                cell19, cell20, cell21, cell22, cell23, cell24, cell25, cell26
            ];
    }

    getCellPosition(x, y, z) {
        return this.cells[(x+25) + (y+25) * this.width + (z+25) * this.width * this.height];
    }
}
