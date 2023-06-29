<template>
	<div id="material-input">
		<h1>Saisie du matériel</h1>
		<div class="material-list">
			<div class="material-item" v-for="item in materials" :key="item.id">
				<input type="checkbox" :id="item.id" v-model="item.selected" @change="handleChange(item)" :disabled="item.quantity === 0" />
				<label :for="item.id" :class="{ 'grayed-out': item.quantity === 0 }">{{ item.name }} ({{ item.quantity }})</label>
			</div>
		</div>
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
		display: flex;
		flex-direction: column;
	}

.material-item {
		display: flex;
		align-items: center;
		margin-bottom: 10px;
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
			const handleChange = async (item) => {
				const dataToSend = {
					materialId: item.id
				};
				if (item.selected) {
					// Si l'élément est sélectionné, créez-le et décrémentez la quantité
					await api.post('v1/user-material/create', dataToSend, {
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${authToken}`,
						},
					});
					item.quantity--;
				} else {
					// Si l'élément n'est pas sélectionné, supprimez-le et augmentez la quantité
					await api.delete('v1/user-material/delete', {
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${authToken}`,
						},
						data: dataToSend,
					});
					item.quantity++;
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
					materials.value = allMaterials.data.sort((a, b) => a.name.localeCompare(b.name));
					allUserMaterials.data.forEach(userMaterial => {
						const material = materials.value.find(item => item.id === userMaterial
							.materialId);
						if (material) {
							material.selected = true;
						}
					});
				} catch (error) {
					console.error(error);
				}
			});
			return {
				materials,
				handleChange,
				authToken,
			};
		},
	};
</script>

<style>
	.grayed-out {
		color: gray;
	}
</style>
