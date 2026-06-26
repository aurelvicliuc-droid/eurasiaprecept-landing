export interface ProgramTranslation {
  name: string
  tagline: string
  overview: string
  whoCanApply: string[]
  documents: string[]
  curriculum: Array<{ title: string; manual?: string; manualHref?: string; manuals?: Array<{ title: string; href?: string; alternatives?: Array<{ title: string; href?: string }> }>; desc: string }>
  structure: string[]
  outcomes?: Array<{ title: string; desc: string }>
  ctaPrimary: { label: string; href?: string }
  ctaSecondary?: { label: string; href?: string }
  ctaTertiary?: { label: string; href?: string }
  downloadLabel?: string
}

export const programsEn: Record<string, ProgramTranslation> = {
  'institutul-biblic': {
    name: 'Precept Bible Institute',
    tagline: 'Biblical training for leaders and servants',
    overview:
      'Precept Bible Institute is a program of spiritual and practical preparation for believers who desire to deepen their knowledge of the Word of God, grow in character, and be equipped for ministry and making disciples.',
    whoCanApply: [
      '18 years of age and older',
      'Active members of a local church',
      'Baptized believers',
      'Recommended by the pastor or spiritual leader of their local church',
    ],
    documents: ['Application form', 'Pastoral recommendation'],
    curriculum: [
      { title: 'Evangelism & Discipleship', manual: '"God, Are You There?"', desc: 'Learn how to present the Gospel clearly, biblically, and relevantly, and how to make disciples who follow Christ.' },
      { title: 'Church Planting', manual: '"Lord, I Want to Know You"', desc: 'Discover biblical principles for developing and multiplying churches.' },
      { title: 'Spiritual Counseling', manual: '"Marriage Without Regrets"', desc: 'Learn how to offer biblical guidance in various life situations.' },
      { title: 'Homiletics', manual: 'James', desc: 'Develop the ability to prepare and deliver clear and relevant biblical messages.' },
      { title: 'History of the People of Israel', manual: 'Daniel', desc: 'Understand God\'s plan in history and its relevance for today.' },
      { title: 'Church Growth', manual: 'Philippians', desc: 'Study biblical principles that contribute to the health and development of the church.' },
      { title: 'Time Management', manual: '2 Thessalonians', desc: 'Learn effective management of time and priorities in ministry and personal life.' },
      { title: 'Bible Doctrines', manual: 'The Covenant', desc: 'Deepen your understanding of the foundational doctrines of the Christian faith.' },
      { title: 'How to Study a Difficult Topic in the Bible', manual: 'Gospel of John (Part II)', desc: 'Gain practical tools for researching and interpreting complex passages of Scripture.' },
    ],
    structure: [
      '3 years of study',
      '3 intensive sessions per year',
      '12 days of study per session',
      'Mandatory discipleship practice between sessions',
      'Periodic exams and evaluations',
    ],
    ctaPrimary: { label: 'Apply to the Bible Institute' },
    ctaSecondary: { label: 'Download pastoral recommendation form' },
    downloadLabel: 'Download pastoral recommendation form',
  },

  'scoala-timotei': {
    name: 'TIMOTHY School',
    tagline: 'Training the next generation of leaders',
    overview:
      'TIMOTHY School is a spiritual preparation program for teenagers and young people who want to know God more deeply, study Scripture, and become leaders of their generation.',
    whoCanApply: [
      'Teenagers and young people between 14 and 18 years old',
      'Members or active participants in a local church',
      'Desire for spiritual growth and involvement in ministry',
    ],
    documents: ['Application form', 'Two recommendations from church members'],
    curriculum: [
      { title: 'Session 1', manuals: [{ title: 'Joseph' }, { title: 'Lord, Teach Me to Study the Bible in 28 Days' }], desc: 'Discover the character of a faithful leader and learn the inductive method of Bible study.' },
      { title: 'Session 2', manuals: [{ title: 'Esther' }, { title: 'How Should a Christian Use Technology?' }], desc: 'Learn how to live courageously for God in a constantly changing culture.' },
      { title: 'Session 3', manuals: [{ title: 'Joshua' }, { title: 'What Does the Bible Say About Sexuality?', alternatives: [{ title: 'Lord, I Need Answers' }] }], desc: 'Receive biblical answers to the important questions of adolescence.' },
      { title: 'Session 4', manuals: [{ title: 'Abraham' }, { title: 'Turn Your Heart to God' }], desc: 'Study faith, obedience, and trust in God\'s promises.' },
      { title: 'Session 5', manuals: [{ title: '1 Peter' }, { title: 'Heaven, Hell and Life After Death' }], desc: 'Understand Christian hope and how to remain steadfast in trials.' },
      { title: 'Session 6', manuals: [{ title: '2 Timothy' }, { title: 'Do You Want to Be Christ\'s Disciple? Pay the Price' }], desc: 'Discover what it means to follow Christ seriously and with perseverance.' },
      { title: 'Session 7', manuals: [{ title: 'One Day I\'ll Get Married' }, { title: 'How to Be a God-honoring Mentor' }], desc: 'Preparation for healthy relationships and spiritual influence over others.' },
    ],
    structure: [
      '7 intensive sessions',
      'Total duration: 3–4 years',
      'Organized during school vacations',
      'Teaching the studied courses between sessions',
    ],
    outcomes: [
      { title: 'Knowledge of Scripture', desc: 'Young people who know how to study the Bible using the inductive method.' },
      { title: 'Making disciples', desc: 'The ability to influence and form other young people for Christ.' },
      { title: 'Generational leadership', desc: 'Leaders who influence their generation with faith and character.' },
    ],
    ctaPrimary: { label: 'Apply to TIMOTHY School' },
    ctaSecondary: { label: 'Download recommendation form', href: '/forms/timotei-angajament-en.doc' },
    downloadLabel: 'Download recommendation form',
  },

  'nivelul-2': {
    name: 'Level II',
    tagline: 'Advanced training for leaders who want to influence generations',
    overview:
      'Level II is for graduates of Precept Bible Institute who want to deepen their preparation in spiritual leadership, mentoring, counseling, and developing ministry in local churches. This program offers in-depth training for those who have demonstrated faithfulness in ministry and desire to grow in responsibility, spiritual maturity, and the ability to develop other leaders.',
    whoCanApply: [
      'Exclusively for graduates of Precept Bible Institute (Level I)',
      'Those who wish to continue the formation and equipping process for ministry',
    ],
    documents: ['Level I Diploma', 'Application form'],
    curriculum: [
      { title: 'Missiology', manual: 'The Sermon on the Mount', desc: 'Understand the Church\'s calling to bring the Gospel to all nations and discover biblical principles of missionary work.' },
      { title: 'Equipping the Church', manual: 'Spiritual Gifts', desc: 'Discover how God equips believers for ministry and how spiritual gifts can be developed in the local church.' },
      { title: 'How to Study a Difficult Text', manual: 'Gospel of John — Part I', desc: 'Deepen Bible interpretation methods for complex and challenging passages.' },
      { title: 'Prophecy', manual: 'Revelation I–IV', desc: 'Study God\'s plan for the future and understand Revelation\'s message in the context of all Scripture.' },
      { title: 'Pastoral Ministry', manual: 'Lord, Give Me a Heart Devoted to You (2 Corinthians)', desc: 'Develop the character and heart of a servant who leads after the model of Christ.' },
      { title: 'Spiritual Counseling II', manual: 'Sexuality from a Biblical Perspective', desc: 'Receive biblical tools to respond to contemporary challenges and offer sound spiritual guidance.' },
      { title: 'Christian Ethics', manual: 'Deuteronomy', desc: 'Discover the principles by which God desires His people to live.' },
      { title: 'Christian Ethics II', manual: '1 Corinthians', desc: 'Apply the truths of Scripture to practical challenges in personal life and in the church.' },
      { title: 'Leadership Principles', manual: '1 and 2 Samuel', desc: 'Learn essential lessons about leadership, character, integrity, and spiritual influence from the lives of biblical leaders.' },
    ],
    structure: [],
    outcomes: [
      { title: 'Mature biblical leadership', desc: 'You will learn to lead people and teams based on the principles of Scripture.' },
      { title: 'Deep understanding of the Word', desc: 'You will develop the ability to study, interpret, and teach complex passages from the Bible.' },
      { title: 'Equipping for strategic ministry', desc: 'You will be prepared for greater responsibilities in the church, mentoring, and developing other leaders.' },
      { title: 'Multiplying impact', desc: 'You will gain the tools needed to form new leaders and contribute to the expansion of God\'s work.' },
    ],
    ctaPrimary: { label: 'Continue to Level II' },
    ctaSecondary: { label: 'Request more information' },
  },

  'nivelul-3-4': {
    name: 'Levels III–IV',
    tagline: 'Continue growing in the knowledge of Scripture and in ministry',
    overview:
      'Levels III–IV are intended for those who want to deepen their understanding of all Scripture and be equipped for greater responsibilities in the church, mentoring, teaching, and developing other leaders.',
    whoCanApply: [
      'Graduates of Level II',
      'Actively serving in leadership in the local church',
    ],
    documents: ['Level II Diploma', 'Application form'],
    curriculum: [
      { title: 'Bible Doctrines', manual: 'Romans and Hebrews', desc: 'Deepen the great truths of the Christian faith.' },
      { title: 'Spiritual Counseling', manual: 'Various manuals', desc: 'Learn to offer biblical guidance for life\'s challenges, healing of soul wounds, spiritual warfare, and making decisions according to God\'s will.' },
      { title: 'Leadership & Leader Development', manual: 'Ezra, Haggai, Nehemiah, Numbers', desc: 'Study biblical leadership principles for forming leaders.' },
      { title: 'Church Growth & Equipping', manual: 'Various manuals', desc: 'Discover biblical principles for church development and preparing believers for ministry.' },
      { title: 'Prophets & Prophetic Books', manual: 'Old Testament Prophets', desc: 'Explore the messages of the Old Testament prophets and their relevance for the believer today.' },
      { title: 'Church History', manual: 'Acts of the Apostles', desc: 'Understand the development of the early Church.' },
      { title: 'Practical Christian Life', manual: 'Various topics', desc: 'Study themes such as grace, holiness, suffering, obedience, and living a life dedicated to Christ.' },
    ],
    structure: [],
    outcomes: [
      { title: 'Scriptural maturity', desc: 'You will be equipped to study, teach, and apply Scripture with maturity.' },
      { title: 'Leader formation', desc: 'You will influence and form other people for ministry in future generations.' },
    ],
    ctaPrimary: { label: 'Discover the full program' },
    ctaSecondary: { label: 'Contact us for more information' },
  },

  'efnl-a1': {
    name: 'EFNL A1',
    tagline: 'Training to teach English at beginner level',
    overview:
      'This program prepares teachers and leaders who want to use the English language for evangelism and discipleship through study groups, clubs, and missionary projects. The program uses materials specially developed for learning English based on biblical truths.',
    whoCanApply: [
      'People who want to use English as a mission tool',
      'Leaders who want to coordinate English groups and clubs',
    ],
    documents: ['Application form'],
    curriculum: [
      { title: 'English for a New Life', manual: 'EFNL A1 Level PDF', desc: 'Complete material for teaching English at beginner level with integrated biblical content.' },
      { title: 'Biblical Management', manual: 'Biblical Management PDF', desc: 'Management and organizational principles based on Scripture.' },
    ],
    structure: [
      'Teaching EFNL A1 courses',
      'Leading English groups and clubs',
      'Using English as a tool for evangelism and discipleship',
    ],
    outcomes: [
      { title: 'Teach EFNL A1', desc: 'You will be qualified to teach courses at the beginner level.' },
      { title: 'Coordinate groups', desc: 'You will be able to lead English groups and clubs.' },
      { title: 'Mission through English', desc: 'You will use English as a practical tool for evangelism.' },
    ],
    ctaPrimary: { label: 'Apply for EFNL A1' },
    ctaSecondary: { label: 'Download PDF materials' },
    ctaTertiary: { label: 'Become an EFNL Teacher' },
  },

  'efnl-a2': {
    name: 'EFNL A2',
    tagline: 'Training to teach English at intermediate level',
    overview:
      'This program develops the skills needed to coordinate EFNL groups at the intermediate level and to use biblical materials in educational and missionary contexts.',
    whoCanApply: [
      'EFNL A1 graduates',
      'People who want to coordinate and mentor other EFNL teachers',
    ],
    documents: ['EFNL A1 Certificate', 'Application form'],
    curriculum: [
      { title: 'English for a New Life', manual: 'EFNL A2 Level PDF', desc: 'Material for teaching English at intermediate level.' },
      { title: 'Rediscover Inner Peace', manual: 'Rediscover Inner Peace PDF', desc: 'Biblical material for study at intermediate level.' },
    ],
    structure: [
      'Teaching EFNL A2 courses',
      'Coordinating intermediate level groups',
      'Preparing and mentoring new EFNL teachers',
    ],
    outcomes: [
      { title: 'Teach EFNL A2', desc: 'You will be qualified to teach at intermediate level.' },
      { title: 'Mentor teachers', desc: 'You will be able to prepare and mentor new EFNL teachers.' },
    ],
    ctaPrimary: { label: 'Apply for EFNL A2' },
    ctaSecondary: { label: 'Download PDF materials' },
    ctaTertiary: { label: 'Become an EFNL Teacher' },
  },

  'efnl-kids': {
    name: 'EFNL Kids',
    tagline: 'Training to teach English to children',
    overview:
      'The program prepares teachers and workers who want to use the English language in ministry with children through interactive lessons, practical activities, and biblical materials adapted to their age.',
    whoCanApply: [
      'People who work with children in a church or educational context',
      'Leaders who want to organize clubs and camps for children',
    ],
    documents: ['Application form'],
    curriculum: [
      { title: 'EFNL for Kids', manual: 'EFNL for Kids PDF', desc: 'Interactive material for teaching English to children with biblical content.' },
      { title: 'Honor Your Parents', manual: 'Honor Your Parents PDF', desc: 'Biblical material adapted for children about respect and family.' },
    ],
    structure: [
      'Leading EFNL Kids groups',
      'Organizing clubs and camps for children',
      'Using EFNL materials in children\'s ministry',
    ],
    outcomes: [
      { title: 'Teach children', desc: 'You will be qualified to lead EFNL Kids groups.' },
      { title: 'Organize activities', desc: 'You will be able to organize clubs and camps for children.' },
    ],
    ctaPrimary: { label: 'Apply for EFNL Kids' },
    ctaSecondary: { label: 'Download PDF materials' },
    ctaTertiary: { label: 'Become an EFNL Teacher' },
  },

  'misiune-sport': {
    name: 'International School of Mission through Sport',
    tagline: 'Turn your passion for sport into a mission tool',
    overview:
      'The International School of Mission through Sport prepares leaders and missionaries who want to use sport for evangelism, discipleship, and developing the next generation. The program combines inductive Bible study, mentoring, and practical preparation to help churches reach children, teenagers, and young people through relevant and effective sports activities.',
    whoCanApply: [
      'Leaders and servants involved in ministry',
      'Sports coaches and instructors',
      'People who love sport and want to use it in mission',
      'Christians who want to reach the new generation in a relevant way',
    ],
    documents: ['Application form'],
    curriculum: [
      { title: 'Mission through sport', manual: 'Taekwondo / Football', desc: 'Learn how to use sport to build relationships and create opportunities for evangelism.' },
      { title: 'Inductive Bible study', manual: 'Various manuals', desc: 'Gain the tools needed to study and teach Scripture clearly and applicably.' },
      { title: 'Mentoring and discipleship', manual: 'Discipleship principles', desc: 'Learn how to invest in people and make disciples who will in turn influence others.' },
      { title: 'Leadership & ministry development', manual: 'Practical principles', desc: 'Develop practical skills for coordinating groups, organizing activities, and forming new leaders.' },
    ],
    structure: [
      '3-year program',
      'Two months of intensive study per year',
      'Immediate practical application in the local church and community',
      'Mentoring and support from instructors',
      'Emphasis on multiplying ministry and forming new disciples',
    ],
    outcomes: [
      { title: 'Evangelism through sport', desc: 'You will be prepared to use sport as an evangelism tool.' },
      { title: 'Practical discipleship', desc: 'You will develop an impactful ministry in your community.' },
    ],
    ctaPrimary: { label: 'Discover the full program' },
    ctaSecondary: { label: 'Visit the IMS website' },
  },

  'lucrare-copii': {
    name: 'Ministry with Children',
    tagline: 'Training servants who invest in the next generation',
    overview:
      'The Ministry with Children program trains servants who understand the specifics of working with children and teach them the Word of God, building a solid biblical foundation in their lives.',
    whoCanApply: [
      'People involved in children\'s ministry in the local church',
      'Educators and teachers who want to integrate Bible study',
      'Active members of a local church',
    ],
    documents: ['Application form', 'Pastoral recommendation'],
    curriculum: [
      { title: 'Specifics of children\'s ministry', manual: 'Precept Kids Materials', desc: 'Understand the stages of child development and how to adapt Bible study for each age group.' },
      { title: 'Interactive teaching methods', manual: 'Various materials', desc: 'Gain practical and creative tools for teaching Scripture to children in a relevant way.' },
      { title: 'Character formation', manual: 'Biblical materials for children', desc: 'Learn how to form Christian values and character in children\'s lives through the study of the Word.' },
    ],
    structure: [
      'Intensive training sessions',
      'Supervised practice in children\'s ministry',
      'Mentoring from instructors',
    ],
    ctaPrimary: { label: 'Apply now' },
    ctaSecondary: { label: 'Contact us' },
  },
}
