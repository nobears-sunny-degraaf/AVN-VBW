<script setup lang="ts">
import type { PageBlok } from "#base/types/blocks";

defineProps<{ blok: PageBlok }>();
</script>

<template>
	<div v-editable="blok">
		<StoryblokComponent
			v-for="currentBlok in blok.body"
			:key="currentBlok._uid"
			:blok="currentBlok"
		/>
	</div>
</template>
