// Function which controls how cells interact with one another
function wireworld_CA(_canvas,width,height) {
	"use strict";
		

	this.Start = function() {
		if (!mIsRunning) {
			mIsRunning = true;
			mIntervalRef = setInterval(update,250);
		}
	}

	this.Stop = function() {
		if (mIntervalRef && mIsRunning === true) {
			clearInterval(mIntervalRef);
			mIsRunning = false;
		}
	}

	this.Reset = function() {
		self.Stop();
		m1DNextLine = 1;
		grid = CopyGrid(mSavedGrid);
		mRenderAction();	
	}

	this.Clear = function() {
		self.Stop();
		grid = CreateGrid(mWidth,mHeight);
		mSavedGrid = CopyGrid(grid);
		mRenderAction();
	}
	
// Other Actions -------------------------------------------------------
	
	this.SetMode = function(mode) {
		mStates = buildWireWorldState();
		mTickAction = wireworldStep;
		mRenderAction = cellStateColour;
		this.Clear();
		mMode = mode.toUpperCase();
	}
	
//----------------------------------------------------------------------

	this.SetRule = function(rule) {
		m1DRule = rule;
	}
	
//----------------------------------------------------------------------

	this.GetRule = function() {
		return m1DRule;
	}

// cell actions --------------------------------------------------------
	this.SetCell = function(x,y,value) {
		if (IsPositionValid(x,y)) {

			grid[y][x] = _value;
			mRenderAction();
		}
	}
//----------------------------------------------------------------------
	this.ToggleCell = function(x,y) {
		if (IsPositionValid(x,y)) {
			
			var count = countStates();
			var nextState = grid[y][x] + 1;
			
			if (nextState > count) {
				grid[y][x] = 0;
			}
			else {
				grid[y][x] = nextState;
			}
			
			mRenderAction();
		}
	}
//----------------------------------------------------------------------
	this.GetCell = function(x,y) {
		if (IsPositionValid(x,y)) {
			
			return grid[y][x]; 
		}
		
		return -1;
	}
	
//----------------------------------------------------------------------

	this.Example = function() {
		wireworldExample();
		mSavedGrid = CopyGrid(grid);
		mRenderAction();
	}
	
	
// Wireworld build example ------------------------------------------------------


	function wireworldExample() {
		var xor = [];
		xor[0] = [0,1,1,1, 1,1,1,3, 2,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0];
		xor[1] = [1,0,0,0, 0,0,0,0, 0,1,1,1, 1,1,1,0, 0,0,0,0, 0,0,0,0];
		xor[2] = [0,1,1,1, 2,3,1,1, 1,0,0,0, 0,0,0,1, 0,0,0,0, 0,0,0,0];
		xor[3] = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,1,1, 1,1,0,0, 0,0,0,0];
		xor[4] = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,1,0, 0,1,1,1, 1,1,1,1];
		xor[5] = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,1,1, 1,1,0,0, 0,0,0,0];
		xor[6] = [0,3,2,1, 1,1,1,3, 2,0,0,0, 0,0,0,1, 0,0,0,0, 0,0,0,0];
		xor[7] = [1,0,0,0, 0,0,0,0, 0,1,1,1, 1,1,1,0, 0,0,0,0, 0,0,0,0];
		xor[8] = [0,1,1,1, 1,1,1,1, 1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0];
		
		var offsetX = Math.floor((gridWidth / 2) - (xor[0].length / 2));
		var offsetY = Math.floor((gridHeight / 2) - (xor.length / 2));
		
		for(var y = 0;y < xor.length;y++) {
			for(var x=0;x < xor[y].length;x++) {
				grid[y + offsetY][x + offsetX] = xor[y][x];
			}
		}
	}
	
//----------------------------------------------------------------------
	
// state list methods --------------------------------------------------
	function getState(state) {
		if (mStates.hasOwnProperty("state" + state)) {

			return mStates["state" + state];
		}
		else {

			return "";
		}
	}
	
	function hasState(state) {
		return mStates.hasOwnProperty("state" + state);
	}
	
	function countStates() {
		var c =1;
		while(mStates.hasOwnProperty("state" + c)) {
			c += 1;
		}
		
		return c;
	}
	
	function buildCGOLState() {
		return {
			"state1":"#000000"
		};
	}
	
	function buildWireWorldState() {
		return {
			"state1":"#FFd728", // Conductor // Wire
			"state2":"#0000FF", //electron head
			"state3":"#FF0000"  //electron tail
		};
	}
	
	
// neigbour counting methods -------------------------------------------
	function mooreNeighbourCount(x,y,_value) {
        var count = 0;

        for (var cy = -1;cy <= 1;cy++) {
            for(var cx = -1;cx <= 1;cx++) {

                var nx = x + cx;
                var ny = y + cy;
               
                if(cy === 0 && cx === 0) {
                    continue;
                }
               
                if(nx >= 0 && ny >= 0) {

                    if(nx < gridWidth && ny < gridHeight) {

                        if(grid[ny][nx] === _value) {
                            count += 1;
                        }   
                    }
                }
            }
        }
        
        return count;
    }
        
