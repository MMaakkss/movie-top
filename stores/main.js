export const useMainStore = defineStore("main", {
	state: () => ({
		page: 1,
		type: "movies",
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
		changeType(type) {
			this.type = type;
		},
	},
	getters: {
		getPage: (state) => state.page,
		getType: (state) => state.type,
	},
});
