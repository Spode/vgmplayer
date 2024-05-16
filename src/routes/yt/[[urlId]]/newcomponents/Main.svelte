<script lang="ts">
	export let data;
	import Player from './Player.svelte';
	import Songs from './Songs.svelte';
	import Albums from './Albums.svelte';
	import Buttons from './Buttons.svelte';
	import type { YouTubePlayer } from 'youtube-player/dist/types';
	import type { youtube_v3 } from '@googleapis/youtube';

	let player: YouTubePlayer;
	let activeAlbums = new Map<string, youtube_v3.Schema$Playlist>();

	let currentSong: MyVideo;

	data.videos.map((element) => {
		element.playing = false;
	});

	interface MyVideo extends youtube_v3.Schema$Video {
		playing: boolean;
		// Additional properties and methods specific to the extended interface
	}

	$: activeSongs = data.videos.filter((element) => {
		return (
			activeAlbums.has(element.album.snippet.title) && element.contentDetails.duration.includes('M')
		);
	});

	$: longSongs = data.videos.filter((element) => {
		return element.contentDetails.duration.includes('M');
	});

	$: songslength = longSongs.length;

	const albumBlackListIncludes = [
		'unravel',
		'disco elysium',
		'rabbids',
		'chaos theory',
		'neotokyo'
	];
	const albumBlackListExact = ['dusk'];

	$: filteredAlbums = data.playlists.filter((element) => {
		let foundBad = false;
		albumBlackListIncludes.forEach((element2) => {
			if (element.snippet.title.toLowerCase().includes(element2)) {
				foundBad = true;
			}
		});

		if (foundBad || albumBlackListExact.includes(element.snippet.title.toLowerCase())) {
			return false;
		} else {
			return true;
		}
	});

	function playSong(song) {
		player.loadVideoById(song.id);
		if (currentSong) {
			currentSong.playing = false;
		}
		currentSong = song;
		song.playing = true;

		data.videos = data.videos;
	}

	function playNextSong() {
		if (currentSong) {
			currentSong.playing = false;
		}

		const nextSongIndex = (activeSongs.indexOf(currentSong) + 1) % activeSongs.length;
		const nextSong = activeSongs[nextSongIndex];

		const dom = document.querySelectorAll('.songs > div > button')[nextSongIndex];
		dom.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
		playSong(nextSong);
	}
</script>

<div class="container flex h-full w-full flex-col justify-center">
	<div
		class="grid h-full w-full flex-auto grid-cols-1 grid-rows-3 items-center gap-4 xl:max-h-[70%] xl:grid-cols-2 xl:grid-rows-2"
	>
		<Player
			bind:player
			on:currentsongended={() => {
				playNextSong();
			}}
		/>

		<Albums bind:songs={data.videos} bind:activeAlbums albums={filteredAlbums} />

		<Songs
			{songslength}
			songs={activeSongs}
			on:songclicked={(event) => {
				const song = event.detail;
				playSong(song);
			}}
		/>

		<Buttons bind:activeAlbums albums={filteredAlbums} />
	</div>
</div>
