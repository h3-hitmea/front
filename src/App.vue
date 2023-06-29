<template>
	<div id="app">
		<header>
			<router-link to="/">
				<img src="../public/MaxAirain2.png"
					alt="Logo"
					class="logo" />
			</router-link>
			<div class="title-container">
				<h1 class="title">Max Airain</h1>
			</div>
			<div class="header-right">

				<nav v-if="!authToken">
					<router-link to="/inscription"
						class="nav-button"
						:class="{ 'nav-button-active': $route.path === '/inscription' }">
						S'inscrire
					</router-link>
					<router-link to="/connexion"
						class="nav-button"
						:class="{ 'nav-button-active': $route.path === '/connexion' }">
						<svg xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							class="bi bi-person-fill"
							viewBox="0 0 16 16">
							<path
								d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
						</svg>
						Se connecter
					</router-link>
				</nav>
				<div class="welcome"
					v-else>
					<button class="nav-button"
						@click="logout">
						<svg xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							class="bi bi-person-fill"
							viewBox="0 0 16 16">
							<path
								d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
						</svg>
						Déconnexion
					</button>
				</div>
			</div>
		</header>
		<router-view />
	</div>
</template>

<script>
	import {
		useRouter
	} from 'vue-router';
	import {
		defineComponent,
		computed,
	} from 'vue';
	import {
		useStore
	} from 'vuex';

	export default defineComponent({
		name: 'App',
		setup() {
			const router = useRouter();
			const store = useStore();
			const authToken = computed(() => store.state.authToken);
			const logout = () => {
				store.commit('SET_AUTH_TOKEN', null);
				localStorage.removeItem('authToken');
				router.push('/');
			};

			return {
				authToken,
				logout
			};
		}
	});
</script>

<style>
	#app {
		text-align: center;
		font-family: 'Roboto', sans-serif;
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #f5f5f5;
		padding: 20px;
		position: relative;
	}

	.logo {
		max-width: 200px;
	}

	.header-right {
		display: flex;
		align-items: center;
	}

	.title-container {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.title {
		margin: 0 auto;
		color: #379EC1;
	}

	nav {
		margin-left: 20px;
	}

	.nav-button {
		text-decoration: none;
		color: black;
		border: 1px solid black;
		padding: 5px;
		transition: background-color 0.3s ease;
		border-radius: 8px;
		margin-left: 10px;
	}

	.nav-button:hover {
		background-color: #57bbdc;
		color: white;
	}

	.nav-button-active {
		background-color: #379EC1;
		color: white;
	}

	.welcome {
		margin-left: auto;
	}
</style>
