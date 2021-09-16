class SceneManager {
    constructor(sceneSettings, cameraSettings) {
        this.sceneSettings = sceneSettings;
        this.cameraSettings = cameraSettings;

        this.createScene();
        this.createRenderer();
        this.createCamera();
        this.animate();

        this.y_angle = 0.0;
        this.auto_rotate = false;

        window.addEventListener( 'resize', this.onWindowResize.bind(this), false );
    }

    createScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(this.sceneSettings.backgroundColor);
    }

    createRenderer() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( this.sceneSettings.width, this.sceneSettings.height );
        window.document.body.appendChild( this.renderer.domElement );
    }

    createCamera() {
        this.camera = new THREE.PerspectiveCamera( 
            this.cameraSettings.fov, 
            this.sceneSettings.width / this.sceneSettings.height, 
            this.cameraSettings.nearClip, 
            this.cameraSettings.farClip
        );
        this.camera.position.set(this.cameraSettings.position.x, this.cameraSettings.position.y, this.cameraSettings.position.z);  
    }

    addLight(position, color, intensity) {
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(position.x, position.y, position.z);
        this.scene.add(light);
    }

    addColouredLight(color) {
        const light = new THREE.AmbientLight(color);
        this.scene.add(light);
    }


    addMesh(geometry, material, position, isVisible) {
        const mesh = new THREE.Mesh( geometry, material );
        mesh.position.x = position.x;
        mesh.position.y = position.y;
        mesh.position.z = position.z;
        mesh.visible = isVisible;
        this.scene.add(mesh);

        return mesh;
    }

    drawLine(startPosition, endPosition, material) {
        const points = [];
        points.push( new THREE.Vector3( startPosition.x, startPosition.y, startPosition.z ));
        points.push( new THREE.Vector3( endPosition.x, endPosition.y, endPosition.z ));

        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, material);
        this.scene.add(line);

        return line;
    }

    rotate() {
        //this.scene.position.x = -25.0;
        //this.scene.position.y = -25.0;
        //this.scene.position.z = -25.0;
        //this.scene.position.x = 0;
        //this.scene.position.Y = 0;
        //this.scene.position.Z = 0;
        //this.scene.modelViewMatrix.makeTranslation(-25,-25,-25);
        if (this.auto_rotate) {
            this.y_angle += 0.1;
            if (this.y_angle > 360) {
                this.y_angle -= 360;
            }
            this.scene.rotation.y = this.y_angle;
        }
    }


    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.rotate();
        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize(){
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
    }
}