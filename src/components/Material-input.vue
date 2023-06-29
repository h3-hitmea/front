<template>
	<div id="material-input">
		<h1>Saisie du matériel</h1>
		<div class="material-list">
			<div v-for="item in materials" :key="item.id" class="material-item">
				<input type="checkbox" :id="item.id" v-model="item.selected" />
				<label :for="item.id">{{ item.name }}</label>
			</div>
		</div>
		<button @click="submitMaterials">Soumettre</button>
	</div>
</template>

<style scoped>
#material-input {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 50px;
}

h1 {
	font-size: 24px;
	margin-bottom: 20px;
}

.material-list {
	display: grid;
	grid-template-columns: auto;
	grid-gap: 10px;
}

.material-item {
	display: flex;
	align-items: center;
}

input[type="checkbox"] {
	margin-right: 10px;
}

label {
	font-size: 16px;
	cursor: pointer;
}

button {
	margin-top: 20px;
	padding: 10px 20px;
	font-size: 16px;
	color: #fff;
	background-color: #379EC1;
	border: none;
	border-radius: 5px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	cursor: pointer;
	transition: background-color 0.3s ease;
}

button:hover {
	background-color: #50b6d8;
}
</style>


<script>
	import {
		ref,
		onMounted
	} from 'vue';
	import {
		useStore
	} from 'vuex';
	import api from '../config/api';
	export default {
		setup() {
			const materials = ref([]);
			const store = useStore();
			const authToken = store.state.authToken;
			const submitMaterials = async () => {
				const selectedMaterials = materials.value
					.filter(item => item.selected)
					.map(item => ({
						materialId: item.id,
					}));
				try {
					const response = await api.post('v1/user-material/create', selectedMaterials, {
						headers: {
							Authorization: `Bearer ${authToken}`,
						},
					});
					console.log(response.data);
					// Ici, vous pouvez gérer la réponse de l'API après l'ajout des user-materials
				} catch (error) {
					console.error(error);
					// Ici, vous pouvez gérer les erreurs, par exemple afficher un message d'erreur à l'utilisateur
				}
			};
			onMounted(async () => {
				try {
					const allMaterials = await api.get('v1/material');
					const allUserMaterials = await api.get('v1/user-material', {
						headers: {
							Authorization: `Bearer ${authToken}`,
						},
					});
					materials.value = allMaterials.data;
					// Cocher les items possédés par l'utilisateur
					allUserMaterials.data.forEach(userMaterial => {
						const material = materials.value.find(item => item.id === userMaterial.id);
						if (material) {
							material.selected = true;
						}
					});
				} catch (error) {
					console.error(error);
					// Ici, vous pouvez gérer les erreurs, par exemple afficher un message d'erreur à l'utilisateur
				}
			});
			return {
				materials,
				submitMaterials,
				authToken,
			};
		},
	};
</script>
