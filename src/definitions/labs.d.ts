declare namespace Emili {
	namespace Labs {
		namespace Configuration {
			/** Specifies the badge shown on an entry to highlight it in some way. */
			const enum Badge {
				/** No special badge is shown. */
				None,

				/** Marks this as a [stable] recently added entry. */
				New,

				/** Marks this as an alpha version, so it can be incomplete, unstable, or contain bugs. */
				Alpha,

				/** Marks this as a beta version, the test stage before being widely released. */
				Beta
			}

			/** Outlines the translated values of a simple writing, forcing a fallback language. */
			interface Translation {
				ca?: string;
				en: string;
				es?: string;
			}

			/** Defines the structure of an entry point to a lab. */
			interface EntryManifest {
				/** Gets the internal identifier for this record. */
				codename: string;

				/** Gets the localized object for the name of this entry. */
				title: Translation;

				/** Gets the localization object for a short description of this lab. */
				description: Translation;

				/** Gets the path to the lab. */
				path: string;

				/** Gets the URL of the picture of this entry. */
				iconUrl?: string;

				/** Gets the version number of this lab. */
				version: string;

				/** Gets author's details for proper attribution. */
				author: EntryManifestAuthor;

				/** Gets the date this lab was first published. */
				createdOn: Date;

				/** Gets the date this lab was last updated. */
				lastUpdatedOn: Date;

				/** Gets the color for the background of the entry. */
				backColor?: string;

				/** Gets the color for the text and icon of the entry. */
				foreColor?: string;

				/** Gets the badge, if any, that will be displayed over the entry. */
				badge?: Badge;
			}

			/** Outlines the attributes required to describe the author of a lab.  */
			interface EntryManifestAuthor {
				/** Gets the name for author attribution. */
				name: string;

				/** Gets the author's contact URI for proper attribution. */
				uri?: string;
			}

			namespace DynamicsCompanion {
				/** Specifies whether a lab needs a connection to the Dynamics platform to properly work. */
				const enum ConnectivityLevel {
					/** This lab can fully work while offline. */
					NotRequired,

					/** Despite it could be helpful in some way, a connection is not required. */
					Recommended,

					/** A connection is absolutely required for this lab.  */
					Required
				}

				/** Specifies the context(s) in which a lab is meant to be executed. */
				const enum ExecutionContext {
					/** This lab works in an entity record form. */
					EntityRecord = 1,

					/** This lab works in an entity list, or view. */
					EntityList = 1 << 1,

					/** This lab works in a dashboard. */
					Dashboard = 1 << 2,

					/** This lab can work in any context. */
					Any = EntityRecord | EntityList | Dashboard
				}

				/** Defines the structure of an entry point to a lab in the Dynamics Companion subarea. */
				interface EntryManifest extends Configuration.EntryManifest {
					/** Gets a value stating whether a connection to the platform is required. */
					connectivity: ConnectivityLevel;

					/** Gets a value that defines the valid context(s) of execution for this lab. */
					context: ExecutionContext;
				}
			}
		}
	}
}