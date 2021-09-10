class Settings {
    constructor() {
        this.sceneSettings = {
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0x000000,
            borderLinesColor: 0x00FFFF,
            ambientLightColor: 0x00FFFF,
            cellOpacity: 0.5
        }
        
        this.worldSettings = {
            width: 46,
            height: 46,
            depth: 46
        }
        
        this.cameraSettings = {
            fov: 75,
            position: {
                x: this.worldSettings.width * 1.5,
                y: this.worldSettings.height * 1.5,
                z: this.worldSettings.depth * 1.5,
            },
            nearClip: 0.1,
            farClip: 1000
        }
        
        this.controllerSettings = {
            cursor: {
                color:0xFFFFFF,
                opacity: 0.5,
                isVisible: true
            }
        }
        
        // Any live cell with count of neighbors <= 'underpopulated' dies
        // Any live cell with count of neighbors >= 'overpopulated' dies
        // Any dead cell with count of neighbors == 'born' becomes a live cell
        this.gameSettings = {
            rules: {
                underpopulated: 2,
                overpopulated: 8,
                born: 1
            }
        }

        this.apperanceSettings = {
            showBorderLines: true,
            showNormalMaterial: false,
            materialOpacity: 0.67,
            materialColor: {
                r: 255, //Originally 255
                g: 255,
                b: 255
            }
        }
        
        this.allSettings = {
            world: this.worldSettings,
            scene: this.sceneSettings,
            camera: this.cameraSettings,
            controller: this.controllerSettings,
            game: this.gameSettings,
            appearance: this.apperanceSettings,
        }
    }
}
