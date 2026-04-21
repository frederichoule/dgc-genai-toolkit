import 'vanilla-cookieconsent/dist/cookieconsent.css';
import { run, showPreferences } from 'vanilla-cookieconsent';
import { getLocale } from '$lib/paraglide/runtime';

declare global {
	interface Window {
		gtag?: (...args: unknown[]) => void;
	}
}

function updateGoogleConsent(acceptedCategories: string[]) {
	const granted = acceptedCategories.includes('analytics') ? 'granted' : 'denied';
	window.gtag?.('consent', 'update', {
		analytics_storage: granted
	});
}

export function initCookieConsent() {
	run({
		guiOptions: {
			consentModal: { layout: 'box', position: 'bottom right', equalWeightButtons: true },
			preferencesModal: { layout: 'box', equalWeightButtons: true }
		},
		categories: {
			necessary: { enabled: true, readOnly: true },
			analytics: {
				autoClear: {
					cookies: [{ name: /^_ga/ }, { name: '_gid' }]
				}
			}
		},
		language: {
			default: getLocale(),
			autoDetect: 'document',
			translations: {
				en: {
					consentModal: {
						title: 'We use cookies',
						description:
							'We use cookies to measure usage and improve this site. You can accept all, reject non-essential, or manage your preferences.',
						acceptAllBtn: 'Accept all',
						acceptNecessaryBtn: 'Reject non-essential',
						showPreferencesBtn: 'Manage preferences'
					},
					preferencesModal: {
						title: 'Cookie preferences',
						acceptAllBtn: 'Accept all',
						acceptNecessaryBtn: 'Reject non-essential',
						savePreferencesBtn: 'Save preferences',
						closeIconLabel: 'Close',
						sections: [
							{
								title: 'Strictly necessary',
								description:
									'These cookies are required for the site to function. They cannot be disabled.',
								linkedCategory: 'necessary'
							},
							{
								title: 'Analytics',
								description:
									'Anonymous usage data (Google Analytics) used to understand how the site is used and to improve it.',
								linkedCategory: 'analytics'
							}
						]
					}
				},
				fr: {
					consentModal: {
						title: 'Utilisation de témoins',
						description:
							'Nous utilisons des témoins (cookies) pour mesurer la fréquentation et améliorer ce site. Vous pouvez tout accepter, refuser les témoins non essentiels, ou gérer vos préférences.',
						acceptAllBtn: 'Tout accepter',
						acceptNecessaryBtn: 'Refuser les non essentiels',
						showPreferencesBtn: 'Gérer les préférences'
					},
					preferencesModal: {
						title: 'Préférences de témoins',
						acceptAllBtn: 'Tout accepter',
						acceptNecessaryBtn: 'Refuser les non essentiels',
						savePreferencesBtn: 'Enregistrer',
						closeIconLabel: 'Fermer',
						sections: [
							{
								title: 'Strictement nécessaires',
								description:
									'Ces témoins sont indispensables au fonctionnement du site. Ils ne peuvent pas être désactivés.',
								linkedCategory: 'necessary'
							},
							{
								title: 'Statistiques',
								description:
									'Données d’utilisation anonymes (Google Analytics) qui nous aident à comprendre l’utilisation du site et à l’améliorer.',
								linkedCategory: 'analytics'
							}
						]
					}
				}
			}
		},
		onConsent: ({ cookie }) => {
			updateGoogleConsent(cookie.categories);
		},
		onChange: ({ cookie }) => {
			updateGoogleConsent(cookie.categories);
		}
	});
}

export function showCookiePreferences() {
	showPreferences();
}
