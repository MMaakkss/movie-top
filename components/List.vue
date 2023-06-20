<template>
	<div>
		<Loading v-if="loading" />
		<div v-else class="movie-grid">
			<div class="list">
				<CardItem class="list__item" v-for="item in list.results.slice(0, 12)" :key="item.id" :movie="item" />
			</div>
		</div>
	</div>
</template>

<script setup>
import { useMainStore } from "~/stores/main";

const config = useAppConfig();

const mainStore = useMainStore();

let loading = ref(false);

const currentYear = new Date().getFullYear();

let url = computed(() =>
		`https://api.themoviedb.org/3/discover/${mainStore.getType}?api_key=${config.apiKey}&sort_by=popularity.desc&page=1&primary_release_year=${currentYear}`
);

//--------- Requests ---------//
const { data: list } = await useFetch(() => url.value);

</script>

<style lang="scss" scoped>
.list {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 25px;
}
</style>
