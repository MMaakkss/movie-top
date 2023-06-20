<template>
	<header class="header">
		<div class="header__container">
			<NuxtLink class="logo" to="/">
				<img src="assets/img/logo.svg" alt="logo">
			</NuxtLink>
			<nav class="header__nav nav">
				<div class="nav__menu">
					<ul>
						<NuxtLink class="nav__link" to="/">Main</NuxtLink>
						<NuxtLink class="nav__link" to="/movie">Movie</NuxtLink>
					</ul>
				</div>
			</nav>
		</div>
	</header>
</template>

<script></script>

<style lang="scss" scoped>
.header {
	height: 80px;
	background: rgba(18, 24, 41, 0.8);

	&__container {
		max-width: 1440px;
		padding: 0 20px;
		margin: auto;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.logo {
			height: 40px;
		}

		.nav {
			&__menu ul {
				display: flex;
				align-items: center;
				padding: 0;
				gap: 48px;
				height: 80px;
			}

			&__link {
				color: $gray;
				font-weight: 600;
				transition: 0.2s ease-out;
			}
		}
	}
}

.router-link-active {
	color: $white !important;
}
</style>
