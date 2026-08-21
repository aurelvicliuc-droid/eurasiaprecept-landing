# Precept Eurasia

Site-ul de prezentare al Institutului de Studiu Biblic Precept Eurasia:
programele de formare, harta filialelor, magazinul si formularul de contact.

## Stiva

- **Next.js 16.2.9**, App Router, build cu Turbopack
- **React 19.2**
- **Tailwind CSS v4**, tokenurile de brand in `src/app/globals.css`
- **Founders Grotesk**, gazduit local in `src/app/fonts/` prin `next/font/local`.
  Fisierele `.woff2` au fost completate manual cu glifele ț/Ț, care lipseau din
  familia originala, deci nu se pot re-descarca de la turnatorie
- **framer-motion** prin `LazyMotion` + componenta `m` (vezi `src/app/Providers.tsx`)
- **leaflet** + **react-leaflet** pentru harta filialelor
- **Resend** pentru formularul de contact

## Limbi

Romana, engleza si rusa, dintr-un context React (`src/lib/i18n/`), nu prin rutare
pe adresa. Toate cele trei limbi sunt in aceeasi pagina si comutarea e instanta.
Consecinta: engleza si rusa nu au adrese proprii, deci nu sunt indexabile separat
si nu au sens `hreflang` sau `lang` in HTML-ul servit (`<html lang>` se
actualizeaza pe client cand se schimba limba).

## Adresa canonica

`https://www.eurasiaprecept.org`, definita intr-un singur loc, `src/lib/site.ts`.
Apex-ul raspunde cu 308 catre www, deci canonical, sitemap si robots trebuie sa
foloseasca www. Daca cineva inverseaza redirectul in Vercel, se schimba doar
fisierul acela.

## Comenzi

```bash
npm run dev        # server de dezvoltare
npm run build      # build de productie
npm run start      # ruleaza build-ul
npm run lint       # eslint, trebuie sa iasa curat
npm run typecheck  # tsc --noEmit
```

## Variabile de mediu

| Nume | Pentru ce |
|---|---|
| `RESEND_API_KEY` | trimiterea mesajelor din formularul de contact, prin `/api/contact` |

## Structura

```
src/app/            rute, layout, metadata, sitemap, robots, ruta de contact
src/components/     sections/ (blocurile paginii), layout/, ui/, modals/
src/lib/            programs-data.ts (sursa unica pentru programe), i18n/, locations.ts
public/             fotografii, brosuri si formulare
```

Deploy pe Vercel, din `main`.
