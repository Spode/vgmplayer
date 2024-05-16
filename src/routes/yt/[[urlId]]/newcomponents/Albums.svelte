<script lang="ts">
	export let songs, albums, activeAlbums: Map<string, youtube_v3.Schema$Playlist>;
	import * as ToggleGroup from '$lib/components/ui/toggle-group';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import { Input } from '$lib/components/ui/input/index.js';

	import type { youtube_v3 } from '@googleapis/youtube';

	let textValue = '';

	// The Fisher-Yates algorithm
	export function shuffleArray(array: any[]) {
		for (let i = array.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));
			const temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}

		return array;
	}

	$: textFilteredAlbums = albums.filter((element) => {
		return (
			element.snippet.title.toLowerCase().includes(textValue) ||
			((textValue == 'enabled' || textValue == 'active') && activeAlbums.has(element.snippet.title))
		);
	});
</script>

<div class="flex h-full w-full flex-col">
	<ScrollArea orientation="vertical" class="row-span-1 ">
		<div class="flex flex-wrap gap-4 overflow-auto">
			{#each textFilteredAlbums as album}
				<button
					class="aspect-square h-24 rounded-xl p-2 {activeAlbums.has(album.snippet.title)
						? 'bg-orange-400/60'
						: 'bg-transparent'}"
					on:click={() => {
						if (!activeAlbums.has(album.snippet.title)) {
							activeAlbums.set(album.snippet.title, album);
						} else {
							activeAlbums.delete(album.snippet.title);
						}
						activeAlbums = activeAlbums;
						songs = shuffleArray(songs);
					}}
				>
					<img
						class="h-30 aspect-square rounded-lg object-cover"
						src={album.snippet.thumbnails.medium.url}
						alt=""
					/>
				</button>
			{/each}
		</div>
	</ScrollArea>
	<Input type="albumSearch" placeholder="albumSearch" class="" bind:value={textValue} />
</div>
