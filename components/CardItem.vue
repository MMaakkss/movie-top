<template>
	<div class="card">
		<div class="card__overview overview">
			<img
				class="card__img"
				:src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`"
				height="440"
				width="290"
				:alt="movie.title"
			/>
			<p class="card__overview-description">{{ movie.overview }}</p>
		</div>
		<p class="card__title">{{ movie.title }}</p>
		<p class="card__date">Released: {{ date }}</p>
		<p class="card__rating">{{ movie.vote_average }}</p>
		<div class="card__link">
			<Button :link="`/${movie.id}`">More Info</Button>
		</div>
	</div>
</template>

<script setup>
import Button from "./UI/Button.vue";
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
	width: fit-content;
	overflow: hidden;
	max-width: 290px;
	padding-bottom: 20px;
	position: relative;
	display: flex;
	flex-direction: column;

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
			background-color: #c92201ec;
			transition: 0.5s;
			line-height: 1.5;

			&::-webkit-scrollbar {
				display: none;
			}
		}
	}
	&__img {
		display: block;
	}

	&__title {
		font-size: 24px;
		margin-top: 15px;
		font-weight: 400;
	}

	&__date {
		color: $gray;
		font-size: 18px;
	}

	&__link {
		margin-top: 15px;
		flex: 1;
		display: flex;
		align-items: flex-end;
	}

	&__rating {
		font-size: 20px;
		font-weight: 300;
		text-align: center;
		position: absolute;
		top: 0;
		right: 0;
		width: 50px;
		padding: 10px 0;
		background-color: $orange_red;
		border-radius: 0 0 0 20px;
	}
}
</style>
