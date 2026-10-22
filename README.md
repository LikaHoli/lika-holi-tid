# Lika Holi · Tid & underlag

En enkel fristående webbsida utan konto, databas eller abonnemang. Registrera kunder, timmar, mil, timpris och milersättning. Filtrera och kopiera fakturaunderlag till Bokio eller exportera CSV. Markera rapporter som fakturerade.

## Var sparas uppgifterna?

I den aktuella webbläsaren på den aktuella enheten (localStorage). Ingen automatisk synkronisering och ingen överföring av kundposter till GitHub. Alla som använder samma webbläsarprofil på din enhet kan öppna uppgifterna. Rensning av webbplatsdata kan radera journalen. Ladda ner JSON-säkerhetskopior regelbundet. Använd importen för att flytta till en annan enhet.

## Publicera på GitHub Pages

Färdigbyggda filer finns i `docs/`. För ett GitHub Free-konto behöver repositoryt vara offentligt för GitHub Pages. Det gör källkoden och dess historik offentlig, men webbläsarens lokala kunduppgifter ingår inte.

1. Om du accepterar offentlig källkod: Settings → General → Danger Zone → Change repository visibility → Public.
2. Settings → Pages → Build and deployment → Deploy from a branch.
3. Välj `main` och `/docs`, tryck Save.
4. Vänta på att GitHub visar den publicerade länken. Ingen länk är publicerad enbart genom att koden sparats.

Supabase och Vercel behövs inte för den här versionen.

## Utveckling

Node 22.13+, `npm ci`, `npm run dev`, `npm run build`. Vid ändringar: ersätt `docs/` med innehållet i `dist/` och behåll `docs/.nojekyll` innan du sparar till GitHub.

## Bokio

Underlaget kopieras manuellt. Ingen automatisk fakturaskapning. Välj rätt moms i Bokio för uppdraget.

## Registrera flera dagar

Välj Flera dagar, ange från- och tilldatum, välj om helger ska ingå och avmarkera eventuella lediga dagar. Timmar och mil gäller per vald dag. Totalen och eventuell varning för befintliga rapporter visas före bekräftelsen. Varje dag får en separat rapport som går att ändra efteråt.
