<script setup lang="ts">
import type { NavigationBlok } from "#base/types/blocks";

const { label } = useSite();
const { story } = await useSiteNavigation();

const links = computed(
	() => (story.value?.content as NavigationBlok | undefined)?.links ?? [],
);
</script>

<template>
	<header class="border-b border-default">
		<UContainer class="flex items-center justify-between gap-6 py-4">
			<NuxtLink to="/" class="text-lg font-bold tracking-tight text-highlighted">
				{{ label }}
			</NuxtLink>
			<nav v-if="links.length" class="flex items-center gap-4">
				<StoryblokComponent
					v-for="link in links"
					:key="link._uid"
					:blok="link"
				/>
			</nav>
		</UContainer>
	</header>
</template>
