/**
 * Adresa canonica a site-ului, intr-un singur loc.
 *
 * Atentie: apex-ul (eurasiaprecept.org) raspunde cu 308 catre www, deci daca
 * punem apex-ul in canonical, in sitemap si in robots, fiecare adresa pe care o
 * declaram ca fiind cea buna se redirecteaza spre alta. Declaram www, adica
 * exact ce serveste Vercel cu 200.
 */
export const BASE_URL = 'https://www.eurasiaprecept.org'
