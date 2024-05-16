<script>
	import '../app.pcss';
	import { ModeWatcher } from 'mode-watcher';
</script>

<ModeWatcher />

<main
	class="h-full w-full bg-[url('/pexels-davidriano-975771.jpg')] bg-cover text-white dark:bg-[url('/laura-adai-bzoaODQfIv8-unsplash.jpg')]"
>
	<slot></slot>
</main>
