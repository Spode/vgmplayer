<script lang="ts">
	import type { YouTubePlayer } from 'youtube-player/dist/types.js';
	import { onMount } from 'svelte';

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let windowRef: any;

	export let player: YouTubePlayer;
	onMount(() => {
		windowRef = window;
		if (typeof windowRef.YT != 'undefined') {
			player = new windowRef.YT.Player('denkPlayer', {
				events: {
					// onReady: onPlayerReady
					onStateChange: onPlayerStateChange,
					onError: onError
				}
			});
		}
	});

	function onError(event: any) {
		console.log('ERROR HAPPEND', event);

		console.log(event.target?.playerInfo?.videoData);
	}

	function onPlayerStateChange(event: any) {
		if (event.data == windowRef.YT.PlayerState.ENDED) {
			dispatch('currentsongended');
		}
	}
</script>

<iframe
	allowfullscreen
	id={'denkPlayer'}
	class="row-span-1 h-auto w-full justify-self-center xl:row-span-2 xl:aspect-square"
	src="https://www.youtube.com/embed/{'vmqMx0FKiz4'}?enablejsapi=1"
	title="ytIframe"
></iframe>

<svelte:head>
	<script src="https://www.youtube.com/iframe_api"></script>
</svelte:head>
