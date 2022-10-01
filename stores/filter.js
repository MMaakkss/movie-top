export const useFilterStore = defineStore("filter", {
	state: () => ({
		page: 1,
		year: 2022,
		genre: "all",
	}),
	actions: {
		increment() {
			this.page++;
		},
		decrement() {
			if (this.page > 1) {
				this.page--;
			}
		},
		setPage(page) {
			this.page = page;
		},
		setYear(year) {
			this.year = year;
		},
		setGenre(genre) {
			this.genre = genre;
		},
	},
	getters: {
		getPage: (state) => state.page,
		getYear: (state) => state.year,
		getGenre: (state) => state.genre,
	},
});
