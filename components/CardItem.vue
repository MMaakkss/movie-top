<template>
	<NuxtLink class="card" :to="`/movie/${movie.id}`">
		<div class="card__overview overview">
			<img class="card__img" :src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`" :alt="movie.title" />
			<p class="card__overview-description">{{ movie.overview }}</p>
			<p class="card__rating"><img class="icon" src="@/assets/img/star.svg" alt="star" />{{ movie.vote_average }}</p>
		</div>
		<div class="card__info">
			<p class="title">{{ movie.title }}</p>
			<p class="date">Released: {{ date }}</p>
		</div>
	</NuxtLink>
</template>

<script setup>
const props = defineProps({ movie: Object });

const date = computed(() =>
	new Date(props.movie.release_date).toLocaleString("en-us", {
		month: "long",
		day: "numeric",
		year: "numeric",
	})
);
</script>

<style lang="scss" scoped>
.card {
	max-width: 280px;
	width: 100%;
	padding: 8px 8px 24px;
	background: rgba(32, 40, 62, 0.8);
	backdrop-filter: blur(40px);
	border-radius: 12px;
	box-sizing: border-box;

	&__overview {
		position: relative;
		overflow: hidden;

		&:hover {
			.card__overview-description {
				bottom: 0;
			}
		}

		&-description {
			max-height: 60%;
			overflow: auto;
			padding: 10px;
			position: absolute;
			bottom: -100%;
			background-color: $primary;
			transition: 0.5s;
			line-height: 1.5;
			letter-spacing: 1.2px;

			&::-webkit-scrollbar {
				display: none;
			}
		}
	}

	&__img {
		display: block;
		max-width: 100%;
		min-height: 396px;
	}

	&__info {
		padding: 0 8px;
		.title {
			font-size: 16px;
			margin-top: 15px;
			font-weight: 600;
		}

		.date {
			color: $gray;
			font-size: 14px;
		}
	}

	&__rating {
		display: flex;
		align-items: center;
		gap: 4px;
		position: absolute;
		top: 10px;
		left: 8px;
		padding: 8px;
		background: rgba(0, 0, 0, 0.65);
		backdrop-filter: blur(4px);
		border-radius: 8px;
		color: $orange;

		.icon {
			margin-top: -2px;
		}
	}
}
</style>
