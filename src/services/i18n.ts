import { get, derived, writable } from "svelte/store";
import {
	addMessages,
	locale,
	init,
	dictionary,
	_,
	getLocaleFromNavigator
} from "svelte-i18n";
import { locales, fallbackLocale } from "../config/l10n";

let _activeLocale: string;
const isDownloading = writable(false);

const MESSAGE_FILE_URL_TEMPLATE = "/lang/{locale}.json";

function setupI18n(targetLocale?: string): void {
	const supportedLocale = supported(targetLocale
		|| language(getLocaleFromNavigator()));

	// initialize svelte-i18n
	init({
		initialLocale: supportedLocale,
		fallbackLocale: fallbackLocale
	});

	// don't re-download translation files
	if (!hasLoadedLocale(supportedLocale)) {
		isDownloading.set(true);

		const messagesFileUrl =
			MESSAGE_FILE_URL_TEMPLATE.replace(
				"{locale}",
				supportedLocale,
			);

		// download translation file for given locale/language
		loadJson(messagesFileUrl)
			.then((messages) => {
				_activeLocale = supportedLocale;
				addMessages(supportedLocale, messages);
				locale.set(supportedLocale);
				isDownloading.set(false);
			});
	}
}

async function loadJson(url: string): Promise<any> {
	const response = await fetch(url);
	return response.json();
}

function hasLoadedLocale(locale: string): any {
	// if the svelte-i18n dictionary has an entry for the
	// locale, then the locale has already been added
	return get(dictionary)[locale];
}

const isLocaleLoaded = derived(
	[isDownloading, dictionary],
	([$isDownloading, $dictionary]) =>
		!$isDownloading &&
		$dictionary[_activeLocale] &&
		Object.keys($dictionary[_activeLocale]).length > 0,
);

// retrieve the "language" part of a locale
function language(locale: string): string {
	return locale.replace("_", "-").split("-")[0];
}

function supported(locale: string): string {
	if (Object.keys(locales).indexOf(locale) > -1) {
		return locale;
	}

	return fallbackLocale;
}

// we expose the svelte-i18n _ store so that our app has
// a single API for i18n
export { _, setupI18n, isLocaleLoaded, locale };