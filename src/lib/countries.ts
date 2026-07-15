import type { Lang } from '@/lib/i18n/translations'

// Nume de țară traduse (cheia = numele din date, în engleză)
export const COUNTRY: Record<string, { ro: string; ru: string }> = {
  Moldova: { ro: 'Moldova', ru: 'Молдова' },
  Poland: { ro: 'Polonia', ru: 'Польша' },
  Bolivia: { ro: 'Bolivia', ru: 'Боливия' },
  Ukraine: { ro: 'Ucraina', ru: 'Украина' },
  Belarus: { ro: 'Belarus', ru: 'Беларусь' },
  'Sri Lanka': { ro: 'Sri Lanka', ru: 'Шри-Ланка' },
  Russia: { ro: 'Rusia', ru: 'Россия' },
  'South Sudan': { ro: 'Sudanul de Sud', ru: 'Южный Судан' },
  Germany: { ro: 'Germania', ru: 'Германия' },
  Kazakhstan: { ro: 'Kazahstan', ru: 'Казахстан' },
  Peru: { ro: 'Peru', ru: 'Перу' },
  Bulgaria: { ro: 'Bulgaria', ru: 'Болгария' },
  Serbia: { ro: 'Serbia', ru: 'Сербия' },
  Mongolia: { ro: 'Mongolia', ru: 'Монголия' },
  Bhutan: { ro: 'Bhutan', ru: 'Бутан' },
  'United States of America': { ro: 'Statele Unite ale Americii', ru: 'США' },
  Vietnam: { ro: 'Vietnam', ru: 'Вьетнам' },
  Azerbaijan: { ro: 'Azerbaidjan', ru: 'Азербайджан' },
  Kyrgyzstan: { ro: 'Kârgâzstan', ru: 'Киргизия' },
  Nepal: { ro: 'Nepal', ru: 'Непал' },
  Pakistan: { ro: 'Pakistan', ru: 'Пакистан' },
  Armenia: { ro: 'Armenia', ru: 'Армения' },
  Greece: { ro: 'Grecia', ru: 'Греция' },
  Thailand: { ro: 'Thailanda', ru: 'Таиланд' },
  Romania: { ro: 'România', ru: 'Румыния' },
  Tajikistan: { ro: 'Tadjikistan', ru: 'Таджикистан' },
  'Czech Republic': { ro: 'Cehia', ru: 'Чехия' },
  Laos: { ro: 'Laos', ru: 'Лаос' },
  Guatemala: { ro: 'Guatemala', ru: 'Гватемала' },
  Bangladesh: { ro: 'Bangladesh', ru: 'Бангладеш' },
  Colombia: { ro: 'Columbia', ru: 'Колумбия' },
  Cambodia: { ro: 'Cambodgia', ru: 'Камбоджа' },
  Indonesia: { ro: 'Indonezia', ru: 'Индонезия' },
  'Papua New Guinea': { ro: 'Papua Noua Guinee', ru: 'Папуа-Новая Гвинея' },
  Myanmar: { ro: 'Myanmar', ru: 'Мьянма' },
}

export function countryName(country: string, lang: Lang) {
  if (lang === 'ro') return COUNTRY[country]?.ro ?? country
  if (lang === 'ru') return COUNTRY[country]?.ru ?? country
  return country
}
