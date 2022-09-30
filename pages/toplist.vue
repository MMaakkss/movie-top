<template>
	<div>
		<Loading v-if="loading" />
		<div v-else class="movie-grid">
			<div class="filter">
				<select name="select" @input="changeYear">
					<option value="2022">2022</option>
					<option value="2021">2021</option>
					<option value="2020">2020</option>
				</select>
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

const config = useAppConfig();

const store = useFilterStore();

let loading = ref(false);

let url = computed(
	() =>
		`https://api.themoviedb.org/3/discover/movie?api_key=${config.apiKey}&sort_by=popularity.desc&page=${store.getPage}&primary_release_year=${store.getYear}`
);

const { data: list } = await useFetch(() => url.value);

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
</style>
