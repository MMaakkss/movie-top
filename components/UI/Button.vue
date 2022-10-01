<template>
	<NuxtLink class="link" :to="link">
		<slot></slot>
	</NuxtLink>
</template>
<script setup>
const props = defineProps({
	link: String,
});
</script>
<style lang="scss" scoped>
.link {
	display: block;
	width: fit-content;
	margin-bottom: 20px;
	padding: 8px 30px;
	border: 1px solid $orange_red;
	transition: 0.2s;

	&:hover {
		background-color: $orange_red;
	}
}
</style>
