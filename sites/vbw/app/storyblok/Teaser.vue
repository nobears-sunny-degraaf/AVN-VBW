<script setup lang="ts">
import type { TeaserBlok } from "#base/types/blocks";

defineProps<{ blok: TeaserBlok }>();
</script>

<template>
	<section
		v-editable="blok"
		class="border-b border-default bg-primary text-inverted"
	>
		<UContainer class="py-20 sm:py-28">
			<p class="text-sm font-semibold uppercase tracking-widest opacity-75">
				VBW
			</p>
			<h1
				class="mt-3 text-balance text-4xl font-bold tracking-tight sm:text-6xl"
			>
				{{ blok.headline }}
			</h1>
		</UContainer>
	</section>
</template>
