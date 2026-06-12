export interface CourseItem {
  title: string
  manual: string
  desc: string
}

export interface Outcome {
  title: string
  desc: string
}

export interface ProgramData {
  slug: string
  name: string
  tagline: string
  badge: string
  badgeColor: 'teal' | 'gold' | 'purple' | 'green'
  category: 'adolescenti' | 'tineri' | 'specializat'
  heroImage: string
  heroImageAlt: string
  overview: string
  whoCanApply: string[]
  documents: string[]
  curriculum: CourseItem[]
  structure: string[]
  outcomes?: Outcome[]
  ctaPrimary: { label: string; href: string }
  ctaSecondary?: { label: string; href: string }
  ctaTertiary?: { label: string; href: string }
  downloadLabel?: string
}

export const programs: ProgramData[] = [
  {
    slug: 'institutul-biblic',
    name: 'Institutul Biblic Precept',
    tagline: 'Formare biblică pentru lideri și slujitori',
    badge: 'Nivelul I',
    badgeColor: 'teal',
    category: 'tineri',
    heroImage: '/programs/institutul-biblic.jpg',
    heroImageAlt: 'Institutul Biblic Precept — studiu și formare',
    overview:
      'Institutul Biblic Precept este un program de pregătire spirituală și practică destinat credincioșilor care doresc să aprofundeze Cuvântul lui Dumnezeu, să crească în caracter și să fie echipați pentru slujire și formarea de ucenici.',
    whoCanApply: [
      'Persoane cu vârsta de 18 ani și peste',
      'Membri activi într-o biserică locală',
      'Persoane botezate',
      'Recomandate de pastorul sau liderul spiritual al bisericii locale',
    ],
    documents: ['Cerere de înscriere', 'Recomandare pastorală'],
    curriculum: [
      { title: 'Evanghelizare și Ucenicie', manual: '„Dumnezeule, exiști?"', desc: 'Învață cum să prezinți Evanghelia clar, biblic și relevant și cum să formezi ucenici care să-L urmeze pe Hristos.' },
      { title: 'Plantarea de Biserici', manual: '„Doamne, vreau să Te cunosc"', desc: 'Descoperă principiile biblice ale dezvoltării și multiplicării bisericilor.' },
      { title: 'Consiliere Spirituală', manual: '„Căsătorie fără regrete"', desc: 'Învață cum să oferi îndrumare biblică în diferite situații de viață.' },
      { title: 'Homiletică', manual: 'Iacov', desc: 'Dezvoltă abilitatea de a pregăti și transmite mesaje biblice clare și relevante.' },
      { title: 'Istoria Poporului Israel', manual: 'Daniel', desc: 'Înțelege planul lui Dumnezeu în istorie și relevanța lui pentru prezent.' },
      { title: 'Creșterea Bisericii', manual: 'Filipeni', desc: 'Studiază principiile biblice care contribuie la sănătatea și dezvoltarea bisericii.' },
      { title: 'Planificarea Timpului', manual: '2 Tesaloniceni', desc: 'Învață administrarea eficientă a timpului și priorităților în slujire și viața personală.' },
      { title: 'Doctrinele Bibliei', manual: 'Legământul', desc: 'Aprofundează doctrinele fundamentale ale credinței creștine.' },
      { title: 'Cum se studiază un subiect dificil în Biblie?', manual: 'Evanghelia după Ioan (Partea II)', desc: 'Dobândește instrumente practice pentru cercetarea și interpretarea pasajelor complexe din Scriptură.' },
    ],
    structure: [
      '3 ani de studiu',
      '3 sesiuni intensive pe an',
      '12 zile de studiu pentru fiecare sesiune',
      'Practică obligatorie de ucenicizare între sesiuni',
      'Examene și evaluări periodice',
    ],
    ctaPrimary: { label: 'Aplică la Institutul Biblic', href: '#contact' },
    ctaSecondary: { label: 'Descarcă recomandarea pastorală', href: '#contact' },
    downloadLabel: 'Descarcă formularul de recomandare pastorală',
  },
  {
    slug: 'scoala-timotei',
    name: 'Școala TIMOTEI',
    tagline: 'Formăm generația următoare de lideri',
    badge: 'Adolescenți',
    badgeColor: 'gold',
    category: 'adolescenti',
    heroImage: '/programs/scoala-timotei.jpg',
    heroImageAlt: 'Școala Timotei — tineri în formare',
    overview:
      'Școala TIMOTEI este un program de pregătire spirituală pentru adolescenți și tineri care doresc să-L cunoască pe Dumnezeu mai profund, să studieze Scriptura și să devină lideri ai generației lor.',
    whoCanApply: [
      'Adolescenți și tineri între 14 și 18 ani',
      'Membri sau participanți activi într-o biserică locală',
      'Dorință de creștere spirituală și implicare în slujire',
      'Recomandare din partea a doi membri maturi ai bisericii',
    ],
    documents: ['Cerere de înscriere', 'Două recomandări din partea membrilor bisericii'],
    curriculum: [
      { title: 'Sesiunea 1 — Iosif', manual: 'Doamne, învață-mă să studiez Biblia în 28 de zile', desc: 'Descoperă caracterul unui lider credincios și învață metoda inductivă de studiu biblic.' },
      { title: 'Sesiunea 2 — Estera', manual: 'Cum să folosească creștinul tehnologiile informaționale?', desc: 'Învață cum să trăiești cu curaj pentru Dumnezeu într-o cultură aflată în continuă schimbare.' },
      { title: 'Sesiunea 3 — Iosua', manual: 'Ce spune Biblia despre sexualitate? / Doamne, am nevoie de răspunsuri', desc: 'Primește răspunsuri biblice la întrebările importante ale adolescenței.' },
      { title: 'Sesiunea 4 — Avraam', manual: 'Îndreaptă-ți inima spre Dumnezeu', desc: 'Studiază credința, ascultarea și încrederea în promisiunile lui Dumnezeu.' },
      { title: 'Sesiunea 5 — 1 Petru', manual: 'Cerul, iadul și viața de după mormânt', desc: 'Înțelege speranța creștină și cum să rămâi statornic în încercări.' },
      { title: 'Sesiunea 6 — 2 Timotei', manual: 'Vrei să fii ucenicul lui Hristos? Plătește prețul', desc: 'Descoperă ce înseamnă să-L urmezi pe Hristos cu seriozitate și perseverență.' },
      { title: 'Sesiunea 7', manual: 'Într-o zi mă voi căsători / Cum să fii un mentor după voia lui Dumnezeu', desc: 'Pregătire pentru relații sănătoase și influență spirituală asupra altora.' },
    ],
    structure: [
      '7 sesiuni intensive',
      'Durata totală: 3–4 ani',
      'Organizate în timpul vacanțelor școlare',
      'Practică de ucenicizare între sesiuni',
      'Formare spirituală, caracter și leadership',
    ],
    outcomes: [
      { title: 'Cunoașterea Scripturii', desc: 'Tineri care știu să studieze Biblia prin metoda inductivă.' },
      { title: 'Formarea de ucenici', desc: 'Capacitatea de a influența și forma alți tineri pentru Hristos.' },
      { title: 'Leadership generațional', desc: 'Lideri care influențează generația lor cu credință și caracter.' },
    ],
    ctaPrimary: { label: 'Aplică la Școala TIMOTEI', href: '#contact' },
    ctaSecondary: { label: 'Descarcă formularul de recomandare', href: '#contact' },
    downloadLabel: 'Descarcă formularul de recomandare',
  },
  {
    slug: 'nivelul-2',
    name: 'Nivelul II',
    tagline: 'Formare avansată pentru liderii care doresc să influențeze generații',
    badge: 'Nivel avansat',
    badgeColor: 'teal',
    category: 'specializat',
    heroImage: '/programs/nivelul-2.jpg',
    heroImageAlt: 'Nivelul 2 — aprofundare în studiul biblic inductiv',
    overview:
      'Nivelul II este destinat absolvenților Institutului Biblic Precept care doresc să își aprofundeze pregătirea în conducere spirituală, mentorare, consiliere și dezvoltarea lucrării în bisericile locale. Acest program oferă o pregătire aprofundată pentru cei care au demonstrat credincioșie în slujire și doresc să crească în responsabilitate, maturitate spirituală și capacitatea de a forma alți lideri.',
    whoCanApply: [
      'Exclusiv absolvenților Institutului Biblic Precept (Nivelul I)',
      'Persoane care doresc să continue procesul de formare și echipare pentru slujire',
    ],
    documents: ['Diplomă Nivelul I', 'Cerere de înscriere'],
    curriculum: [
      { title: 'Misiologie', manual: 'Predica de pe Munte', desc: 'Înțelege chemarea Bisericii de a duce Evanghelia tuturor națiunilor și descoperă principiile biblice ale lucrării misionare.' },
      { title: 'Echiparea Bisericii', manual: 'Darurile Spirituale', desc: 'Descoperă modul în care Dumnezeu echipează credincioșii pentru slujire și cum pot fi dezvoltate darurile spirituale în biserica locală.' },
      { title: 'Cum se studiază un text dificil', manual: 'Evanghelia după Ioan – Partea I', desc: 'Aprofundează metodele de interpretare biblică pentru pasaje complexe și provocatoare.' },
      { title: 'Profeții', manual: 'Apocalipsa I–IV', desc: 'Studiază planul lui Dumnezeu pentru viitor și înțelege mesajul cărții Apocalipsa în contextul întregii Scripturi.' },
      { title: 'Pastorală', manual: 'Doamne, dă-mi o inimă dedicată Ție (2 Corinteni)', desc: 'Dezvoltă caracterul și inima unui slujitor care conduce după modelul lui Hristos.' },
      { title: 'Consiliere Spirituală II', manual: 'Sexualitatea din perspectiva Bibliei', desc: 'Primește instrumente biblice pentru a răspunde provocărilor contemporane și pentru a oferi îndrumare spirituală sănătoasă.' },
      { title: 'Etică Creștină', manual: 'Deuteronom', desc: 'Descoperă principiile după care Dumnezeu dorește să trăiască poporul Său.' },
      { title: 'Etică Creștină II', manual: '1 Corinteni', desc: 'Aplică adevărurile Scripturii la provocările practice întâlnite în viața personală și în biserică.' },
      { title: 'Principii de Lideri', manual: '1 și 2 Samuel', desc: 'Învață lecții esențiale despre conducere, caracter, integritate și influență spirituală din viața liderilor biblici.' },
    ],
    structure: [],
    outcomes: [
      { title: 'Leadership biblic matur', desc: 'Vei învăța să conduci oameni și echipe pe baza principiilor Scripturii.' },
      { title: 'Înțelegere aprofundată a Cuvântului', desc: 'Vei dezvolta capacitatea de a studia, interpreta și preda pasaje complexe din Biblie.' },
      { title: 'Echipare pentru slujire strategică', desc: 'Vei fi pregătit pentru responsabilități sporite în biserică, mentorare și dezvoltarea altor lideri.' },
      { title: 'Impact multiplicator', desc: 'Vei dobândi instrumentele necesare pentru a forma noi lideri și pentru a contribui la extinderea lucrării lui Dumnezeu.' },
    ],
    ctaPrimary: { label: 'Continuă la Nivelul II', href: '#contact' },
    ctaSecondary: { label: 'Solicită mai multe informații', href: '#contact' },
  },
  {
    slug: 'nivelul-3-4',
    name: 'Nivelurile III–IV',
    tagline: 'Continuă să crești în cunoașterea Scripturii și în slujire',
    badge: 'Nivel avansat',
    badgeColor: 'teal',
    category: 'specializat',
    heroImage: '/programs/nivelul-3-4.jpg',
    heroImageAlt: 'Nivelul 3–4 — lideri maturi și predicatori',
    overview:
      'Nivelurile III–IV sunt destinate celor care doresc să aprofundeze înțelegerea întregii Scripturi și să fie echipați pentru responsabilități mai mari în biserică, mentorare, predare și dezvoltarea altor lideri.',
    whoCanApply: [
      'Absolvenți ai Nivelului II',
      'Persoane active în slujire și conducere în biserica locală',
    ],
    documents: ['Diplomă Nivelul II', 'Cerere de înscriere'],
    curriculum: [
      { title: 'Doctrinele Bibliei', manual: 'Romani și Evrei', desc: 'Aprofundează marile adevăruri ale credinței creștine.' },
      { title: 'Consiliere Spirituală', manual: 'Diverse manuale', desc: 'Învață să oferi îndrumare biblică pentru provocările vieții, vindecarea rănilor sufletești, lupta spirituală și luarea deciziilor după voia lui Dumnezeu.' },
      { title: 'Leadership și dezvoltarea liderilor', manual: 'Ezra, Hagai, Neemia, Numeri', desc: 'Studiază principii de conducere biblică pentru formarea liderilor.' },
      { title: 'Creșterea și echiparea bisericii', manual: 'Diverse manuale', desc: 'Descoperă principii biblice pentru dezvoltarea bisericii și pregătirea credincioșilor pentru lucrare.' },
      { title: 'Profeți și cărți profetice', manual: 'Profeții Vechiului Testament', desc: 'Explorează mesajele profeților Vechiului Testament și relevanța lor pentru credinciosul de astăzi.' },
      { title: 'Istoria Bisericii', manual: 'Faptele Apostolilor', desc: 'Înțelege dezvoltarea Bisericii primare.' },
      { title: 'Viața creștină practică', manual: 'Diverse teme', desc: 'Studiază teme precum harul, sfințenia, suferința, ascultarea și trăirea unei vieți dedicate lui Hristos.' },
    ],
    structure: [],
    outcomes: [
      { title: 'Maturitate scripturală', desc: 'Vei fi echipat să studiezi, să predai și să aplici Scriptura cu maturitate.' },
      { title: 'Formare de lideri', desc: 'Vei influența și forma alți oameni pentru slujire în generațiile viitoare.' },
    ],
    ctaPrimary: { label: 'Descoperă întregul program', href: '#contact' },
    ctaSecondary: { label: 'Contactează-ne pentru mai multe informații', href: '#contact' },
  },
  {
    slug: 'efnl-a1',
    name: 'EFNL A1',
    tagline: 'Training pentru predarea limbii engleze la nivel începător',
    badge: 'English',
    badgeColor: 'purple',
    category: 'specializat',
    heroImage: '/programs/efnl-a1.jpg',
    heroImageAlt: 'English for a New Life — predare și evanghelism',
    overview:
      'Acest program pregătește profesori și lideri care doresc să folosească limba engleză pentru evanghelizare și ucenicie prin grupe de studiu, cluburi și proiecte misionare. Programul folosește materiale dezvoltate special pentru învățarea limbii engleze pe baza adevărurilor biblice.',
    whoCanApply: [
      'Persoane care doresc să folosească engleza ca instrument misionar',
      'Lideri care vor să coordoneze grupe și cluburi de engleză',
    ],
    documents: ['Cerere de înscriere'],
    curriculum: [
      { title: 'English for a New Life', manual: 'EFNL A1 Level PDF', desc: 'Material complet pentru predarea limbii engleze la nivel începător cu conținut biblic integrat.' },
      { title: 'Biblical Management', manual: 'Biblical Management PDF', desc: 'Principii de management și organizare bazate pe Scriptură.' },
    ],
    structure: [
      'Predarea cursurilor EFNL A1',
      'Conducerea grupelor și cluburilor de limbă engleză',
      'Folosirea limbii engleze ca instrument pentru evanghelizare și ucenicie',
    ],
    outcomes: [
      { title: 'Preda EFNL A1', desc: 'Vei fi calificat să predai cursurile la nivel începător.' },
      { title: 'Coordona grupe', desc: 'Vei putea conduce grupe și cluburi de limba engleză.' },
      { title: 'Misiune prin engleză', desc: 'Vei folosi engleza ca instrument practic de evanghelizare.' },
    ],
    ctaPrimary: { label: 'Aplică pentru EFNL A1', href: '#contact' },
    ctaSecondary: { label: 'Descarcă materialele PDF', href: '#contact' },
    ctaTertiary: { label: 'Become an EFNL Teacher', href: 'https://efnl.org' },
  },
  {
    slug: 'efnl-a2',
    name: 'EFNL A2',
    tagline: 'Training pentru predarea limbii engleze la nivel intermediar',
    badge: 'English',
    badgeColor: 'purple',
    category: 'specializat',
    heroImage: 'https://images.unsplash.com/photo-1546410531-bb4caa6b4d01?auto=format&fit=crop&w=1400&q=80',
    heroImageAlt: 'Clasă de engleză — nivel intermediar',
    overview:
      'Acest program dezvoltă abilitățile necesare pentru coordonarea grupelor EFNL la nivel intermediar și pentru folosirea materialelor biblice în contexte educaționale și misionare.',
    whoCanApply: [
      'Absolvenți EFNL A1',
      'Persoane care doresc să coordoneze și să mentorizeze alți profesori EFNL',
    ],
    documents: ['Certificat EFNL A1', 'Cerere de înscriere'],
    curriculum: [
      { title: 'English for a New Life', manual: 'EFNL A2 Level PDF', desc: 'Material pentru predarea limbii engleze la nivel intermediar.' },
      { title: 'Rediscover Inner Peace', manual: 'Rediscover Inner Peace PDF', desc: 'Material biblic pentru studiu la nivel intermediar.' },
    ],
    structure: [
      'Predarea cursurilor EFNL A2',
      'Coordonarea grupelor de nivel intermediar',
      'Pregătirea și mentorizarea noilor profesori EFNL',
    ],
    outcomes: [
      { title: 'Preda EFNL A2', desc: 'Vei fi calificat să predai la nivel intermediar.' },
      { title: 'Mentoriza profesori', desc: 'Vei putea pregăti și mentoriza noi profesori EFNL.' },
    ],
    ctaPrimary: { label: 'Aplică pentru EFNL A2', href: '#contact' },
    ctaSecondary: { label: 'Descarcă materialele PDF', href: '#contact' },
    ctaTertiary: { label: 'Become an EFNL Teacher', href: 'https://efnl.org' },
  },
  {
    slug: 'efnl-kids',
    name: 'EFNL Kids',
    tagline: 'Training pentru predarea limbii engleze copiilor',
    badge: 'English · Copii',
    badgeColor: 'gold',
    category: 'specializat',
    heroImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1400&q=80',
    heroImageAlt: 'Copii la ore de engleză — activități interactive',
    overview:
      'Programul pregătește profesori și lucrători care doresc să folosească limba engleză în lucrarea cu copiii prin lecții interactive, activități practice și materiale biblice adaptate vârstei lor.',
    whoCanApply: [
      'Persoane care lucrează cu copii în context eclezial sau educațional',
      'Lideri care doresc să organizeze cluburi și tabere pentru copii',
    ],
    documents: ['Cerere de înscriere'],
    curriculum: [
      { title: 'EFNL for Kids', manual: 'EFNL for Kids PDF', desc: 'Material interactiv pentru predarea limbii engleze copiilor cu conținut biblic.' },
      { title: 'Honor Your Parents', manual: 'Honor Your Parents PDF', desc: 'Material biblic adaptat pentru copii despre respect și familie.' },
    ],
    structure: [
      'Conducerea grupelor EFNL Kids',
      'Organizarea cluburilor și taberelor pentru copii',
      'Folosirea materialelor EFNL în lucrarea cu copiii',
    ],
    outcomes: [
      { title: 'Preda copiilor', desc: 'Vei fi calificat să conduci grupe EFNL Kids.' },
      { title: 'Organiza activități', desc: 'Vei putea organiza cluburi și tabere pentru copii.' },
    ],
    ctaPrimary: { label: 'Aplică pentru EFNL Kids', href: '#contact' },
    ctaSecondary: { label: 'Descarcă materialele PDF', href: '#contact' },
    ctaTertiary: { label: 'Become an EFNL Teacher', href: 'https://efnl.org' },
  },
  {
    slug: 'misiune-sport',
    name: 'Școala Internațională de Misiune prin Sport',
    tagline: 'Transformă-ți pasiunea pentru sport într-o unealtă de misiune',
    badge: 'Misiune · Sport',
    badgeColor: 'purple',
    category: 'specializat',
    heroImage: '/programs/misiune-sport.jpg',
    heroImageAlt: 'Școala Internațională de Misiune prin Sport',
    overview:
      'Școala Internațională de Misiune prin Sport pregătește lideri și misionari care doresc să folosească sportul pentru evanghelizare, ucenicizare și dezvoltarea noii generații. Programul combină studiul biblic inductiv, mentorarea și pregătirea practică pentru a ajuta bisericile să ajungă la copii, adolescenți și tineri prin activități sportive relevante și eficiente.',
    whoCanApply: [
      'Liderilor și slujitorilor implicați în lucrare',
      'Antrenorilor și instructorilor sportivi',
      'Persoanelor care iubesc sportul și doresc să îl folosească în misiune',
      'Creștinilor care vor să ajungă la noua generație într-un mod relevant',
    ],
    documents: ['Cerere de înscriere'],
    curriculum: [
      { title: 'Misiune prin sport', manual: 'Taekwon-do / Fotbal', desc: 'Învață cum să folosești sportul pentru a construi relații și a crea oportunități de evanghelizare.' },
      { title: 'Studiu biblic inductiv', manual: 'Diverse manuale', desc: 'Dobândește instrumentele necesare pentru a studia și preda Scriptura clar și aplicabil.' },
      { title: 'Mentorare și ucenicizare', manual: 'Principii de ucenicie', desc: 'Învață cum să investești în oameni și să formezi ucenici care vor influența la rândul lor pe alții.' },
      { title: 'Leadership și dezvoltarea lucrării', manual: 'Principii practice', desc: 'Dezvoltă abilități practice pentru coordonarea grupelor, organizarea activităților și formarea noilor lideri.' },
    ],
    structure: [
      'Program de 3 ani',
      'Două luni de studiu intensiv în fiecare an',
      'Aplicare practică imediată în biserica și comunitatea locală',
      'Mentorare și susținere din partea instructorilor',
      'Accent pe multiplicarea lucrării și formarea de noi ucenici',
    ],
    outcomes: [
      { title: 'Evanghelizare prin sport', desc: 'Vei fi pregătit să folosești sportul ca instrument de evanghelizare.' },
      { title: 'Ucenicizare practică', desc: 'Vei dezvolta o lucrare cu impact în comunitatea ta.' },
    ],
    ctaPrimary: { label: 'Descoperă programul complet', href: '#contact' },
    ctaSecondary: { label: 'Accesează site-ul IMS', href: '#contact' },
  },
  {
    slug: 'lucrare-copii',
    name: 'Lucrare cu Copii',
    tagline: 'Formarea slujitorilor care investesc în generația viitoare',
    badge: 'Lucrare cu copii',
    badgeColor: 'teal',
    category: 'tineri',
    heroImage: '/programs/lucrare-copii.jpg',
    heroImageAlt: 'Lucrare cu Copii — formare și slujire',
    overview:
      'Programul Lucrare cu Copii formează slujitori care înțeleg specificul lucrului cu copiii și le predau Cuvântul lui Dumnezeu, formând o fundație biblică solidă în viața lor.',
    whoCanApply: [
      'Persoane implicate în lucrarea cu copii în biserica locală',
      'Educatori și profesori care doresc să integreze studiul biblic',
      'Membri activi ai unei biserici locale',
    ],
    documents: ['Cerere de înscriere', 'Recomandare pastorală'],
    curriculum: [
      { title: 'Specificul lucrării cu copii', manual: 'Materiale Precept Kids', desc: 'Înțelege etapele de dezvoltare ale copilului și cum să adaptezi studiul biblic pentru fiecare vârstă.' },
      { title: 'Metode interactive de predare', manual: 'Diverse materiale', desc: 'Dobândește instrumente practice și creative pentru a preda Scriptura copiilor într-un mod relevant.' },
      { title: 'Formarea caracterului', manual: 'Materiale biblice pentru copii', desc: 'Învață cum să formezi valorile și caracterul creștin în viața copiilor prin studiul Cuvântului.' },
    ],
    structure: [
      'Sesiuni intensive de formare',
      'Practică supervizată în lucrarea cu copii',
      'Mentorare din partea instructorilor',
    ],
    ctaPrimary: { label: 'Aplică acum', href: '#contact' },
    ctaSecondary: { label: 'Contactează-ne', href: '#contact' },
  },
]

export function getProgramBySlug(slug: string): ProgramData | undefined {
  return programs.find((p) => p.slug === slug)
}

export function getAllSlugs(): string[] {
  return programs.map((p) => p.slug)
}
