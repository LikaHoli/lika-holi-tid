# Lika Holi · Tid & underlag

Fristående webbapp för kunder, tidrapporter, körning och fakturaunderlag till Bokio. Vite/React och Supabase. Appen behöver inget ChatGPT-konto, ingen Sites-hosting och ingen OpenAI-tjänst.

## Status

Koden är förberedd för extern publicering. Ett Supabase-projekt och en Vercel-publicering måste konfigureras innan inloggning och sparande fungerar. Den gamla ChatGPT-hostade versionen är separat; dess uppgifter flyttas inte automatiskt.

## Publicera

1. Skapa ett Supabase-projekt, gärna i EU. Kör `supabase/migrations/202610220001_records.sql` i projektets SQL Editor en gång.
2. Under Authentication: aktivera mejl/lösenord, inaktivera nya publika registreringar och konfigurera lösenordskrav på minst 12 tecken. Skapa ditt användarkonto i Supabase (Users → Add user) eller skicka en inbjudan till din mejladress efter steg 5. Skriv aldrig lösenord i GitHub.
3. Importera detta GitHub-repository i Vercel. Välj Vite, byggkommando `npm run build`, output `dist`.
4. Ange `VITE_SUPABASE_URL` och `VITE_SUPABASE_PUBLISHABLE_KEY` i Vercels miljövariabler. Använd projektets publika publishable key (eller legacy anon key). Använd ALDRIG service_role/secret key i frontend. Bygg om efter ändringar.
5. Under Supabase Authentication → URL Configuration: ange den slutliga HTTPS-adressen som Site URL och tillåten redirect URL. För lösenordsåterställning och inbjudan ska appens rotadress vara tillåten. Konfigurera egen SMTP för tillförlitlig mejlleverans.
6. Kontrollera inloggning, en provkund, sparande och omladdning, fakturastatus, utloggning och lösenordsåterställning. Kontrollera med ett andra testkonto att användarna inte ser varandras poster. Radera testuppgifter efter kontroll.

Supabase Row Level Security begränsar alla läsningar och skrivningar till inloggad användares ägar-id. Utloggade besökare har ingen åtkomst till poster. GitHub och Vercel lagrar inte databasens kundposter i källkoden.

## Flytta befintliga uppgifter

Ladda ner JSON-säkerhetskopian från den gamla appen innan flytten. Logga in i den nya appen och välj **Importera säkerhetskopia** längst ner. Granska antal, kunder och totalsummor. Importen ersätter eventuella poster med samma id och lämnar andra poster kvar. Gamla appen fortsätter vara separat tills du slutar använda den.

## Utveckling

Node.js 22.13+ och npm. Kopiera `.env.example` till `.env.local`, fyll i Supabase-projektets publika konfiguration och kör:

```sh
npm ci
npm run dev
npm test
npm run build
```

Ingen databas eller hemlig nyckel ingår i repositoryt. UI och validering kan byggas och testas utan ett aktivt Supabase-projekt; inloggning och databasflödet måste verifieras mot det konfigurerade projektet före faktisk användning.

## Bokio

Välj kund, datum och fakturastatus. Kopiera underlaget eller exportera CSV. Skapa fakturan i Bokio och markera därefter rapporterna som fakturerade. Ingen direktintegration eller automatisk fakturaskapning är aktiverad. Moms hanteras i Bokio utifrån uppdragets förutsättningar.

## Hosting

Vercel är förkonfigurerat i `vercel.json`. Eftersom appen bygger till statiska filer kan den även hostas på annan HTTPS-hosting med samma Supabase-projekt. En egen domän kan läggas till och pekas till hostingen; uppdatera då Supabase-redirectadresserna. GitHub-ändringar kan publiceras automatiskt när Vercel-kopplingen är upprättad.
