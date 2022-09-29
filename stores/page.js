export const usePageStore = defineStore("page", {
	state: () => ({
		page: 1,
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
	},
	getters: {
		getPage: (state) => state.page,
	},
});
