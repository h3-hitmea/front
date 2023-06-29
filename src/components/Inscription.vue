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
	const { descriptor } = await getFacialInformation();
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
		if (error.response && error.response.data && error.response.data.message === "PrismaClientKnownRequestError: \nInvalid `prisma.user.create()` invocation:\n\n\nUnique constraint failed on the fields: (`email`)") {
			alert('Cet email est déjà utilisé');
		} else {
			alert('Une erreur est survenue');
		}
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
			<div class="form-group">
				<label for="email">Email:</label>
				<input type="email" id="email" v-model="email" />
			</div>

			<div class="container">
				<div class="videos">
					<video ref="videoRef" @playing="updateCanvasDimensions" autoplay></video>
					<div class="centered-text">
						<h1>Capturez votre photo</h1>
					</div>
					<canvas ref="canvasRef"></canvas>
				</div>
				<div class="buttons">
					<button type="button" @click="capture">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera-fill" viewBox="0 0 16 16">
							<path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
							<path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"/>
						</svg> Capture
					</button>
					<button type="submit">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
							<path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
						</svg> S'inscrire
					</button>
				</div>
			</div>
		</form>
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
	align-items: center;
	width: 100%;
	margin-top: 20px;
	background: linear-gradient(135deg, #379EC1, #769F2B);
	color:whitesmoke;
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
	background-color: #379EC1;
	border-radius: 5px;
}

.centered-text {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	text-align: center; /* Ajout de cette propriété */
}

button:hover {
	background-color: #50b6d8;
}

.form-group {
	margin-bottom: 20px;
	width: 50%;
	margin: 0 auto;
}

label {
	display: block;
	margin-bottom: 5px;
	font-weight: bold;
}

input[type="email"] {
	width: 100%;
	padding: 10px;
	font-size: 16px;
	border: 1px solid #ccc;
	border-radius: 5px;
	box-sizing: border-box;
}

h2 {
	text-align: center;
	margin-bottom: 20px;
}
</style>
