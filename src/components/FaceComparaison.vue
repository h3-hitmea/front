<script setup>
import { ref, onMounted } from 'vue';
import * as faceapi from 'face-api.js';
const videoRef = ref(null);
const canvasRef = ref(null);
const image1 = ref(null);
const image2 = ref(null);

onMounted(async () => {
	console.log('loading model');
	try {
		await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
		await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
		await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
	} catch (error) {
		console.error('Failed to load model:', error);
	}
	console.log('model loaded');
	navigator.mediaDevices
		.getUserMedia({
			video: true,
		})
		.then((stream) => {
			// console.log('got stream', stream);
			videoRef.value.srcObject = stream;
		})
		.catch((err) => {
			console.error('error starting video stream', err);
		});
});
const updateCanvasDimensions = () => {
	canvasRef.value.width = videoRef.value.videoWidth;
	canvasRef.value.height = videoRef.value.videoHeight;
};
const capture = () => {
	const context = canvasRef.value.getContext('2d');
	context.drawImage(
		videoRef.value,
		0,
		0,
		videoRef.value.videoWidth,
		videoRef.value.videoHeight
	);
	const imageData = context.getImageData(
		0,
		0,
		canvasRef.value.width,
		canvasRef.value.height
	);
	if (!image1.value) {
		image1.value = imageData;
	} else {
		image2.value = imageData;
	}
};

const compare = async () => {
	if (!image1.value || !image2.value) {
		console.error('need two images to compare');
		return;
	}
	if (!faceapi.nets.ssdMobilenetv1.params) {
		throw new Error('ssdMobilenetv1 model not loaded');
	}
	const canvas = document.createElement('canvas');
	const context = canvas.getContext('2d');
	canvas.width = image1.value.width;
	canvas.height = image1.value.height;
	context.putImageData(image1.value, 0, 0);

	const detection1 = await faceapi
		.detectSingleFace(canvas)
		.withFaceLandmarks()
		.withFaceDescriptor();
	canvas.width = image2.value.width;
	canvas.height = image2.value.height;
	context.putImageData(image2.value, 0, 0);

	const detection2 = await faceapi
		.detectSingleFace(canvas)
		.withFaceLandmarks()
		.withFaceDescriptor();
	console.log(detection2);
	if (!detection1 || !detection2) {
		console.error('no faces detected');
		return;
	}

	const distance = faceapi.euclideanDistance(detection1.descriptor, detection2.descriptor);
	console.log('distance', distance);
	// Seuil à ajuster en fonction de vos besoins
	const threshold = 0.6;
	if (distance < threshold) {
		console.log('It is the same person.');
	} else {
		console.log('It is not the same person.');
	}
};
</script>

<template>
	<div class="container">
		<h1>Capture des photos</h1>
		<div class="videos">
			<video
				ref="videoRef"
				@playing="updateCanvasDimensions"
				autoplay
			></video>
			<canvas ref="canvasRef"></canvas>
		</div>
		<div class="buttons">
			<button @click="capture">Capture</button>
			<button @click="compare">Comparer</button>
		</div>
	</div>
</template>

<style scoped>
.container {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.videos {
	display: flex;
	justify-content: space-between;
	width: 100%;
}

.buttons {
	display: flex;
	justify-content: center;
	margin-top: 10px;
}

button {
	margin: 0 10px;
	padding: 10px 20px;
	font-size: 16px;
	color: #fff;
	border: none;
	cursor: pointer;
	transition: background-color 0.3s ease;
}

button:hover {
	background-color: #4caf50;
}
</style>
