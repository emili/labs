import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		place: 'my lab! 🔬'
	}
});

export default app;
