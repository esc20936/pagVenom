/* eslint-disable no-console */
/* eslint-disable no-undef */
import React from "react";
import ReactDom from "react-dom";
import * as THREE from "three";
import "./index.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Vector3 } from "three";
import Canvas from "./componentes/canvas";
import venom from "./assets/models/Venom6.glb";

function createCanvas() {
  const canvas = document.querySelector(".webgl-canvas");
  return canvas;
}

function loadModel(model, SCENE) {
  const loader = new GLTFLoader();
  let maqueta = "";
  loader.load(
    "./assets/models/5d446e7a7958e479f1d2475a24bcfbcc.glb",
    (gltf) => {
      gltf.scene.scale.set(3, 3, 3);
      gltf.scene.position.set(0, -2, 0);
      gltf.scene.rotation.set(-0.5, 0, 0);
      maqueta = gltf.scene;

      SCENE.add(maqueta);
    },
    (xhr) => {
      console.log(`${((xhr.loaded) / (xhr.total)) * 100}% loaded`);
    },
    (error) => {
      console.log(error.message);
    },
  );
}

function init() {
  ReactDom.render(<Canvas />, document.getElementById("cuerpo"));
  const canvas = createCanvas();

  const SCENE = new THREE.Scene();
  // const light = new THREE.AmbientLight(0xFFFFFF, 0.8); // soft white light
  // SCENE.add(light);
  loadModel(venom, SCENE);

  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  const light1 = new THREE.DirectionalLight(0x631d19, 8);
  light1.position.set(1, 0.5, 1);
  light1.lookAt(new Vector3());
  light1.castShadow = false;
  SCENE.add(light1);

  const light2 = new THREE.DirectionalLight(0xd1d1d1, 2);
  light2.position.set(-1, 0.5, 2);
  light2.lookAt(new Vector3());
  light2.castShadow = false;
  SCENE.add(light2);

  const light3 = new THREE.DirectionalLight(0xffffff, 2);
  light3.position.set(0, 0.5, -2);
  light3.lookAt(new Vector3());
  light3.castShadow = false;
  SCENE.add(light3);

  const light4 = new THREE.DirectionalLight(0x000000, 2);
  light4.position.set(0, 0.5, 1);
  light4.lookAt(new Vector3());
  light4.castShadow = false;
  SCENE.add(light4);

  // const geometry = new THREE.SphereGeometry( 0.5, 32, 16 );
  // const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
  // const sphere = new THREE.Mesh( geometry, material );
  // SCENE.add( sphere );
  // sphere.position.set(0, 0.5, 1);

  // const axesHelper = new THREE.AxesHelper(1);
  // SCENE.add(axesHelper);
  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 100);
  camera.position.z = 4;
  // camera.position.y = 2;
  SCENE.add(camera);
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
  });
  renderer.setClearColor(0xFF0000, 0);
  renderer.setSize(sizes.width, sizes.height);
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  const clock = new THREE.Clock();
  const tick = () => {
    const elapsed = clock.getElapsedTime();
    camera.position.x = Math.cos(elapsed * 0.3) * 3;
    camera.position.z = Math.sin(elapsed * 0.3) * 3;
    controls.update();
    renderer.render(SCENE, camera);
    window.requestAnimationFrame(tick);
  };

  // ACTUALIZAR AL CAMBIAR EL TAMANO
  window.addEventListener("resize", () => {
    sizes.height = window.innerHeight;
    sizes.width = window.innerWidth;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  tick();
}

init();
