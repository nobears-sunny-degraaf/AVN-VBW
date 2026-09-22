<script setup lang="ts">
import type { GridBlok } from "#base/types/blocks";

defineProps<{ blok: GridBlok }>();
</script>

<template>
	<UContainer v-editable="blok" class="py-12">
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			<StoryblokComponent
				v-for="currentBlok in blok.columns"
				:key="currentBlok._uid"
				:blok="currentBlok"
			/>
		</div>
	</UContainer>
</template>
