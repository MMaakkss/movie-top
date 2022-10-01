<template>
	<div>
		<Loading v-if="loading" />
		<div v-else class="movie-grid">
			<div class="filter">
				<form class="filter__form" @submit.prevent="getFormData">
					<div class="input-group">
						<div>
							<div class="input-group__input">
								<span>Date:</span>
								<input type="text" name="year" :value="store.getYear" />
							</div>
							<div class="filter__form__error" v-if="inputErorrs.year">
								Can only contain numbers!
							</div>
						</div>

						<div class="input-group__input">
							<span>Genre:</span>

							<select name="genre">
								<option value="all" :selected="store.getGenre === 'all'">
									All
								</option>

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
					</div>

					<button class="filter__form__submit" type="submit">Search</button>
				</form>
			</div>

			<div class="list">
				<CardItem
					class="list__item"
					v-for="item in list.results"
					:key="item.id"
					:to="`/${item.id}`"
					:movie="item"
				/>
			</div>

			<div class="pagination">
				<div class="pagination__button" @click="prev">prev</div>
				<div class="pagination__pages">
					<span
						class="page"
						:class="{ current_page: store.getPage === n }"
						v-for="n in 500"
						:key="n"
						@click="changePage(n)"
					>
						{{ n }}
					</span>
				</div>
				<div class="pagination__button" @click="next">next</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useFilterStore } from "@/stores/filter";
import Button from "~~/components/UI/Button.vue";

const config = useAppConfig();

const store = useFilterStore();

const inputErorrs = ref({
	year: false,
});

let loading = ref(false);

let url = computed(
	() =>
		`https://api.themoviedb.org/3/discover/movie?api_key=${config.apiKey}&sort_by=popularity.desc&page=${store.getPage}&primary_release_year=${store.getYear}&with_genres=${store.getGenre}`
);

//--------- Requests ---------//
const { data: list } = await useFetch(() => url.value);
const { data: genreList } = await useFetch(
	`https://api.themoviedb.org/3/genre/movie/list?api_key=${config.apiKey}`
);
//---------------------------//

const goUp = () => {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
	loading.value = true;

	setTimeout(() => {
		loading.value = false;
	}, 2000);
};

//Filters

const next = () => {
	store.increment();
	goUp();
};

const prev = () => {
	store.decrement();
	goUp();
};

const changePage = (pageIndex) => {
	store.setPage(pageIndex);
	goUp();
};

const changeYear = (e) => {
	store.setYear(e.target.value);
	goUp();
};

const getFormData = (data) => {
	if (/^[0-9]+$/.test(data.target.year.value)) {
		if (data.target.year.value.toString() !== store.getYear.toString()) {
			store.setYear(data.target.year.value);
			goUp();
		}

		inputErorrs.value.year = false;
	} else {
		inputErorrs.value.year = true;
	}

	if (data.target.genre.value.toString() !== store.getGenre.toString()) {
		store.setGenre(data.target.genre.value);
		console.log(store.getGenre);
		goUp();
	}
};

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

.pagination {
	display: flex;
	align-items: center;

	&__button {
		padding: 10px;
		background-color: $orange_red;
		border-radius: 4px;
		cursor: pointer;
	}

	&__pages {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;

		.page {
			cursor: pointer;
			margin: 0 10px;

			&.current_page {
				color: $gray;
			}
		}
	}
}

.filter {
	&__form {
		input,
		select {
			border: none;
			padding: 5px 10px;
			border-radius: 2px;
			background-color: $white;
			color: $orange_red;

			&:focus {
				outline: none;
			}
		}

		&__error {
			margin-top: 5px;
			font-size: 12px;
			color: $orange;
		}

		&__submit {
			display: block;
			width: fit-content;
			margin: 20px auto;
			padding: 8px 30px;
			background-color: unset;
			border: 1px solid $orange_red;
			color: $white;
			cursor: pointer;
			transition: 0.2s;

			&:hover {
				background-color: $orange_red;
			}
		}

		.input-group {
			display: flex;
			flex-direction: column;
			gap: 10px;

			&__input {
				display: flex;
				align-items: center;
				gap: 15px;
			}
		}
	}
}
</style>
