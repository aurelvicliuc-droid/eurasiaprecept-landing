export interface ManualRef {
  title: string
  /** Link to the manual on shop.eurasiaprecept.org. Optional: falls back to the shop homepage. */
  href?: string
  /** Interchangeable alternatives shown on the same line, separated by " / " (each links on its own). */
  alternatives?: ManualRef[]
}

export interface CourseItem {
  title: string
  /** Legacy single-manual label (used by most programs). */
  manual?: string
  /** Optional shop link for the single `manual` above. Inherited into EN/RU by index. */
  manualHref?: string
  /** Multiple manuals taught in a session, each linkable to the shop. */
  manuals?: ManualRef[]
  desc?: string
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
  heroImagePosition?: string
  /** Optional photo gallery shown on the program page. */
  gallery?: string[]
  overview: string
  whoCanApply: string[]
  documents: string[]
  curriculum: CourseItem[]
  structure: string[]
  outcomes?: Outcome[]
  ctaPrimary: { label: string; href: string }
  ctaSecondary?: { label: string; href: string }
  ctaTertiary?: { label: string; href: string; download?: boolean }
  downloadLabel?: string
}

// Portalul public de înscriere la sesiuni (folosit de butonul „Aplică" la toate programele, mai puțin IMS)
export const REGISTER_URL = 'https://web.eurasiaprecept.org/public?filtered=true&page=1'

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
    gallery: [
      '/programs/institut-gallery-1.jpg',
      '/programs/institut-gallery-2.jpg',
      '/programs/institut-gallery-3.jpg',
      '/programs/institut-gallery-4.jpg',
      '/programs/institut-gallery-5.jpg',
      '/programs/institut-gallery-6.jpg',
      '/programs/institut-gallery-7.jpg',
      '/programs/institut-gallery-8.jpg',
      '/programs/institut-gallery-9.jpg',
      '/programs/institut-gallery-10.jpg',
      '/programs/institut-gallery-11.jpg',
    ],
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
      { title: 'Evanghelizare și Ucenicie', manual: '„Dumnezeule, exiști?"', manualHref: 'https://shop.eurasiaprecept.org/catalog/dumnezeule-existi', desc: 'Învață cum să prezinți Evanghelia clar, biblic și relevant și cum să formezi ucenici care să-L urmeze pe Hristos.' },
      { title: 'Plantarea de Biserici', manual: '„Doamne, vreau să Te cunosc"', manualHref: 'https://shop.eurasiaprecept.org/catalog/doamne-vreau-sa-te-cunosc', desc: 'Descoperă principiile biblice ale dezvoltării și multiplicării bisericilor.' },
      { title: 'Consiliere Spirituală', manual: '„Căsătorie fără regrete"', manualHref: 'https://shop.eurasiaprecept.org/catalog/casatorie-fara-regrete', desc: 'Învață cum să oferi îndrumare biblică în diferite situații de viață.' },
      { title: 'Homiletică', manual: 'Iacov', manualHref: 'https://shop.eurasiaprecept.org/catalog/iacov-3', desc: 'Dezvoltă abilitatea de a pregăti și transmite mesaje biblice clare și relevante.' },
      { title: 'Istoria Poporului Israel', manual: 'Daniel', manualHref: 'https://shop.eurasiaprecept.org/catalog/daniel-pdf', desc: 'Înțelege planul lui Dumnezeu în istorie și relevanța lui pentru prezent.' },
      { title: 'Creșterea Bisericii', manual: 'Filipeni', manualHref: 'https://shop.eurasiaprecept.org/catalog/filipeni', desc: 'Studiază principiile biblice care contribuie la sănătatea și dezvoltarea bisericii.' },
      { title: 'Planificarea Timpului', manual: '2 Tesaloniceni', manualHref: 'https://shop.eurasiaprecept.org/catalog/2-tesaloniceni', desc: 'Învață administrarea eficientă a timpului și priorităților în slujire și viața personală.' },
      { title: 'Doctrinele Bibliei', manual: 'Legământul', manualHref: 'https://shop.eurasiaprecept.org/catalog/legamantul', desc: 'Aprofundează doctrinele fundamentale ale credinței creștine.' },
      { title: 'Cum se studiază un subiect dificil în Biblie?', manual: 'Evanghelia după Ioan (Partea II)', manualHref: 'https://shop.eurasiaprecept.org/catalog/evanghelia-dupa-ioan-partea-2', desc: 'Dobândește instrumente practice pentru cercetarea și interpretarea pasajelor complexe din Scriptură.' },
    ],
    structure: [
      '3 ani de studiu',
      '3 sesiuni intensive pe an',
      '12 zile de studiu pentru fiecare sesiune',
      'Practică obligatorie de ucenicizare între sesiuni',
      'Examene și evaluări periodice',
    ],
    ctaPrimary: { label: 'Aplică la Institutul Biblic', href: REGISTER_URL },
    ctaSecondary: { label: 'Descarcă recomandarea pastorală', href: '/forms/institut-recomandare-ro.doc' },
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
    gallery: [
      '/programs/timotei-gallery-5.jpg',
      '/programs/timotei-gallery-1.jpg',
      '/programs/timotei-gallery-2.jpg',
      '/programs/timotei-gallery-3.jpg',
      '/programs/timotei-gallery-4.jpg',
    ],
    whoCanApply: [
      'Adolescenți și tineri între 14 și 18 ani',
      'Membri sau participanți activi într-o biserică locală',
      'Dorință de creștere spirituală și implicare în slujire',
    ],
    documents: ['Cerere de înscriere', 'Două recomandări din partea membrilor bisericii'],
    curriculum: [
      // Linkurile manualelor (shop.eurasiaprecept.org) sunt definite o singură dată aici și sunt
      // preluate automat în EN/RU prin localizeProgram. Toate manualele au link, cu excepția
      // alternativei „Doamne, am nevoie de răspunsuri" de pe bara Sesiunii 3 (vezi mai jos).
      { title: 'Sesiunea 1', manuals: [{ title: 'Iosif', href: 'https://shop.eurasiaprecept.org/catalog/iosif' }, { title: 'Doamne, învață-mă să studiez Biblia în 28 de zile', href: 'https://shop.eurasiaprecept.org/catalog/doamne-invata-ma-sa-studiez-biblia-in-28-de-zile-2' }], desc: 'Descoperă caracterul unui lider credincios și învață metoda inductivă de studiu biblic.' },
      { title: 'Sesiunea 2', manuals: [{ title: 'Estera', href: 'https://shop.eurasiaprecept.org/catalog/estera' }, { title: 'Cum să folosească creștinul tehnologiile informaționale?', href: 'https://shop.eurasiaprecept.org/catalog/cum-sa-foloseasca-crestinul-tehnologiile-informationale' }], desc: 'Învață cum să trăiești cu curaj pentru Dumnezeu într-o cultură aflată în continuă schimbare.' },
      { title: 'Sesiunea 3', manuals: [{ title: 'Iosua', href: 'https://shop.eurasiaprecept.org/catalog/iosua' }, { title: 'Ce spune Biblia despre sexualitate?', href: 'https://shop.eurasiaprecept.org/catalog/ce-spune-biblia-despre-sexualitate', alternatives: [{ title: 'Doamne, am nevoie de răspunsuri', href: 'https://shop.eurasiaprecept.org/catalog/doamne-am-nevoie-de-raspunsuri' }] }], desc: 'Primește răspunsuri biblice la întrebările importante ale adolescenței.' },
      { title: 'Sesiunea 4', manuals: [{ title: 'Avraam', href: 'https://shop.eurasiaprecept.org/catalog/cum-sa-devii-prieten-cu-dumnezeul-cel-credincios' }, { title: 'Întoarce-ți inima spre Dumnezeu', href: 'https://shop.eurasiaprecept.org/catalog/intoarce-ti-inima-spre-dumnezeu' }], desc: 'Studiază credința, ascultarea și încrederea în promisiunile lui Dumnezeu.' },
      { title: 'Sesiunea 5', manuals: [{ title: '1 Petru', href: 'https://shop.eurasiaprecept.org/catalog/1-pentru-invata-si-aplica' }, { title: 'Cerul, iadul și viața de după moarte', href: 'https://shop.eurasiaprecept.org/catalog/cerul-iadul-si-viata-de-dupa-moarte' }], desc: 'Înțelege speranța creștină și cum să rămâi statornic în încercări.' },
      { title: 'Sesiunea 6', manuals: [{ title: '2 Timotei', href: 'https://shop.eurasiaprecept.org/catalog/2-timotei' }, { title: 'Vrei să fii ucenicul lui Hristos? Plătește prețul', href: 'https://shop.eurasiaprecept.org/catalog/vrei-sa-fii-ucenicul-lui-isus-trebuie-sa-platesti-pretul' }], desc: 'Descoperă ce înseamnă să-L urmezi pe Hristos cu seriozitate și perseverență.' },
      { title: 'Sesiunea 7', manuals: [{ title: 'Într-o zi mă voi căsători', href: 'https://shop.eurasiaprecept.org/catalog/intr-o-zi-ma-voi-casatori' }, { title: 'Cum să fii un mentor după voia lui Dumnezeu', href: 'https://shop.eurasiaprecept.org/catalog/cum-sa-fii-un-mentor-dupa-voia-lui-dumnezeu' }], desc: 'Pregătire pentru relații sănătoase și influență spirituală asupra altora.' },
    ],
    structure: [
      '7 sesiuni intensive',
      'Durata totală: 3–4 ani',
      'Organizate în timpul vacanțelor școlare',
      'Predarea cursurilor studiate între sesiuni',
    ],
    outcomes: [
      { title: 'Cunoașterea Scripturii', desc: 'Tineri care știu să studieze Biblia prin metoda inductivă.' },
      { title: 'Formarea de ucenici', desc: 'Capacitatea de a influența și forma alți tineri pentru Hristos.' },
      { title: 'Leadership generațional', desc: 'Lideri care influențează generația lor cu credință și caracter.' },
    ],
    ctaPrimary: { label: 'Aplică la Școala TIMOTEI', href: REGISTER_URL },
    ctaSecondary: { label: 'Descarcă formularul de recomandare', href: '/forms/timotei-angajament-ro.docx' },
    ctaTertiary: { label: 'Descarcă broșura școlii', href: '/forms/scoala-timotei-brosura.pdf', download: true },
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
    ctaPrimary: { label: 'Continuă la Nivelul II', href: REGISTER_URL },
    ctaSecondary: { label: 'Solicită mai multe informații', href: '/#contact' },
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
    heroImagePosition: 'object-bottom',
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
    ctaPrimary: { label: 'Descoperă întregul program', href: REGISTER_URL },
    ctaSecondary: { label: 'Contactează-ne pentru mai multe informații', href: '/#contact' },
  },
  {
    slug: 'efnl',
    name: 'English for a New Life',
    tagline: 'Predarea limbii engleze ca instrument de misiune — nivelurile A1, A2 și pentru copii',
    badge: 'English',
    badgeColor: 'purple',
    category: 'specializat',
    heroImage: '/programs/efnl.jpg',
    heroImageAlt: 'English for a New Life — predare și evanghelism prin limba engleză',
    gallery: [
      '/programs/efnl-gallery-1.jpg',
      '/programs/efnl-gallery-2.jpg',
      '/programs/efnl-gallery-3.jpg',
      '/programs/efnl-gallery-4.jpg',
      '/programs/efnl-gallery-5.jpg',
      '/programs/efnl-gallery-6.jpg',
      '/programs/efnl-gallery-7.jpg',
      '/programs/efnl-gallery-8.jpg',
    ],
    overview:
      'English for a New Life (EFNL) pregătește profesori și lideri care doresc să folosească limba engleză pentru evanghelizare și ucenicie, prin grupe de studiu, cluburi și proiecte misionare. Programul are trei niveluri — A1, A2 și EFNL for Kids — cu manuale dezvoltate special pe baza adevărurilor biblice.',
    whoCanApply: [
      'Persoane care doresc să folosească engleza ca instrument misionar',
      'Lideri care vor să coordoneze grupe și cluburi de engleză',
      'Persoane care lucrează cu copii în context eclezial sau educațional',
    ],
    documents: ['Cerere de înscriere'],
    curriculum: [
      { title: 'EFNL A1', manuals: [{ title: 'English for a New Life – A1', href: 'https://shop.eurasiaprecept.org/catalog/english-for-a-new-life-a1-level' }, { title: 'Biblical Management', href: 'https://shop.eurasiaprecept.org/catalog/managementul-biblic-2' }], desc: 'Manual destinat predării limbii engleze adolescenților, tinerilor și adulților aflați la nivel începător.' },
      { title: 'EFNL A2', manuals: [{ title: 'English for a New Life – A2', href: 'https://shop.eurasiaprecept.org/catalog/english-for-a-new-life-a2-level' }, { title: 'Rediscover Inner Peace', href: 'https://shop.eurasiaprecept.org/catalog/rediscover-inner-peace' }], desc: 'Continuarea nivelului A1, dezvoltând competențele de comunicare prin lecții interactive și studii biblice aplicate.' },
      { title: 'EFNL for Kids', manuals: [{ title: 'English for a New Life – Kids', href: 'https://shop.eurasiaprecept.org/catalog/efnl-for-kids-2' }, { title: 'Honor Your Parents', href: 'https://shop.eurasiaprecept.org/catalog/honor-your-parents' }], desc: 'Curriculum special creat pentru copii, care combină activități interactive, jocuri, cântece și lecții biblice pentru a face învățarea limbii engleze atractivă și eficientă.' },
    ],
    structure: [
      '3 niveluri EFNL',
      'Predarea cursurilor și conducerea grupelor de limba engleză',
      'Folosirea limbii engleze ca instrument pentru evanghelizare și ucenicie',
    ],
    outcomes: [
      { title: 'Predă la orice nivel', desc: 'Vei fi calificat să predai EFNL A1, A2 sau pentru copii.' },
      { title: 'Coordonează grupe', desc: 'Vei putea conduce grupe și cluburi de limba engleză.' },
      { title: 'Misiune prin engleză', desc: 'Vei folosi engleza ca instrument practic de evanghelizare și ucenicie.' },
    ],
    ctaPrimary: { label: 'Aplică la English for a New Life', href: 'https://efnl.org/#programe' },
    ctaTertiary: { label: 'Become an EFNL Teacher', href: 'https://efnl.org/#programe' },
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
    ctaPrimary: { label: 'Descoperă programul complet', href: '/#contact' },
    ctaSecondary: { label: 'Accesează site-ul IMS', href: '/#contact' },
  },
  {
    slug: 'lucrare-copii',
    name: 'Lucrare cu Copiii',
    tagline: 'Formarea slujitorilor care investesc în generația viitoare',
    badge: 'Lucrare cu copiii',
    badgeColor: 'teal',
    category: 'tineri',
    heroImage: '/programs/lucrare-copii.jpg',
    heroImageAlt: 'Lucrare cu Copiii — formare și slujire',
    gallery: [
      '/programs/copii-gallery-1.jpg',
      '/programs/copii-gallery-2.jpg',
      '/programs/copii-gallery-3.jpg',
      '/programs/copii-gallery-4.jpg',
      '/programs/copii-gallery-5.jpg',
      '/programs/copii-gallery-6.jpg',
    ],
    overview:
      'Formarea liderilor maturi spiritual, bine ancorați doctrinar și echipați metodic pentru a sluji copiii și a forma o generație care Îl cunoaște pe Dumnezeu din Scriptură.',
    whoCanApply: [
      'Învățători de școală duminicală',
      'Învățători în școli',
      'Lucrători sociali',
      'Antrenori ai cluburilor sportive',
      'Lideri și coordonatori de cluburi pentru copii, programe after-school și tabere',
      'Persoane recomandate de biserica locală care doresc să se implice în lucrarea cu copiii',
    ],
    documents: ['Cerere de înscriere', 'Recomandare pastorală'],
    curriculum: [
      { title: 'Sesiunea 1', manuals: [{ title: 'Sens interzis, Iona!', href: 'https://shop.eurasiaprecept.org/catalog/sens-interzis-iona' }, { title: 'Cine a creat lumea?', href: 'https://shop.eurasiaprecept.org/catalog/cine-a-creat-lumea-print' }] },
      { title: 'Sesiunea 2', manuals: [{ title: 'Călătoria în lumea digitală', href: 'https://shop.eurasiaprecept.org/catalog/journey-to-the-digital-world' }, { title: 'Cum să descifrezi codul legământului', href: 'https://shop.eurasiaprecept.org/catalog/cum-sa-descifram-codul-legamantului-format-pdf' }] },
      { title: 'Sesiunea 3', manuals: [{ title: 'Vai, am dat de probleme!', href: 'https://shop.eurasiaprecept.org/catalog/vai-am-dat-de-probleme' }, { title: 'Doamne, învață-mă să mă rog!', href: 'https://shop.eurasiaprecept.org/catalog/doamne-invata-ma-sa-ma-rog' }] },
      { title: 'Sesiunea 4', manuals: [{ title: 'Doamne, cum Te numești?', href: 'https://shop.eurasiaprecept.org/catalog/doamne-cum-te-numesti' }, { title: 'Cine este Isus?', href: 'https://shop.eurasiaprecept.org/catalog/cine-este-isus' }] },
      { title: 'Sesiunea 5', manuals: [{ title: 'Avraam – exploratorul curajos', href: 'https://shop.eurasiaprecept.org/catalog/avraam-exploratorul-curajos' }, { title: 'Creația uimitoare a lui Dumnezeu', href: 'https://shop.eurasiaprecept.org/catalog/creatia-uimitoare-a-lui-dumnezeu' }] },
      { title: 'Sesiunea 6', manuals: [{ title: 'Iosif – un om extraordinar al lui Dumnezeu', href: 'https://shop.eurasiaprecept.org/catalog/iosif-un-om-extraordinar-al-lui-dumnezeu' }, { title: 'Cum să devii campionul lui Dumnezeu?', href: 'https://shop.eurasiaprecept.org/catalog/cum-sa-devii-campionul-lui-dumnezeu' }] },
      { title: 'Sesiunea 7', manuals: [{ title: 'Sexualitatea din perspectiva Bibliei', href: 'https://shop.eurasiaprecept.org/catalog/sexualitate-din-perspectiva-bibliei' }, { title: 'Când mi-e frică', href: 'https://shop.eurasiaprecept.org/catalog/cand-mi-e-frica' }] },
    ],
    structure: [
      'Sesiuni intensive de formare',
      'Practică supervizată în lucrarea cu copii',
      'Mentorare din partea instructorilor',
    ],
    outcomes: [
      { title: 'Formare biblică și spirituală', desc: 'Dezvoltă un caracter creștin și o credință matură.' },
      { title: 'Pregătire psiho-pedagogică', desc: 'Dobândește competențe pentru predarea eficientă a copiilor.' },
      { title: 'Predarea Scripturii copiilor', desc: 'Învață să predai Scriptura clar și relevant.' },
      { title: 'Mentorare și coordonare', desc: 'Echipează și coordonează eficient lucrarea cu copiii.' },
    ],
    ctaPrimary: { label: 'Aplică acum', href: REGISTER_URL },
    ctaSecondary: { label: 'Descarcă recomandarea pastorală', href: '/forms/institut-recomandare-ro.doc' },
    downloadLabel: 'Descarcă formularul de recomandare pastorală',
  },
]

export function getProgramBySlug(slug: string): ProgramData | undefined {
  return programs.find((p) => p.slug === slug)
}

export function getAllSlugs(): string[] {
  return programs.map((p) => p.slug)
}
