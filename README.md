# Lika Holi · Tid & underlag

Tidrapportering med synkronisering mellan mobil och dator, veckosummering och manuell fakturahistorik.

App: https://likaholi.github.io/lika-holi-tid/

## Logga in

Skapa ett konto med mejladress och lösenord, bekräfta mejlet och använd samma konto på alla enheter. Konton är åtskilda genom Supabase Auth och Row Level Security. Ingen OpenAI-tjänst krävs för att använda appen.

## Flytta gamla uppgifter

Gamla lokala poster i `lika-holi-tid-local-v1` behålls orörda. Efter inloggning erbjuder appen en överföringsknapp på varje enhet som har gamla uppgifter. Identiska poster hoppas över. Olika poster med samma id kopieras med nya id:n och kundkopplingarna följer med. Ta gärna en JSON-säkerhetskopia före överföring. Poster som registrerats separat på två enheter kan behöva kontrolleras för dubbletter.

## Synkronisering

Rapporter sparas direkt till databasen. Internet krävs för att spara. Appen hämtar senaste uppgifter när du återvänder till den, varje minut när den är synlig och när du trycker Synkronisera. Fel ger tydlig återkoppling; appen påstår inte att en misslyckad skrivning har sparats lokalt. Databasfunktionen sparar flera dagar atomiskt och kontrollerar versionsnummer för att förhindra tyst överskrivning. Vid konflikt: synkronisera, granska och öppna rapporten på nytt innan du sparar igen.

## Projekt och kostnad

GitHub Pages och Supabase-organisationen använder gratisplaner. Supabase-projektet `sgvdqukglzhrujntrarx` ligger i Stockholm (`eu-north-1`). Organisationen har verifierats som `free` och projektkostnaden som 0 per månad vid skapandet. Ingen betalplan är aktiverad. Gratisplanernas kvoter gäller; Supabase kan pausa inaktiva projekt. Uppgradera inte för detta projekt utan ägarens uttryckliga godkännande.

## Auth-konfiguration före drift

I Supabase → Authentication → URL Configuration: ange `https://likaholi.github.io/lika-holi-tid/` som Site URL och tillåten Redirect URL. Mejl/lösenord och mejlbekräftelse ska vara aktiverade. Kontrollera leverans av bekräftelse- och återställningsmejl; Supabase inbyggda mejltjänst har begränsningar och är inte en garanterad SMTP-tjänst. Appen kan inte betraktas som färdigtestad för inloggning innan detta har verifierats.

Endast en publishable browser key finns i koden. Den ger ingen behörighet till användarposter utan giltig inloggning och RLS. Lägg aldrig service_role, hemlig API-nyckel eller databaslösenord i koden.

## Databas

Schema och åtkomstregler: `supabase/migrations/20261022_create_private_time_records.sql`. Migrationen är applicerad på projektet. Databasens användarisolering, versionskonflikter och atomisk rollback har testats i en transaktion som rullades tillbaka; inga testkonton eller testposter har lämnats kvar. Supabase säkerhetsrådgivare rapporterade inga databasvarningar vid kontrollen.

## Utveckling och publicering

Node 22.13+ och npm. `npm ci`, `npm test`, `npm run build`. Färdigbyggda filer i `docs/` publiceras av GitHub Pages från `main` och `/docs`. Vid ändringar: ersätt innehållet i `docs/` med `dist/` och behåll `.nojekyll`. Publicering kan köas av GitHub; verifiera den publika versionen innan en ändring anges som tillgänglig.

## Fakturering

Välj kund och period, kopiera underlaget till en faktura som du själv skapar i Bokio och markera sedan perioden manuellt som fakturerad. Fakturanummer, fakturadatum och period sparas. Detta är ingen direktintegration med Bokio och fakturerad betyder inte betald. Veckor följer ISO-veckor, måndag–söndag.
