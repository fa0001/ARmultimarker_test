//Multi Markers WebAR-AR.js and Aframe - Playing the Archive - Connected Environment CASA-UCL

//Global Variable
var markersURLArray=[];
var markersNameArray=[];
var modelsURLArray = []; // Array to store URLs of 3D models
var videosURLArray=[]; // array to store video

AFRAME.registerComponent('markers_start',{
	init:function(){
		console.log('Add markers to the scene');

		var sceneEl = document.querySelector('a-scene');
		
		//list of the markers
		for(var i=1; i<19; i++)
		{
			var url="resources/markers/pattern-Individual_Blocks-"+i+".patt";
			markersURLArray.push(url);
			markersNameArray.push('Marker_'+i);
			//console.log(url);

			 // Assuming your 3D models are named as model-1.gltf, model-2.gltf, etc.
            		var modelUrl = "resources/models/model-" + i + ".gltf";
            		modelsURLArray.push(modelUrl);

			 // Assuming your videos are named as video-1.mp4, video-2.mp4, etc.
            		var videoUrl = "resources/videos/video-" + i + ".mp4";
            		videosURLArray.push(videoUrl);
		}

		for(var k=0; k<18; k++)
		{
			var markerEl = document.createElement('a-marker');
			markerEl.setAttribute('type','pattern');
			markerEl.setAttribute('url',markersURLArray[k]);
			markerEl.setAttribute('id',markersNameArray[k]);

			markerEl.setAttribute('registerevents','');
			sceneEl.appendChild(markerEl);

			//Adding text to each marker
			//var textEl = document.createElement('a-entity');
			
			//textEl.setAttribute('id','text');
			//textEl.setAttribute('text',{color: 'red', align: 'center', value:markersNameArray[k], width: '5.5'});
			//textEl.object3D.position.set(0, 0.7, 0);
			//textEl.object3D.rotation.set(-90, 0, 0);

			//markerEl.appendChild(textEl);

			// Adding a 3D model to each marker
            		var modelEl = document.createElement('a-entity');
           		modelEl.setAttribute('gltf-model', `url(${modelsURLArray[k]})`);
            		modelEl.setAttribute('id', 'model');
            		modelEl.object3D.position.set(0, 0.7, 0);
            		modelEl.object3D.rotation.set(0, 0, 0);

            		markerEl.appendChild(modelEl);

			// Adding a video to each marker
            		var videoEl = document.createElement('a-entity');
           		videoEl.setAttribute('mp4-video', `url(${videosURLArray[k]})`);
            		videoEl.setAttribute('id', 'video');
            		videoEl.object3D.position.set(0, 0.7, 0);
            		videoEl.object3D.rotation.set(0, 0, 0);
			videoEl.object3D.scale.set(0.5, 0.5, 0.5);

            		videoEl.appendChild(videoEl);
		}
	}
});


//Detect marker found and lost
AFRAME.registerComponent('registerevents', {
		init: function () {
			const marker = this.el;

			marker.addEventListener("markerFound", ()=> {
				var markerId = marker.id;
				console.log('Marker Found: ', markerId);
			});

			marker.addEventListener("markerLost",() =>{
				var markerId = marker.id;
				console.log('Marker Lost: ', markerId);
			});
		},
	});
