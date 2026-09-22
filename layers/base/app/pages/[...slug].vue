<script setup lang="ts">
const route = useRoute();
const { story } = await useSiteStory(route.params.slug as string[]);

if (!story.value) {
	throw createError({
		statusCode: 404,
		statusMessage: `Story not found for ${route.path}`,
		fatal: true,
	});
}

useHead({ title: computed(() => story.value?.name ?? "") });
</script>

<template>
	<StoryblokComponent v-if="story" :blok="story.content" />
</template>
