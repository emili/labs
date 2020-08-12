import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		place: "app.place"
	}
});

export default app;
