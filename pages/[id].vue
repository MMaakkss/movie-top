<template>
	<Loading v-if="!movieImbd" />
	<div v-else>
		<Button link="/toplist">Go back</Button>
		<div class="movie">
			<div class="movie__poster">
				<img
					class="card__img"
					:src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`"
					:alt="movie.title"
				/>
			</div>
			<div class="movie__info info">
				<h2 class="info__title">
					Title: <span>{{ movie.title }}</span>
				</h2>
				<p>
					Imbd Rating: <span>{{ movieImbd.imdbRating }}</span>
				</p>
				<p>
					Release Date:
					<span>{{
						new Date(movie.release_date).toLocaleString("en-us", {
							month: "long",
							day: "numeric",
							year: "numeric",
						})
					}}</span>
				</p>
				<p class="info__genre">
					Genre:
					<span v-for="item in movie.genres" :key="item.id">{{
						item.name
					}}</span>
				</p>
				<p>
					Original Language:
					<span>{{ movie.original_language.toUpperCase() }}</span>
				</p>
				<p>
					Overview: <span>{{ movie.overview }}</span>
				</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import Button from "~~/components/UI/Button.vue";
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
					if (response.data.value.Response.toLowerCase() === "false") {
						movieImbd.value = {
							imdbRating: "N/A",
						};
					} else {
						movieImbd.value = response.data.value;
					}
				});
			}, 1000);
		} else {
			setTimeout(() => {
				movieImbd.value = {
					imdbRating: "N/A",
				};
				console.log(movieImbd);
			});
		}
	},
	{
		deep: true,
		immediate: true,
	}
);

console.log(movie.value);
</script>

<style lang="scss" scoped>
.movie {
	display: flex;
	gap: 20px;

	&__poster {
		width: 35%;

		img {
			max-width: 100%;
		}
	}

	.info {
		display: flex;
		flex-direction: column;
		gap: 10px;
		font-weight: 400;
		width: calc(65% - 20px);

		span {
			font-weight: 300;
			color: $light;
		}

		&__title {
			font-size: 28px;
		}

		&__genre {
			span {
				margin-right: 4px;

				&::after {
					content: ",";
				}

				&:last-child {
					margin-right: 0;

					&::after {
						display: none;
					}
				}
			}
		}
	}
}
</style>
