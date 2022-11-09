<template>
	<Loading v-if="!movieImbd" />
	<div v-else>
		<div class="backdrop">
			<img class="backdrop__img" :src="`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`" :alt="movie.title" />
		</div>
		<div class="title">{{ movie.title }}</div>
		<div class="movie">
			<div class="movie__poster">
				<img :src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`" :alt="movie.title" />
			</div>
			<div class="movie__info info">
				<h2 class="info__tagline">{{ movie.tagline }}</h2>
				<p>
					Overview: <span>{{ movie.overview }}</span>
				</p>
				<p class="info__rating"><img class="icon" src="@/assets/img/star.svg" alt="star" />{{ movie.vote_average.toFixed(1) }}</p>
				<div>
					<p>Release Date:</p>
					<p class="info__data">{{
						new Date(movie.release_date).toLocaleString("en-us", {
							month: "long",
							day: "numeric",
							year: "numeric",
						})
					}}</p>
				</div>
				<div>
					<p>Run time</p>
					<p class="info__data">{{movie.runtime}} min</p>
				</div>
				<div class="info__genre">
					<p>Genre:</p>
					<p class="info__data">
						<span v-for="item in movie.genres" :key="item.id">{{ item.name }}</span>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
const config = useAppConfig();

const route = useRoute();
const movieId = route.params.id;

const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${config.apiKey}`;

const { data: movie } = await useFetch(url, { key: movieId });

let movieImbd = ref(false);

watch(
	movie,
	(newMovie) => {
		if (newMovie) {
			setTimeout(() => {
				movieImbd.value = true;
			}, 1000);
		} else {
			return navigateTo('/404')
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
.backdrop {
	width: 100%;
	height: 480px;
	border-radius: 40px;
	overflow: hidden;
	position: relative;

	&:before {
		content: "";
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: linear-gradient(180deg, rgba(54, 44, 146, 0.4) 0%, rgba(18, 98, 151, 0.4) 100%);
	}

	&__img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: top;
	}
}

.title {
	width: fit-content;
	font-weight: 600;
	font-size: 32px;
	padding: 40px 200px 40px 40px;
	background: rgba(32, 40, 62, 0.8);
	backdrop-filter: blur(12px);
	border-radius: 24px;
	margin: -45px 0 80px 80px;
}

.movie {
	display: flex;
	gap: 80px;
	padding: 0 80px;

	&__poster {
		width: 63%;

		img {
			max-width: 100%;
			border-radius: 24px;
		}
	}

	.info {
		display: flex;
		flex-direction: column;
		gap: 24px;
		width: calc(65% - 20px);
		color: $blue_gray;
		font-size: 20px;
		line-height: 32px;

		&__tagline {
			font-size: 28px;
			color: $white;
		}

		&__rating {
			display: flex;
			align-items: center;
			gap: 4px;
			width: fit-content;
			padding: 8px;
			background: rgba(0, 0, 0, 0.65);
			backdrop-filter: blur(4px);
			border-radius: 8px;
			color: $orange;

			.icon {
				margin-top: -2px;
			}
		}

		&__data {
			font-size: 20px;
			color: $light_gray;
			margin-top: 8px;
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
