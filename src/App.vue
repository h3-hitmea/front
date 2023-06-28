<template>
	<div id="app">
		<header>
			<img
				src="../public/logo.png"
				alt="Logo"
				class="logo"
			/>
			<h1 class="title">Max Airain</h1>
			<nav>
				<router-link
					to="/inscription"
					class="nav-button"
					>S'inscrire</router-link
				>
				<router-link
					to="/connexion"
					class="nav-button"
					>Se connecter</router-link
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
}
</style>
