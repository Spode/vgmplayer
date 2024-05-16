<script>
	import { onMount } from 'svelte';
	import * as Resizable from '$lib/components/ui/resizable';

	export let data;

	let newColorScheme = '';
	onMount(() => {
		console.log('DATA IS', data);
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			newColorScheme = '&darkpopout';
		}
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
			newColorScheme = event.matches ? '&darkpopout' : '';
		});
		data.streams.forEach((element) => {
			new Twitch.Player(element.name, {
				channel: element.name,
				autoplay: true,
				muted: true
			});
		});
	});
</script>

<Resizable.PaneGroup direction="vertical">
	{#each data.streams as thing, i}
		<Resizable.Pane class="flex h-full w-full">
			<div class="flex h-full w-full">
				<iframe
					class="basis-1/5"
					frameborder="0"
					src="https://www.twitch.tv/embed/{thing.name}/chat?parent=localhost{newColorScheme}"
					title={thing.name}
				></iframe>

				<div class="flex-auto" id={thing.name}></div>
			</div>
		</Resizable.Pane>
		{#if i % 2 == 0}
			<Resizable.Handle />
		{/if}
	{/each}
</Resizable.PaneGroup>

<svelte:head>
	<title>twitch streams batman</title>
	<link rel="icon" type="image/x-icon" href="/twitch-logo-duotone.png" />
	<style>
		iframe {
			height: 100%;
			width: 100%;
		}
	</style>
	<script src="https://player.twitch.tv/js/embed/v1.js"></script>
</svelte:head>
