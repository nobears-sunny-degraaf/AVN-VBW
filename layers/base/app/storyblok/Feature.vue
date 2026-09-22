<script setup lang="ts">
import type { FeatureBlok } from "#base/types/blocks";

defineProps<{ blok: FeatureBlok }>();
</script>

<template>
	<UCard v-editable="blok">
		<div class="flex items-center gap-3">
			<span class="size-2 rounded-full bg-primary" />
			<span class="font-medium text-highlighted">{{ blok.name }}</span>
		</div>
	</UCard>
</template>
