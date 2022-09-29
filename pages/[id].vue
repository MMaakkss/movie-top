<template>
	<Loading v-if="!movieImbd" />
	<div v-else>
		<p>Title: {{ movie.title }}</p>
		<p>Imbd Rating: {{ movieImbd.imdbRating }}</p>
	</div>
</template>

<script setup>
const config = useAppConfig();

const route = useRoute();
const movieId = route.params.id;

const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${config.apiKey}`;

const { data: movie } = await useFetch(url, { key: movieId });

let movieImbd = ref();

watch(
	movie,
	(newMovie) => {
		if (newMovie.imdb_id) {
			setTimeout(() => {
				useFetch(
					`https://www.omdbapi.com/?i=${newMovie.imdb_id}&apikey=${config.ombdToken}`,
					{ key: newMovie.imdb_id }
				).then((response) => {
					movieImbd.value = response.data.value;
				});
			}, 1000);
		}
	},
	{
		deep: true,
		immediate: true,
	}
);

console.log(movie.value);
</script>
