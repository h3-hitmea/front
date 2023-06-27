<template>
  <div id="material-input">
    <h1>Saisie du matériel</h1>
    <div v-for="item in materials" :key="item.id">
      <input type="checkbox" :id="item.id" v-model="item.selected">
      <label :for="item.id">{{ item.name }}</label>
    </div>
    <p>Token d'authentification : {{ authToken }}</p>
    <button @click="submitMaterials">Soumettre</button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import api from '../api'; // Remplacez './api' par le chemin vers votre fichier api.js

export default {
  setup() {
    const materials = ref([]);
    const store = useStore();
    const authToken = store.state.authToken;

    const submitMaterials = () => {
      const selectedMaterials = materials.value.filter(m => m.selected);
      console.log(selectedMaterials);
      // Ici, vous pouvez envoyer les matériaux sélectionnés à votre serveur ou effectuer d'autres actions
    };

    onMounted(async () => {
      try {
        const response = await api.get('v1/material');
        materials.value = response.data;
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
