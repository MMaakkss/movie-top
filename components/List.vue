<template>
	<div>
		<Loading v-if="loading" />
		<div v-else class="movie-grid">
			<div class="list">
				<CardItem class="list__item" v-for="item in list.results.slice(0, 8)" :key="item.id" :movie="item" />
			</div>
		</div>
	</div>
</template>

<script setup>
import { useFilterStore } from "@/stores/filter";

const config = useAppConfig();

const store = useFilterStore();

let loading = ref(false);

let url = computed(
	() =>
		`https://api.themoviedb.org/3/discover/movie?api_key=${config.apiKey}&sort_by=popularity.desc&page=${store.getPage}&primary_release_year=${store.getYear}&with_genres=${store.getGenre}`
);

//--------- Requests ---------//
const { data: list } = await useFetch(() => url.value);

console.log(url.value);
console.log(list);
</script>

<style lang="scss" scoped>
.list {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 25px;
}
</style>
