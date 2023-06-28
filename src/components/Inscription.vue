<script>
import { ref } from 'vue';
import api from '../config/api';

export default {
	setup() {
		const email = ref('');
		const password = ref('');

		const submitForm = async () => {
			try {
				const response = await api.post('v1/user', {
					email: email.value,
					password: password.value,
				});
				console.log(response.data);
				// Ici, vous pouvez gérer la réponse de l'API, par exemple rediriger l'utilisateur vers une autre page
			} catch (error) {
				console.error(error);
				// Ici, vous pouvez gérer les erreurs, par exemple afficher un message d'erreur à l'utilisateur
			}
		};

		return {
			email,
			password,
			submitForm,
		};
	},
};
</script>

<template>
	<div>
		<h2>Inscription</h2>
		<form @submit.prevent="submitForm">
			<div>
				<label for="email">Email:</label>
				<input
					type="email"
					id="email"
					v-model="email"
				/>
			</div>
			<div>
				<label for="password">Mot de passe:</label>
				<input
					type="password"
					id="password"
					v-model="password"
				/>
			</div>
			<button type="submit">S'inscrire</button>
		</form>
	</div>
</template>
