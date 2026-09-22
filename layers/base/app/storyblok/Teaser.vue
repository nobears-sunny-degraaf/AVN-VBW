<script setup lang="ts">
import type { TeaserBlok } from "#base/types/blocks";

defineProps<{ blok: TeaserBlok }>();
</script>

<template>
	<section v-editable="blok" class="border-b border-default bg-elevated/40">
		<UContainer class="py-16 sm:py-24">
			<h1
				class="text-balance text-4xl font-bold tracking-tight text-highlighted sm:text-5xl"
			>
				{{ blok.headline }}
			</h1>
		</UContainer>
	</section>
</template>
