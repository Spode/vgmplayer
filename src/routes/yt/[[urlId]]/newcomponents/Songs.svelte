<script lang="ts">
	export let songs, songslength;
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import { Button } from '$lib/components/ui/button';
	import { createEventDispatcher } from 'svelte';
	import { ExternalLink } from 'lucide-svelte';
	const dispatch = createEventDispatcher();
</script>

<div class="inter row-span-1 flex h-full w-full flex-col overflow-auto">
	<p class="py-2 text-center text-xl font-semibold" style="text-shadow: 1px 1px 3px black;">
		songs: {songs.length} / {songslength}
	</p>
	<ScrollArea class="h-full w-full">
		<!-- <Separator orientation="vertical" class="mx-4" /> -->
		<div class="songs flex h-full flex-col overflow-auto px-4">
			{#each songs as song}
				<div
					class="flex h-12 flex-row items-center justify-between xl:h-20 {song.playing
						? 'bg-blue-400/40'
						: ''}"
				>
					<button
						class="flex h-full w-10/12 flex-row items-center gap-2 text-left"
						on:click={() => {
							dispatch('songclicked', song);
							console.log(song);
						}}
					>
						<div class="flex flex-row gap-2">
							<img
								class="h-10 w-10 rounded-lg object-cover shadow-lg shadow-gray-800 xl:h-16 xl:w-16"
								src={song.snippet.thumbnails.medium.url}
								alt=""
							/>
							<div class="flex flex-col" style="text-shadow: 1px 1px 3px black;">
								<span class="font-bold xl:text-2xl">{song.snippet.title}</span>
								<span class="font-medium">{song.album.snippet.title}</span>
							</div>
						</div></button
					>
					<Button href="https://youtu.be/{song.id}" class="flex " variant="link"
						><ExternalLink class="h-10 w-10  text-red-400" /></Button
					>
				</div>

				<Separator class="my-1 bg-black/20" />
			{/each}
		</div>
	</ScrollArea>
</div>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
		rel="stylesheet"
	/>

	<style>
		.inter {
			font-family: 'Inter', sans-serif;
			font-optical-sizing: auto;
			font-style: normal;
			font-variation-settings: 'slnt' 0;
		}
	</style>
</svelte:head>
