<template>
	<div id="material-display">
		<h1>Affichage du matériel</h1>
		<div class="material-list">
			<div class="material-item" v-for="item in materials" :key="item.id">
				<label>{{ item.name }} ({{ item.quantity }})</label>
			</div>
		</div>
	</div>
</template>

<script>
	import { ref, onMounted } from 'vue';
	import api from '../config/api';

	export default {
		setup() {
			const materials = ref([]);

			onMounted(async () => {
				try {
					const allMaterials = await api.get('v1/material');
					materials.value = allMaterials.data.sort((a, b) => a.name.localeCompare(b.name));
				} catch (error) {
					console.error(error);
				}
			});

			return {
				materials,
			};
		},
	};
</script>

<style scoped>
#material-display {
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

label {
	font-size: 16px;
	cursor: pointer;
}
</style>
