/*
import * as Sentry from "@sentry/browser";
import {Integrations} from "@sentry/tracing";

Sentry.init({
    dsn: "https://bb9d39853f9746e39c0a0d06872ad3ff@o282582.ingest.sentry.io/6161921",
    integrations: [new Integrations.BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});

Sentry.addGlobalEventProcessor((event, hint) => {
    if (event.level == 'error') {
        let message = event.exception?.values ? event.exception?.values[0].value : '';
        ui.notifications?.error(`Une erreur c'est produite. Voir la console [F12] pour plus d'informations: ${message}`);
    }
    return event;
})
*/
