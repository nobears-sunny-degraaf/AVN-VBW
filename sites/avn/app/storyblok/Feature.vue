<script setup lang="ts">
import type { FeatureBlok } from "#base/types/blocks";

defineProps<{ blok: FeatureBlok }>();
</script>

<template>
	<UCard v-editable="blok" variant="subtle">
		<div class="flex items-start gap-3">
			<UBadge color="primary" variant="soft" size="sm">AVN</UBadge>
			<span class="font-medium text-highlighted">{{ blok.name }}</span>
		</div>
	</UCard>
</template>
