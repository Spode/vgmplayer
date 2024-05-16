<script lang="ts">
	export let albums, activeAlbums;
	import { toggleMode, mode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Sun, Moon } from 'lucide-svelte';
</script>

<div class="flex">
	<Button on:click={toggleMode}>
		{#if $mode === 'light'}
			<div class="flex flex-row gap-2">
				<Moon />toggle dark
			</div>
		{:else}
			<div class="flex flex-row gap-2">
				<Sun />toggle light
			</div>
		{/if}

		<span class="sr-only">Toggle theme</span>
	</Button>
	<Button
		class="h-8"
		on:click={() => {
			albums.forEach((element) => {
				activeAlbums.set(element.snippet.title, element);
				activeAlbums = activeAlbums;
			});
		}}>play all albums</Button
	>
	<Button
		class="h-8"
		on:click={() => {
			activeAlbums.clear();
			activeAlbums = activeAlbums;
		}}>clear all albums</Button
	>
</div>
