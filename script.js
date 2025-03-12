const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = function () {
    const scene = new BABYLON.Scene(engine);

	//const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 5, new BABYLON.Vector3(0, 0, 0), scene);

    const camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 1, 0), scene);
	camera.angularSensibilityX = 2000; // ערך גבוה יותר = תנועה איטית יותר
	camera.angularSensibilityY = 2000; // ערך גבוה יותר = תנועה איטית יותר
    camera.attachControl(canvas, true);
    camera.setTarget(new BABYLON.Vector3(0, 1, 1));
	camera.speed = 0.2

    // תאורה
    const light = new BABYLON.PointLight("light", new BABYLON.Vector3(0, 5, 0), scene);
    light.intensity = 0.7;

    // טקסטורה לקירות
    const wallTexture = new BABYLON.Texture("https://upload.wikimedia.org/wikipedia/he/thumb/5/54/P6100222.JPG/320px-P6100222.JPG", scene); // החלף בנתיב לטקסטורה שלך
    wallTexture.uScale = 4;
    wallTexture.vScale = 4;

    const wallMaterial = new BABYLON.StandardMaterial("wallMaterial", scene);
    wallMaterial.diffuseTexture = wallTexture;

    // יצירת חדר
    const roomSize = 10;

    const floor = BABYLON.MeshBuilder.CreatePlane("floor", { size: roomSize }, scene);
    floor.rotation.x = Math.PI / 2;
    floor.material = new BABYLON.StandardMaterial("floorMaterial", scene);
    floor.material.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5); // צבע רצפה

    const ceiling = BABYLON.MeshBuilder.CreatePlane("ceiling", { size: roomSize }, scene);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = roomSize;
    ceiling.material = new BABYLON.StandardMaterial("ceilingMaterial", scene);
    ceiling.material.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5); // צבע תקרה

    const wall1 = BABYLON.MeshBuilder.CreatePlane("wall1", { width: roomSize, height: roomSize }, scene);
    wall1.position.z = roomSize / 2;
    wall1.position.y = roomSize / 2;
    wall1.material = wallMaterial;

    const wall2 = BABYLON.MeshBuilder.CreatePlane("wall2", { width: roomSize, height: roomSize }, scene);
    wall2.rotation.y = Math.PI;
    wall2.position.z = -roomSize / 2;
    wall2.position.y = roomSize / 2;
    wall2.material = wallMaterial;

    const wall3 = BABYLON.MeshBuilder.CreatePlane("wall3", { width: roomSize, height: roomSize }, scene);
    wall3.rotation.y = Math.PI / 2;
    wall3.position.x = roomSize / 2;
    wall3.position.y = roomSize / 2;
    wall3.material = wallMaterial;

    const wall4 = BABYLON.MeshBuilder.CreatePlane("wall4", { width: roomSize, height: roomSize }, scene);
    wall4.rotation.y = -Math.PI / 2;
    wall4.position.x = -roomSize / 2;
    wall4.position.y = roomSize / 2;
    wall4.material = wallMaterial;

    // תנועת מצלמה ובדיקת גבולות (ללא שינוי)
    const moveSpeed = 0.1;
    let moveDirection = new BABYLON.Vector3(0, 0, 0);

    scene.onBeforeRenderObservable.add(() => {
        camera.position.addInPlace(moveDirection);

        if (camera.position.x > roomSize / 2 - 1) camera.position.x = roomSize / 2 - 1;
        if (camera.position.x < -roomSize / 2 + 1) camera.position.x = -roomSize / 2 + 1;
        if (camera.position.z > roomSize / 2 - 1) camera.position.z = roomSize / 2 - 1;
        if (camera.position.z < -roomSize / 2 + 1) camera.position.z = -roomSize / 2 + 1;
        if (camera.position.y < 1) camera.position.y = 1;
        if (camera.position.y > roomSize - 1) camera.position.y = roomSize - 1;

        moveDirection.scaleInPlace(0.9);
		//console.log(camera.position)
    });

	/*
    // טיפול בקלט (ללא שינוי)
    document.addEventListener('keydown', (event) => {
        switch (event.code) {
            case 'ArrowUp':
                moveDirection.z = moveSpeed;
                break;
            case 'ArrowDown':
                moveDirection.z = -moveSpeed;
                break;
            case 'ArrowLeft':
                moveDirection.x = -moveSpeed;
                break;
            case 'ArrowRight':
                moveDirection.x = moveSpeed;
                break;
        }
    });
	*/

    return scene;
};

const scene = createScene();

engine.runRenderLoop(() => {
    scene.render();
});

window.addEventListener('resize', () => {
    engine.resize();
});