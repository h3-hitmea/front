<template>
	<div id="material-input">
		<h1>Saisie du matériel</h1>
		<div v-for="item in materials"
			:key="item.id">
			<input type="checkbox"
				:id="item.id"
				v-model="item.selected" />
			<label :for="item.id">{{ item.name }}</label>
		</div>
		<button @click="submitMaterials">Soumettre</button>
	</div>
</template>

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
