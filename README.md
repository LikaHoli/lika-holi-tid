# Lika Holi · Tid & underlag

Privat webbapp för kunder, tidrapporter, milersättning och fakturaunderlag till Bokio.

## Använd appen

https://lika-holi-tid.magicridge129.chatgpt.site

Lägg till kunder, registrera arbete och välj kund och period under Fakturaunderlag. Kopiera underlaget eller exportera CSV. Skapa fakturan manuellt i Bokio och markera sedan rapporterna som fakturerade.

## Teknik och utveckling

React, TypeScript och Vinext på Cloudflare Workers. D1 lagrar poster per inloggad användare. Privat åtkomst och ChatGPT-inloggning hanteras av Sites. Kräver Node.js >=22.13.0 och pnpm.

Kör `pnpm install --frozen-lockfile`, `pnpm dev` och `pnpm build`. Databasschema: `db/schema.ts`. Migrationer: `drizzle/`. Lokala migrationer appliceras enligt Sites-starterdokumentationen.

## Drift

GitHub innehåller källkoden. Kunduppgifter och rapporter lagras separat i appens databas. Appen kräver server, D1 och autentisering och kan därför inte köras på GitHub Pages. Publicering sker separat via Sites. Ändringar på GitHub publiceras inte automatiskt.
