<template>
	<Loading v-if="loading" />
	<div class="movie-grid" v-else>
		<div class="filter">
			<form class="filter__form" @submit.prevent="getFormData">
				<div class="input-group">
					<div class="input-group__input">
						<span>Type:</span>
						<select name="type">
							<option
								value="tv"
								:selected="mainStore.getType === 'tv'"
							>
								Tv Shows
							</option>
							<option
								value="movie"
								:selected="mainStore.getType === 'movie'"
							>
								Movies
							</option>
						</select>
					</div>
					<div class="input-group__input">
						<span>Date:</span>
						<select name="year">
							<option
								v-for="n in 100"
								:key="n"
								:value="currentYear+1-n"
								:selected="store.getYear === (currentYear+1-n).toString()"
							>
								{{ currentYear+1-n }}
							</option>
						</select>
					</div>
					<div class="input-group__input">
						<span>Genre:</span>
						<select name="genre">
							<option value="all" :selected="store.getGenre === 'all'">All</option>
							<option
								v-for="item in genreList.genres"
								:key="item.id"
								:value="item.id"
								:selected="store.getGenre === item.id.toString()"
							>
								{{ item.name }}
							</option>
						</select>
					</div>
					<button class="filter__form__submit" type="submit">Search</button>
				</div>
			</form>
		</div>

		<div class="list" ref="scrollBlock">
			<CardItem
				class="list__item"
				v-for="item in list.results"
				:key="item.id"
				:movie="item"
			/>
		</div>
	</div>
</template>

<script setup>
import { useFilterStore } from "@/stores/filter";
import { useMainStore } from "~/stores/main";

const config = useAppConfig();

const store = useFilterStore();
const mainStore = useMainStore();

let loading = ref(false);

const currentYear = new Date().getFullYear();
let currentPage = ref(store.getPage);
const scrollBlock = ref(null);

let url = computed(() =>
	`https://api.themoviedb.org/3/discover/${mainStore.getType}?api_key=${config.apiKey}&sort_by=popularity.desc&page=${store.getPage}&primary_release_year=${store.getYear}&with_genres=${store.getGenre}`
);

//--------- Requests ---------//
const [{ data: list }, { data: genreList }] = await Promise.all([
	useFetch(() => url.value),
	useFetch(`https://api.themoviedb.org/3/genre/${mainStore.getType}/list?api_key=${config.apiKey}`),
]);
//---------------------------//

//Filters

const loadMore = () => {
	if (currentPage.value >= list.value.total_pages) {
		return;
	}

	currentPage.value++;

	useFetch(() => `https://api.themoviedb.org/3/discover/${mainStore.getType}?api_key=${config.apiKey}&sort_by=popularity.desc&page=${currentPage.value}&primary_release_year=${store.getYear}&with_genres=${store.getGenre}`).then(res => {
		list.value.results = [...list.value.results, ...res.data.value.results]
	});
};

onMounted(() => {
	window.addEventListener("scroll", handleScroll)
});
onUnmounted(() => {
	window.removeEventListener("scroll", handleScroll)
});

const handleScroll = (e) => {
	let elem = scrollBlock.value;

	if (elem.getBoundingClientRect().bottom-400 < window.innerHeight) {
		loadMore();
	}
}

const getFormData = (data) => {
	if (data.target.type.value !== mainStore.getType) {
		mainStore.changeType(data.target.type.value);
	}

	if (data.target.year.value.toString() !== store.getYear.toString()) {
		store.setYear(data.target.year.value);
	}

	if (data.target.genre.value.toString() !== store.getGenre.toString()) {
		store.setGenre(data.target.genre.value);
	}
};
</script>

<style lang="scss" scoped>
.list {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 25px;
}

.filter {
	margin-bottom: 20px;

	&__form {
		input,
		select {
			padding: 10px 5px;
		}

		&__submit {
			padding: 10px 30px;
			background-color: unset;
			border: 1px solid $orange_red;
			border-radius: 12px;
			color: $white;
			cursor: pointer;
			transition: 0.2s;

			&:hover {
				background-color: $orange_red;
			}
		}

		.input-group {
			display: flex;
			align-items: flex-start;
			gap: 20px;

			&__input {
				display: flex;
				align-items: center;
				gap: 15px;
			}
		}
	}
}
</style>
