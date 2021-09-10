class Settings {
    constructor() {
        this.sceneSettings = {
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0x00008B,
            borderLinesColor: 0x00FFFF,
            ambientLightColor: 0xFFFFFF,
            cellOpacity: 0.5
        }
        
        this.worldSettings = {
            width: 50,
            height: 50,
            depth: 50
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
        
        
        // Any live cell with count of neighbors <= 'underpopulated' dies
        // Any live cell with count of neighbors >= 'overpopulated' dies
        // Any dead cell with count of neighbors == 'born' becomes a live cell
        this.gameSettings = {
            rules: {
                underpopulated: 4, // original: 4
                overpopulated: 12, // Original: 12
                born: 1 // original: 1 or 2
            }
        }

        this.apperanceSettings = {
            showBorderLines: true,
            showNormalMaterial: false,
            materialOpacity: 0.67,
            materialColor: {
                r: 255,
                g: 255,
                b: 255
            }
        }
        
        this.allSettings = {
            world: this.worldSettings,
            scene: this.sceneSettings,
            camera: this.cameraSettings,
            game: this.gameSettings,
            appearance: this.apperanceSettings,
        }
    }
}
