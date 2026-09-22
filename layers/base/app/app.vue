<script setup lang="ts">
const { label } = useSite();
const currentYear = new Date().getFullYear();

useHead({
	titleTemplate: (title?: string) => (title ? `${title} — ${label}` : label),
});
</script>

<template>
	<UApp>
		<div class="flex min-h-screen flex-col bg-default text-default">
			<AppHeader />
			<main class="flex-1">
				<NuxtPage />
			</main>
			<footer class="border-t border-default">
				<UContainer class="py-6 text-sm text-muted">
					{{ label }} — all rights reserved © {{ currentYear }}
				</UContainer>
			</footer>
		</div>
	</UApp>
</template>