//----------------------------------------------------------------------

	function wireworldStep() {
        var tmp = [];
        for (var y=0;y<gridHeight;y++) {

            tmp[y] = [];
            for (var x=0;x<gridWidth;x++) {

                var c = mooreNeighbourCount(x,y,2);
                
                if (grid[y][x] === 2) { //electron head 
					tmp[y][x] = 3;
				}
				else if (grid[y][x] === 3) { //electron tail

					tmp[y][x] = 1;
				}
				else if (grid[y][x] === 1) { //conductor
			
					if (c === 1 || c === 2) {
						tmp[y][x] = 2;
					}
					else {
						tmp[y][x] = 1;
					}
				}
				else {
					tmp[y][x] = 0;
				}
            }
        }
       
        grid = tmp;
    }
    


//----------------------------------------------------------------------  
    function cellStateColour() {

        mContext.fillStyle = "#000000";
        mContext.fillRect(0,0,mWidth,mHeight);
       
        for (var y=0;y<gridHeight;y++) {

            for (var x=0;x<gridWidth;x++) {

                if (hasState(grid[y][x])) {

                    var dx = x * mCellWidth;
                    var dy = y * mCellHeight;
                  
                    mContext.fillStyle = getState(grid[y][x]);
                    mContext.fillRect(dx + 1,dy + 1, mCellWidth - 1, mCellHeight - 1);
                }
            }
        }
    }

//----------------------------------------------------------------------
	function update() {

		mTickAction();
		mRenderAction();
	}
    
//----------------------------------------------------------------------  
    var mTickAction = function() {

		console.log("tick not set");
	}
//----------------------------------------------------------------------
    var mRenderAction = function() {

		console.log("render not set");
	}
//----------------------------------------------------------------------
	var IsPositionValid = function(x,y) {

		if (x >= 0 && x < gridWidth) {

			if (y >= 0 && y < gridHeight) {

				return true;
			}
		}
		
		return false;
	}
//----------------------------------------------------------------------
	var CreateGrid = function(width,height) {
		
		var grid = new Array(height);

		for (var i =0; i < height; i++) {

			grid[i] = new Array(width);
			for (var j=0; j < width;j++) {

				grid[i][j] = 0;
			}
		}
		
		return grid;
	}
//----------------------------------------------------------------------
	var CopyGrid = function(copy) {
		
		var grid = new Array(gridHeight);
		
		for (var i=0;i< gridHeight;i++) {

			grid[i] = new Array(gridWidth);
			for (var j=0;j < gridWidth;j++) {
				grid[i][j] = copy[i][j];
			}
		}
		
		return grid;
	}

//mouse actions --------------------------------------------------------
	var moveMouse = function(event) {
		if (!mIsRunning) {
			
			var actualWidth = mCanvas.getBoundingClientRect().width;
		
			var pX = Math.floor(event.offsetX / mCellWidth);
			var pY = Math.floor(event.offsetY / mCellHeight);
			
			if (mWidth > actualWidth) {

				var scaledMouse = event.offsetX / (actualWidth / mWidth);
				pX = Math.floor(scaledMouse / mCellWidth );
				
				scaledMouse =  event.offsetY / (mCanvas.getBoundingClientRect().height / mHeight);
				pY = Math.floor(scaledMouse / mCellHeight);
			}
			
			if (IsPositionValid(pX,pY)) {
				mMouseX = pX;
				mMouseY = pY;
				mRenderAction();
				mouseRender();
			}
		}
	}
//----------------------------------------------------------------------
	var mouseClick = function(event) {
		if (!mIsRunning) {

			self.ToggleCell(mMouseX,mMouseY);
			mSavedGrid = CopyGrid(grid);
		}
		
		return false; //prevent bubbling
	}
//----------------------------------------------------------------------
	var mouseRender = function() {
		if (IsPositionValid(mMouseX,mMouseY)) {

			var dx = mMouseX * mCellWidth;
			var dy = mMouseY * mCellHeight;
		  
			mContext.strokeStyle = "rgba(5, 56, 107, 1)";
			mContext.strokeRect(dx + 2,dy + 2, mCellWidth - 2, mCellHeight - 2);
		}
	}	

// initalise ----------------------------------------------------------------
	
	var self = this;
	var mCanvas = _canvas;
	var mContext = mCanvas.getContext("2d");
	var gridWidth = width;
	var gridHeight = height;
	var grid = CreateGrid(gridWidth,gridHeight);
	var mSavedGrid = CopyGrid(grid);
	var mIntervalRef = null;
	
	var mWidth = parseInt(mCanvas.getAttribute("width"));
	var mHeight = parseInt(mCanvas.getAttribute("height"));
	
	var mCellWidth = mWidth / gridWidth;
    var mCellHeight = mHeight / gridHeight;
    
    var mStates = buildCGOLState();
    
    var mMouseX = -1;
    var mMouseY = -1;
    
    var mIsRunning = false;
    
    
    var mMode = "CGOL";
    this.SetMode(mMode);
    
    //1D specific variables
    var m1DRule = 105;
    var m1DNextLine = 1;
	
	mCanvas.onmousemove  = moveMouse;
	mCanvas.onmouseup = mouseClick;
}




// Implementation of wireworld CA which by connecting with HTML


pageEvents.RegisterEvent("onload",function() {

	// Variable previously JC_INST__.CA
	game = new wireworld_CA(document.getElementById("canvas"),100,80);
				
	//User input button commands
	document.getElementById("Start").onclick = function() {
		game.Start();
	};
	
	document.getElementById("Stop").onclick = function() {
		game.Stop();
	};
	
	document.getElementById("Clear").onclick = function() {
		game.Clear();
	};
	
	document.getElementById("Reset").onclick = function() {
		game.Reset();	
	};
	
	document.getElementById("Example").onclick = function() {
		game.Example();
	};
	
});
