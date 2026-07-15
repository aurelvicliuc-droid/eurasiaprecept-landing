export interface ProgramTranslation {
  name: string
  tagline: string
  overview: string
  whoCanApply: string[]
  documents: string[]
  curriculum: Array<{ title: string; manual?: string; manualHref?: string; manuals?: Array<{ title: string; href?: string; alternatives?: Array<{ title: string; href?: string }> }>; desc?: string }>
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
    ctaSecondary: { label: 'Download pastoral recommendation form', href: '/forms/institut-recomandare-en.docx' },
    ctaTertiary: { label: 'Download the Institute brochure', href: '/forms/institut-brosura-en.pdf' },
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
      'Total duration: 3-4 years',
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
    ctaTertiary: { label: 'Download the school brochure', href: '/forms/scoala-timotei-brosura-en.pdf' },
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
    documents: ['Level I Diploma', 'Recommendation from the teacher or local coordinator'],
    curriculum: [
      { title: 'Missiology', manuals: [{ title: 'The Sermon on the Mount' }], desc: 'Understand the Church\'s calling to bring the Gospel to all nations and discover biblical principles of missionary work.' },
      { title: 'Equipping the Church', manuals: [{ title: 'Spiritual Gifts' }], desc: 'Discover how God equips believers for ministry and how spiritual gifts can be developed in the local church.' },
      { title: 'How to Study a Difficult Text', manuals: [{ title: 'Gospel of John (Part I)' }], desc: 'Deepen Bible interpretation methods for complex and challenging passages.' },
      { title: 'Prophecy', manuals: [
        { title: 'Revelation (Part I)' },
        { title: 'Revelation (Part II)' },
        { title: 'Revelation (Part III)' },
        { title: 'Revelation (Part IV)' },
      ], desc: 'Study God\'s plan for the future and understand Revelation\'s message in the context of all Scripture.' },
      { title: 'Pastoral Ministry', manuals: [{ title: 'Lord, Give Me a Heart Devoted to You (2 Corinthians)' }], desc: 'Develop the character and heart of a servant who leads after the model of Christ.' },
      { title: 'Spiritual Counseling II', manuals: [{ title: 'Sexuality from a Biblical Perspective' }], desc: 'Receive biblical tools to respond to contemporary challenges and offer sound spiritual guidance.' },
      { title: 'Christian Ethics', manuals: [{ title: 'Deuteronomy' }], desc: 'Discover the principles by which God desires His people to live.' },
      { title: 'Christian Ethics II', manuals: [
        { title: '1 Corinthians (Part I)' },
        { title: '1 Corinthians (Part II)' },
      ], desc: 'Apply the truths of Scripture to practical challenges in personal life and in the church.' },
      { title: 'Leadership Principles', manuals: [
        { title: '1 Samuel' },
        { title: '2 Samuel' },
      ], desc: 'Learn essential lessons about leadership, character, integrity, and spiritual influence from the lives of biblical leaders.' },
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
    name: 'Levels III-IV',
    tagline: 'Continue growing in the knowledge of Scripture and in ministry',
    overview:
      'Levels III-IV are intended for those who want to deepen their understanding of all Scripture and be equipped for greater responsibilities in the church, mentoring, teaching, and developing other leaders.',
    whoCanApply: [
      'Graduates of Level II',
      'Actively serving in leadership in the local church',
    ],
    documents: ['Level II Diploma', 'Recommendation from the teacher or local coordinator'],
    curriculum: [
      { title: 'Bible Doctrines', manuals: [
        { title: 'Romans (Part I)' },
        { title: 'Romans (Part II)' },
        { title: 'Romans (Part III)' },
      ] },
      { title: 'Bible Doctrines', manuals: [
        { title: 'Hebrews (Part I)' },
        { title: 'Hebrews (Part II)' },
      ] },
      { title: 'Time Management', manuals: [{ title: '1 Thessalonians' }] },
      { title: 'Church Growth', manuals: [{ title: 'Ephesians' }] },
      { title: 'The Servant of God', manuals: [{ title: 'The Gospel of Mark' }] },
      { title: 'Lord, Have Mercy on Your People', manuals: [{ title: 'Joel, Obadiah' }] },
      { title: 'Understanding the Wrath of God', manuals: [{ title: 'Habakkuk, Nahum and Micah' }] },
      { title: 'Counseling', manuals: [{ title: 'Lord, Heal My Hurts' }] },
      { title: 'Life in Christ', manuals: [{ title: 'Colossians' }] },
      { title: 'Understanding the Lord\'s Promises', manuals: [
        { title: 'Malachi' },
        { title: 'Zechariah' },
      ] },
      { title: 'The Blessings of Obedience and the Consequences of Disobedience', manuals: [{ title: 'Judges' }] },
      { title: 'Spiritual Counseling', manuals: [{ title: 'Spiritual Warfare' }] },
      { title: 'Church History I', manuals: [{ title: 'Acts of the Apostles (Part I)' }] },
      { title: 'Church History II', manuals: [{ title: 'Acts of the Apostles (Part II)' }] },
      { title: 'How to Know You Have Eternal Life', manuals: [{ title: '1, 2 & 3 John' }] },
      { title: 'Anatomy of an Apostle', manuals: [{ title: '2 Corinthians' }] },
      { title: 'Prophecies Before the Fall of Jerusalem', manuals: [{ title: 'Jeremiah (Part I)' }] },
      { title: 'Prophecies Concerning the Nations', manuals: [{ title: 'Jeremiah (Part II)' }] },
      { title: 'Understanding Grace', manuals: [{ title: 'Galatians' }] },
      { title: 'Spiritual Counseling', manuals: [{ title: 'Job' }] },
      { title: 'The Book of Ezekiel (Part I)', manuals: [{ title: 'Ezekiel (Part I)' }] },
      { title: 'The Book of Ezekiel (Part II)', manuals: [{ title: 'Ezekiel (Part II)' }] },
      { title: 'Living in Holiness', manuals: [{ title: 'Leviticus' }] },
      { title: 'How to Stand Firm When Tested', manuals: [{ title: '1 Peter' }] },
      { title: 'Suffering and Glory', manuals: [{ title: '2 Peter' }] },
      { title: 'Leadership Principles', manuals: [{ title: 'Ezra and Haggai' }] },
      { title: 'Courage for Such a Time as This', manuals: [{ title: 'Esther' }] },
      { title: 'Leadership Principles', manuals: [{ title: 'Nehemiah' }] },
      { title: 'Contending for the Faith', manuals: [{ title: 'Jude' }] },
      { title: 'Jesus Christ, the Perfect Man', manuals: [{ title: 'Luke (Part I)' }] },
      { title: 'The Savior of Sinners', manuals: [{ title: 'Luke (Part II)' }] },
      { title: 'Counseling', manuals: [{ title: 'Lord, Help Me Choose You' }] },
      { title: 'Revival or Bondage', manuals: [{ title: '1 Kings and 2 Chronicles' }] },
      { title: 'Discipline in the Church', manuals: [{ title: '1 Timothy' }] },
      { title: 'Leadership Principles', manuals: [{ title: 'Numbers' }] },
      { title: 'The Foundations of Evangelism', manuals: [{ title: 'The Gospel of Matthew (Part I)' }] },
      { title: 'Who Is Jesus? The Christ, the Son of the Living God', manuals: [{ title: 'The Gospel of Matthew (Part II)' }] },
    ],
    structure: [],
    outcomes: [
      { title: 'Scriptural maturity', desc: 'You will be equipped to study, teach, and apply Scripture with maturity.' },
      { title: 'Leader formation', desc: 'You will influence and form other people for ministry in future generations.' },
    ],
    ctaPrimary: { label: 'Discover the full program' },
    ctaSecondary: { label: 'Contact us for more information' },
  },

  'efnl': {
    name: 'English for a New Life',
    tagline: 'Teaching English as a mission tool: levels A1, A2 and for children',
    overview:
      'English for a New Life (EFNL) prepares teachers and leaders who want to use the English language for evangelism and discipleship through study groups, clubs, and missionary projects. The program has three levels (A1, A2 and EFNL for Kids), using materials specially developed based on biblical truths.',
    whoCanApply: [
      'People who want to use English as a mission tool',
      'Leaders who want to coordinate English groups and clubs',
      'People who work with children in a church or educational context',
    ],
    documents: ['Application form'],
    curriculum: [
      { title: 'EFNL A1', manuals: [{ title: 'English for a New Life (A1)' }, { title: 'Biblical Management' }], desc: 'A textbook for teaching English to teenagers, young people and adults at beginner level.' },
      { title: 'EFNL A2', manuals: [{ title: 'English for a New Life (A2)' }, { title: 'Rediscover Inner Peace' }], desc: 'A continuation of level A1, developing communication skills through interactive lessons and applied Bible studies.' },
      { title: 'EFNL for Kids', manuals: [{ title: 'English for a New Life (Kids)' }, { title: 'Honor Your Parents' }], desc: 'A curriculum specially created for children, combining interactive activities, games, songs and Bible lessons to make learning English attractive and effective.' },
    ],
    structure: [
      '3 EFNL levels',
      'Teaching courses and leading English groups',
      'Using English as a tool for evangelism and discipleship',
    ],
    outcomes: [
      { title: 'Teach at any level', desc: 'You will be qualified to teach EFNL A1, A2 or for children.' },
      { title: 'Coordinate groups', desc: 'You will be able to lead English groups and clubs.' },
      { title: 'Mission through English', desc: 'You will use English as a practical tool for evangelism and discipleship.' },
    ],
    ctaPrimary: { label: 'Apply to English for a New Life' },
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
    curriculum: [],
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
      'Training spiritually mature leaders, well grounded in doctrine and methodically equipped to serve children and raise a generation that knows God from Scripture.',
    whoCanApply: [
      'Sunday school teachers',
      'School teachers',
      'Social workers',
      'Sports club coaches',
      'Leaders and coordinators of children\'s clubs, after-school programs and camps',
      'People recommended by their local church who want to get involved in children\'s ministry',
    ],
    documents: ['Application form', 'Pastoral recommendation'],
    curriculum: [
      { title: 'Session 1', manuals: [{ title: 'Wrong Way, Jonah!' }, { title: 'Who Created the World?' }] },
      { title: 'Session 2', manuals: [{ title: 'Journey into the Digital World' }, { title: 'How to Crack the Covenant Code' }] },
      { title: 'Session 3', manuals: [{ title: 'Oh No, I\'m in Trouble!' }, { title: 'Lord, Teach Me to Pray!' }] },
      { title: 'Session 4', manuals: [{ title: 'Lord, What Is Your Name?' }, { title: 'Who Is Jesus?' }] },
      { title: 'Session 5', manuals: [{ title: 'Abraham, the Brave Explorer' }, { title: 'God\'s Amazing Creation' }] },
      { title: 'Session 6', manuals: [{ title: 'Joseph, an Extraordinary Man of God' }, { title: 'How to Become God\'s Champion' }] },
      { title: 'Session 7', manuals: [{ title: 'Sexuality from a Biblical Perspective' }, { title: 'When I\'m Afraid' }] },
    ],
    structure: [
      'Intensive training sessions',
      'Supervised practice in children\'s ministry',
      'Mentoring from instructors',
    ],
    outcomes: [
      { title: 'Biblical & spiritual formation', desc: 'Develop a Christian character and a mature faith.' },
      { title: 'Psycho-pedagogical training', desc: 'Gain skills for effectively teaching children.' },
      { title: 'Teaching Scripture to children', desc: 'Learn to teach Scripture clearly and relevantly.' },
      { title: 'Mentoring & coordination', desc: 'Equip and coordinate children\'s ministry effectively.' },
    ],
    ctaPrimary: { label: 'Apply now' },
    ctaSecondary: { label: 'Download pastoral recommendation form', href: '/forms/institut-recomandare-en.docx' },
    downloadLabel: 'Download pastoral recommendation form',
  },
}
