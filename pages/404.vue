<template>
	<div class="error">
		<img src="@/assets/img/404.svg" alt="404" />
		<div class="error__title">Lost your way?</div>
		<div class="error__description">Oops! This is awkward. You are looking for something that doesn't actually exist.</div>
		<NuxtLink class="error__link" to="/">Go Home</NuxtLink>
	</div>
</template>

<style lang="scss" scoped>
.error {
	text-align: center;
	&__title {
		font-size: 48px;
		font-weight: 600;
		margin-top: 40px;
		margin-bottom: 16px;
	}

	&__description {
		color: $blue_gray;
	}

	&__link {
		display: block;
		width: fit-content;
		margin: 24px auto auto;
		padding: 16px 32px;
		border-radius: 12px;
		background: $primary;
	}
}
</style>
