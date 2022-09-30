export const useFilterStore = defineStore("filter", {
	state: () => ({
		page: 1,
		year: 2022,
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
	},
	getters: {
		getPage: (state) => state.page,
		getYear: (state) => state.year,
	},
});
