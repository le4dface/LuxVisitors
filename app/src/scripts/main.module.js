//main.module.js


import * as THREE from '../../vendors/threejs/three.min';
import { LuxVisitor } from './lux.visitor.module';
import '../styles/styles.less';

export class Main {

    constructor() {

        let viewPortWidth = window.innerWidth;
        let viewPortHeight = window.innerHeight;
        let aspectRatio = viewPortWidth/viewPortHeight;

        let xScale = 0.05;
        let yScale = 0.05;
        let zScale = 0.05;

        let maxPopulation = 100; //maximum number of visitors;

        let updateInterval = 30; //how often to check in on our visitors (miliseconds, i.e. 5 seconds)

        let getRandomInt = (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        };

        let scene = new THREE.Scene();
        let camera = new THREE.PerspectiveCamera( 75, aspectRatio, 0.1, 1000 );

        let renderer = new THREE.WebGLRenderer();
        renderer.setSize(viewPortWidth, viewPortHeight);
        document.body.appendChild( renderer.domElement );


        //store collection of luxVisitors
        let luxVisitors = [];

        //list of cubes
        let cubeList = [];

        //initialise visitors list
        for(let i=0; i<maxPopulation; i++) {

            luxVisitors.push(new LuxVisitor(
                    getRandomInt(-viewPortWidth, viewPortWidth),
                    getRandomInt(-viewPortHeight, viewPortHeight),
                    getRandomInt(1, 3),
                    getRandomInt(0,360)
                )
            );
        }


        //initialise

        camera.position.z = 5;

        var render = function () {

            setTimeout(function() {

                requestAnimationFrame(render);

                for(let i=0; i<luxVisitors.length; i++) {

                    luxVisitors[i].updatePosition(30, 30); //gets new location after 10 seconds elapses

                    let locationHistory = luxVisitors[i].getLocationHistory();
                    let latestLocation = locationHistory[locationHistory.length-1];

                    //corrected x,y for viewport
                    let correctedX = latestLocation.x / viewPortWidth;
                    let correctedY = latestLocation.y / viewPortHeight;

                    if((correctedX >= -viewPortWidth && correctedX <= viewPortWidth) && (correctedY >= -viewPortHeight && correctedY <= viewPortHeight)) {

                        // var geometry = new THREE.PointCloud(xScale, yScale);
                        // var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
                        // var cube = new THREE.Mesh(geometry, material);
                        var dotGeometry = new THREE.Geometry();
                        dotGeometry.vertices.push(new THREE.Vector3(xScale, yScale, 0));
                        var dotMaterial = new THREE.PointCloudMaterial( { size: 1, sizeAttenuation: false } );
                        var dot = new THREE.PointCloud( dotGeometry, dotMaterial );
                        scene.add( dot );

                        //corrected x,y for viewport
                        dot.position.x = latestLocation.x / viewPortWidth;
                        dot.position.y = latestLocation.y / viewPortHeight;

                        //push cube to list for rendering
                        scene.add(dot)

                    } else {
                        //else we should remove the luxVisitor (garbage collection)
                        luxVisitors.splice(i,1);
                    }

                }

                //keep adding visitors until limit reached
                if(luxVisitors.length < maxPopulation) {

                    luxVisitors.push(new LuxVisitor(
                        getRandomInt(-viewPortWidth, viewPortWidth),
                        getRandomInt(-viewPortHeight, viewPortHeight),
                        getRandomInt(1, 3),
                        getRandomInt(0,360)
                        )
                    );

                }

                //render the scene
                renderer.render(scene, camera);

            }, updateInterval);

        };

        //start our render loop
        render();

    }



}

document.addEventListener('DOMContentLoaded', () => new Main());