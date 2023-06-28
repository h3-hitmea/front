<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import api from '../config/api'; // Remplacez './api' par le chemin vers votre fichier api.js

export default {
	setup() {
		const email = ref('');
		const password = ref('');
		const store = useStore();
		const router = useRouter();

		const submitForm = async () => {
			try {
				const response = await api.post('v1/auth/login', {
					email: email.value,
					password: password.value,
				});
				console.log(response.data);
				// Stocker le token d'authentification dans le store
				store.commit('setAuthToken', response.data.token);
				console.log(store.state.authToken);
				// Rediriger l'utilisateur vers la page "material"
				router.push('/material');
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
		<h2>Connexion</h2>
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
			<button type="submit">Se connecter</button>
		</form>
	</div>
</template>
