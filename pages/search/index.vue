<template>
	<div>
		<div class="list">
			<CardItem
				class="list__item"
				v-for="item in searchList"
				:key="item.id"
				:movie="item"
			/>
		</div>
	</div>
</template>

<script setup>
const config = useAppConfig();
const route = useRoute();

const searchList = ref(null);

if (route.query.search) {
	useFetch(`https://api.themoviedb.org/3/search/multi?query=SCREAM?api_key=${config.apiKey}`).then(res => {
		if (res.data.value?.results) searchList.value = res.data.value.results;
	});
} else {
	await useFetch(`https://api.themoviedb.org/3/discover/movie?api_key=${config.apiKey}`).then(res => {
		if (res.data.value?.results) searchList.value = res.data.value.results;
	});
}
</script>


<style lang="scss" scoped>
.list {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 25px;
}
</style>