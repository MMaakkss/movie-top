<template>
	<div>
		<div class="preview">
			<h2 class="preview__title">MovieTop</h2>
			<p class="preview__text">Here you can see many different interesting movies and tv shows</p>
			<div class="preview__input">
				<div class="icon">
					<img src="assets/img/search-normal.svg" alt="search-icon" />
				</div>
				<input class="input" type="text" placeholder="Search Movies or TV Shows" />
			</div>
		</div>
		<div class="filter">
			<div class="filter__item" :class="{ active: store.getType === 'movies' }" @click="selectType('movies')">Movies</div>
			<div class="filter__item" :class="{ active: store.getType === 'shows' }" @click="selectType('shows')">TV Shows</div>
		</div>
		<List />
		<NuxtLink class="all" to="/movie">See all</NuxtLink>
	</div>
</template>

<script setup>
import { useMainStore } from "@/stores/main";

const config = useAppConfig();

const store = useMainStore();

const selectType = (type) => {
	store.changeType(type);
};
</script>

<style lang="scss" scoped>
.preview {
	margin-bottom: 80px;

	&__title {
		font-weight: 600;
		font-size: 64px;
	}

	&__text {
		color: $blue_gray;
	}

	&__input {
		position: relative;
		margin-top: 24px;

		.input {
			padding: 24px 99px 24px 56px;
			max-width: 340px;
			width: 100%;
		}

		.icon {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			left: 18px;
		}
	}
}

.filter {
	width: fit-content;
	padding: 8px;
	display: flex;
	margin-bottom: 24px;
	background: rgba(0, 0, 0, 0.2);
	backdrop-filter: blur(40px);
	border-radius: 12px;

	&__item {
		padding: 8px 32px;
		color: $blue_gray;
		border-radius: 8px;
		cursor: pointer;

		&.active {
			color: $white;
			background-color: $primary;
		}
	}
}

.all {
	display: block;
	width: fit-content;
	margin: 24px auto auto;
	padding: 16px 32px;
	border-radius: 12px;
	background: #7b6ef6;

}
</style>
