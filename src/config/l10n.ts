const locales: Emili.Labs.Configuration.Translation = {
	ca: "Català",
	en: "English",
	es: "Español"
}

const fallbackLocale:
	keyof Emili.Labs.Configuration.Translation
	= "en";

export { locales, fallbackLocale };
