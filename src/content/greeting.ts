/**
 * Edit this file to personalize the greeting.
 * All user-facing copy lives here — no need to hunt through components.
 */

export const greeting = {
  recipientName: 'Gellian',

  // Hero / sealed envelope
  heroLine: 'A little surprise, made with care — just for you.',
  openCta: 'Open',

  // Bloom sequence
  bloomLine: 'May every petal carry a quiet prayer for your joy.',

  // Scripture stage
  scriptureIntro: 'Tap the card, then swipe for the next Verseen.',
  scriptureContinueCta: 'Open your cards',
  verses: [
    {
      id: 'numbers-6',
      reference: 'Numbers 6:24–25',
      text: 'The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you.',
    },
    {
      id: 'psalm-20',
      reference: 'Psalm 20:4',
      text: 'May he give you the desire of your heart and make all your plans succeed.',
    },
    {
      id: 'psalm-90',
      reference: 'Psalm 90:17',
      text: 'May the favor of the Lord our God rest on us; establish the work of our hands for us.',
    },
    {
      id: 'proverbs-3',
      reference: 'Proverbs 3:5–6',
      text: 'Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.',
    },
    {
      id: 'jeremiah-29',
      reference: 'Jeremiah 29:11',
      text: '“For I know the plans I have for you,” declares the Lord, “plans to prosper you and not to harm you, plans to give you hope and a future.”',
    },
  ],

  // Interactive flip cards
  cards: [
    {
      id: 'wish',
      front: 'A Wish',
      back: 'May this year wrap you in quiet joy, soft laughter, and adventures that feel like home.',
    },
    {
      id: 'heart',
      front: 'From the Heart',
      back: 'You make ordinary days feel brighter — Charot HAHAHa ayyy nindut kaayug title peru maguba dri na part',
    },
    {
      id: 'memory',
      front: 'A Memory',
      back: 'Wala Pajud tawn HAHAHA',
    },
    {
      id: 'promise',
      front: 'A Promise',
      back: 'I\'ll keep cheering for you — Basin,Magbinootan ra bitaw ko HAHAH',
    },
  ],

  // Finale
  finaleTitle: 'Happy Birthday',
  finaleMessage: `Kape Tata Char bitaw I hope you’re having a really great day today though kadlawon pa, para unya na HAHAH. Wishing you more happy moments, good memories, and blessings in this new chapter of your life. Keep being yourself and enjoy every moment. You deserve to have a good one today. Special Day niha Bithday baya dili kay normal days ra hap. Dont think na normal rajud ni na day woii SPECIAL NI, Kay +1 napod raba imong Edad AHHAH tigulanggg na ohhh Bitaw happy birthdayyyy... Dili na nku taason oi dli nmn ako writer ehhh
KUHAA ning gift Diri AHHAHA

PS. Ubanan ko nimu mo lag? HAHAH`,
  finaleVerse: {
    reference: 'Jeremiah 29:11',
    text: '“For I know the plans I have for you,” declares the Lord, “plans to prosper you and not to harm you, plans to give you hope and a future.”',
  },
  hugCta: 'Send a Hug',
  hugTease: 'CHARR MO SEND HUG DAW SIYA',
  hugEnjoy: 'Enjoy the show',
  hugCloseCta: 'Back to message',
  replayCta: 'Replay',

  // Soft background music (CC0). Swap for a local file under public/ if you prefer.
  musicSrc: 'https://archive.org/download/BeyondSingle/beyond_piano.mp3',
  musicCredit: 'Beyond (Piano Edit) — Pablo Perez (CC0)',
} as const

export type GreetingCard = (typeof greeting.cards)[number]
