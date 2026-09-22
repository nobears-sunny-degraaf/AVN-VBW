<script setup lang="ts">
import type { NavLinkBlok } from "#base/types/blocks";

const props = defineProps<{ blok: NavLinkBlok }>();

const resolveLink = useSiteLink();
const to = computed(() => resolveLink(props.blok.link));
</script>

<template>
	<ULink
		v-editable="blok"
		:to="to"
		class="text-sm font-medium"
		active-class="text-primary"
		inactive-class="text-muted hover:text-default"
	>
		{{ blok.label }}
	</ULink>
</template>
