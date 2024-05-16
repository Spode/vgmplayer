<script>
	import { onMount } from 'svelte';
	import Main from './newcomponents/Main.svelte';
	export let data;
	onMount(() => {
		console.log('DATA IS ', data);
	});
</script>

{#if data.playlists && data.videos}
	<Main bind:data />
{:else}
	<p>error somewhere yep</p>
{/if}

<svelte:head>
	<title>playmusic yep</title>
</svelte:head>
