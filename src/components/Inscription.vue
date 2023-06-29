<script setup>
	import {
		ref,
		onMounted
	} from 'vue';
	import api from '../config/api';
	import * as faceapi from 'face-api.js';
	import {
		useRouter
	} from 'vue-router';
	const router = useRouter();
	const email = ref('');
	console.log(process.env.VUE_APP_API_URL);
	const submitForm = async () => {
		const {
			descriptor
		} = await getFacialInformation();
		const descriptorToString = JSON.stringify(Array.from(descriptor));
		try {
			const response = await api.post('v1/user', {
				email: email.value,
				descriptor: descriptorToString,
			});
			console.log(response.data);
			router.push('/connexion');
		} catch (error) {
			console.error(error);
			// Ici, vous pouvez gérer les erreurs, par exemple afficher un message d'erreur à l'utilisateur
		}
	};
	const videoRef = ref(null);
	const canvasRef = ref(null);
	const image = ref(null);
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
		image.value = imageData;
	};
	const getFacialInformation = async () => {
		if (!image.value) {
			console.error('need one image');
			return;
		}
		if (!faceapi.nets.ssdMobilenetv1.params) {
			throw new Error('ssdMobilenetv1 model not loaded');
		}
		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');
		canvas.width = image.value.width;
		canvas.height = image.value.height;
		context.putImageData(image.value, 0, 0);
		const detection = await faceapi
			.detectSingleFace(canvas)
			.withFaceLandmarks()
			.withFaceDescriptor();
		return detection;
	};
</script>

<template>
	<div>
		<h2>Inscription</h2>
		<form @submit.prevent="submitForm">
			<div>
				<label for="email">Email:</label>
				<input type="email"
					id="email"
					v-model="email" />

				<div class="container">
					<h1>Capture votre photo</h1>
					<div class="videos">
						<video ref="videoRef"
							@playing="updateCanvasDimensions"
							autoplay></video>
						<canvas ref="canvasRef"></canvas>
					</div>
					<div class="buttons">
						<button type="button"
							@click="capture">
							Capture
						</button>
					</div>
				</div>
			</div>

			<button type="submit">S'inscrire</button>
		</form>
	</div>
</template>
