"use strict";

/*
 * PATAYAN MODE - all-out roast battle.
 * !banat patayan on / off / status
 * Savage banter only: no slurs, no family/death/self-harm jokes, no threats.
 */

const { rememberBanatReply, pickBanatReply } = require("./banat-memory");

const active = new Set();

const PATAYAN_REPLIES = [
  "ang lakas ng loob mo para sa ganyang utak",
  "wala kang laban, pati wifi mo mas matino mag-isip",
  "ikaw yung tipong pumapasok sa debate tapos NPC pa rin lumalabas",
  "kung katangahan lang ang laban, champion ka na",
  "ang sarap mong kausap, parang loading screen: walang nangyayari",
  "may utak ka ba o decoration lang yan sa ulo mo?",
  "lakas ng hangin mo, kulang na lang bagyo",
  "ni hindi ka worth i-reply-an, pero sige trip ko 'to",
  "bumalik ka pag may sense na yung sasabihin mo",
  "yung confidence mo galing sa wala, pero pang-malakasan",
  "ang yabang mo para sa taong laging talo",
  "kahit autocorrect sumuko na sayo",
  "wala kang kwenta kausap pero entertaining kang panoorin mapahiya",
  "sinong nagsabi sayong nakakatawa ka? kasi nagsinungaling sya",
  "pati lamok iniiwasan ka, alam mo ba yun?",
  "ang hina mo, pati signal nahihiya sayo",
  "nag-iisip ka pa lang, tapos na kami sayo",
  "ang ingay mo pero zero laman, parang lata",
  "ginagawa mong mukhang matalino yung mga tanga eh",
  "walang pumapansin sayo sa real life kaya dito ka nagpapapansin no",
  "tigil na, nakakahiya na para sayo, kami na nahihiya",
  "pang-background character lang yang energy mo",
  "ang bagal mo mag-isip, parang 2G",
  "kahit anong sabihin mo, L pa rin 'yan",
  "hindi ka galit, nasasaktan ka lang kasi totoo",
  "ang dami mong sinasabi, wala namang resibo",
  "pa-cool ka pero cringe ka talaga",
  "ang bobo ng take mo, sinubukan pa naming intindihin",
  "yung ego mo mas malaki pa sa ambag mo sa usapan",
  "ikaw na pinaka-fail sa lahat ng nag-try",
  "ang lakas mong magsalita, ang hina mong manalo",
  "kung may award sa pagiging epal, retired ka na sa dami",
  "hinga ka muna, ubos na points mo",
  "bakit ba laging ikaw ang plot hole ng usapan?",
  "magaling ka lang pag walang kalaban, tingnan mo ngayon",
  "natalo ka na, pero nagsasalita ka pa rin, respect",
  "ang pangit ng timing mo, pati ng banat mo",
  "kahit sino na lang pwede pumatay sa argument mo, ang dali",
  "ka-level mo yung buffering, nakakainis tapos walang patutunguhan",
  "sana kasing tibay ng mukha mo yung argument mo",
  "taob ka na, wag ka nang pumalag",
  "pinatay ka na ng sarili mong sinabi, pa-RIP ka na lang",
  "burado na yung point mo, ayusin mo muna",
  "wala ka nang lusot, GG na",
  "sinabi mo yan ng seryoso? sige, ako na yung hahalakhak",
  "hanep, ang bilis mong mapahiya",
  "lagi kang may sagot, laging mali nga lang",
  "ang liit ng utak mo, ang laki ng bibig mo",
  "kung katahimikan ang mura, mayaman ka sana",
  "pinaglihi ka ata sa cringe",
  "pa-victim ka pa, ikaw naman nauna",
  "tapos na round mo, upo ka na",
  "ni-ratio ka ng sarili mong tropa",
  "minute-by-minute ka na lang sinasaktan ng sarili mong chat",
  "ano 'to, practice mo sa pagiging talo?",
  "level up ka naman, same L pa rin since last week",
  "pasok ka na sa banga, luto ka na",
  "wag mo na ituloy, bawal ang umiyak dito",
  "yung comeback mo, absent",
  "kunwari ka pang galit, halata namang talo ka",
  "dami mong satsat, sayang oras ng chat na to"
];

function setPatayan(threadID, on) {
  const key = String(threadID);
  if (on) active.add(key); else active.delete(key);
  return on;
}
function listPatayan() { return [...active]; }
function isPatayan(threadID) { return active.has(String(threadID)); }

function getPatayanReply(threadID) {
  const reply = pickBanatReply(String(threadID), PATAYAN_REPLIES);
  if (reply) rememberBanatReply(String(threadID), reply);
  return reply;
}

module.exports = { listPatayan, setPatayan, isPatayan, getPatayanReply, PATAYAN_REPLIES };
