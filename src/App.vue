<template>
	<div id="app">
		<header>
			<img
				src="../public/MaxAirain2.png"
				alt="Logo"
				class="logo"
			/>
			<h1 class="title">Max Airain</h1>
			<nav>
	<router-link
		to="/inscription"
		class="nav-button"
		:class="{ 'nav-button-active': $route.path === '/inscription' }"
		>S'inscrire</router-link
	>
	<router-link
		to="/connexion"
		class="nav-button"
		:class="{ 'nav-button-active': $route.path === '/connexion' }"
		><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
</svg> Se connecter</router-link
	>
</nav>
		</header>
		<router-view />
	</div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'App',
});
</script>

<style>
#app {
	text-align: center;
	font-family: 'Roboto', sans-serif;
}

header {
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #f5f5f5;
	padding: 20px;
	position: relative;
}

.logo {
	position: absolute;
	left: 20px;
	max-height: 100%;
}

.title {
	margin: 0;
	color: #379EC1;
}

nav {
	position: absolute;
	right: 20px;
}

.nav-button {
	margin-left: 10px;
	text-decoration: none;
	color: black;
	border: 1px solid black;
	padding: 5px;
	transition: background-color 0.3s ease;
	border-radius: 8px;
}

.nav-button:hover {
	background-color: #57bbdc;
	color: white;
}

.nav-button-active {
	background-color: #379EC1;
	color: white;
}
</style>
