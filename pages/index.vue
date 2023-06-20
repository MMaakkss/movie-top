<template>
	<div>
		<div class="preview">
			<h2 class="preview__title">MovieTop</h2>
			<p class="preview__text">Here you can see many different interesting movies and tv shows</p>
			<div class="preview__input">
				<div class="icon">
					<img src="assets/img/search-normal.svg" alt="search-icon" />
				</div>
				<input
					class="input"
					type="text"
					placeholder="Search Movies or TV Shows"
					v-model="inputValue"
				/>
			</div>
		</div>
		<div class="filter">
			<div class="filter__item" :class="{ active: store.getType === 'movie' }" @click="selectType('movie')">Movies</div>
			<div class="filter__item" :class="{ active: store.getType === 'tv' }" @click="selectType('tv')">TV Shows</div>
		</div>
		<List />
		<NuxtLink class="all" to="/movie">See all</NuxtLink>
	</div>
</template>

<script setup>
import { useMainStore } from "@/stores/main";

const config = useAppConfig();

const store = useMainStore();
const router = useRouter();

const selectType = (type) => {
	store.changeType(type);
};

const inputValue = ref("");

watch(inputValue, () => {
	const timeoutId = window.setTimeout(() => {}, 0);
	for (let id = timeoutId; id >= 0; id -= 1) {
		window.clearTimeout(id);
	}

	setTimeout(() => {
		if (inputValue.value.length > 3) {
			router.push({ name: "search", query: {search: inputValue.value} });
		}
	}, 400);
});
</script>

<style lang="scss" scoped>
.preview {
	margin-bottom: 80px;

	&__title {
		font-weight: 600;
		font-size: 64px;

		@media (max-width: 485px) {
			font-size: 42px;
		}
	}

	&__text {
		color: $blue_gray;
	}

	&__input {
		position: relative;
		margin-top: 24px;

		.input {
			padding: 24px 24px 24px 56px;
			min-width: 240px;

			@media (max-width: 365px) {
				min-width: 180px;
			}
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
