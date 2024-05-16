<script lang="ts">
	export let data, form;
	import { enhance } from '$app/forms';
	import { confetti } from '@neoconfetti/svelte';
</script>

<form method="POST" action="?/guessChamp" use:enhance>
	<p>YOUR GUESS: <span class="text-green-400">{form?.guess}</span></p>
	<label>
		add a todo:
		<input class="text-black" name="guess" value={form?.guess ?? ''} autocomplete="off" required />
	</label>

	<button aria-label="Mark as complete" class="rounded-xl bg-blue-400 p-8 font-semibold"
		>GUESS IT</button
	>
</form>

<h2>{form?.randomChamp.name ?? ''}</h2>

<form method="POST" action="?/loadNew" use:enhance>
	<button aria-label="Mark as complete" class="rounded-xl bg-blue-400 p-8 font-semibold"
		>LOAD THE NEW THING</button
	>
</form>

<svelte:head>
	<title>guesslol</title>
</svelte:head>
