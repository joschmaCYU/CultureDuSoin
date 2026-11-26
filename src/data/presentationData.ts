export interface SlideData {
  id: number;
  part: 1 | 2 | 3;
  partLabel: string;
  speaker: 'Personne A' | 'Personne B';
  timingEstimate: string;
  title: string;
  subtitle: string;
  handle: string;
  locationTag: string;
  likesCount: string;
  retentionMetric: string;
  hiddenMechanic: string;
  oralScript: string[];
  keyTakeaways: {
    label: string;
    hcdPromise: string;
    surveillanceReality: string;
    metric?: string;
  }[];
}

export const THESIS_STATEMENT =
  "Instagram utilise le Design Centré sur l'Humain (HCD) comme un cheval de Troie. Là où le design du soin devrait soulager une vulnérabilité pour libérer l'utilisateur, Instagram soigne en apparence nos fragilités (solitude, ennui, FOMO, précarité) uniquement pour supprimer toute friction et coloniser 100 % de notre temps disponible.";

export const CORRECTIONS_CHECKLIST = [
  {
    slide: 'Slide 2',
    before: 'INSTGRAM / 50 % du temps total passé',
    after: 'Instagram / 50 % du temps total passé sur les Reels',
    reason: "Correction orthographique et précision sur la rétention vidéo."
  },
  {
    slide: 'Slide 5',
    before: "L'ENNUIE / Scrol infinit / Instagrame à délibérément suprimmé",
    after: "L'ennui / Scroll infini / Instagram a délibérément supprimé",
    reason: 'Correction des trois coquilles signalées pour le jury de design.'
  },
  {
    slide: 'Slides 8, 9 et 10',
    before: 'Parties 2 et 3 manquantes',
    after: 'Ajout complet des effets du design, des angles morts et de la conclusion',
    reason: "Réponse chirurgicale aux 3 colonnes de la grille d'évaluation."
  }
];

export const SLIDES_DATA: SlideData[] = [
  {
    id: 1,
    part: 1,
    partLabel: 'Introduction et cadrage',
    speaker: 'Personne A',
    timingEstimate: '0:00 - 1:00',
    title: 'Culture du soin : Instagram',
    subtitle: "Du design bienveillant à l'architecture de capture temporelle",
    handle: '@culture.du.soin',
    locationTag: 'Cadrage théorique · Thèse centrale',
    likesCount: '2,5 Mds interactions',
    retentionMetric: 'Objectif réel : 100 % du temps disponible',
    hiddenMechanic: 'Cheval de Troie HCD : transformer chaque fragilité humaine en boucle de rétention sans friction.',
    oralScript: [
      "Bonjour à tous. Pour mettre à l'épreuve les concepts de la culture du soin, nous avons choisi d'analyser Instagram.",
      "Pourquoi ce choix ? Parce qu'Instagram est l'exemple parfait d'une application conçue selon les règles du Human-Centered Design (le design centré sur l'humain) : elle se présente comme un espace bienveillant, pensé pour le bien-être relationnel et créatif.",
      "Mais notre thèse aujourd'hui, c'est que derrière cette promesse de « soin », chaque fonctionnalité est en réalité une architecture de capture temporelle : Instagram ne cherche pas à guérir nos vulnérabilités, il cherche à les entretenir pour prendre tout notre temps."
    ],
    keyTakeaways: [
      {
        label: 'Apparence HCD (Le soin)',
        hcdPromise: 'Un espace chaleureux, créatif et relationnel qui répond aux besoins affectifs.',
        surveillanceReality: "Un vernis esthétique rassurant conçu pour abaisser la vigilance critique de l'utilisateur.",
        metric: '0 friction cognitive'
      },
      {
        label: 'Thèse centrale (Fil rouge)',
        hcdPromise: "Soulager la solitude, l'ennui, l'exclusion (FOMO) et la précarité.",
        surveillanceReality: 'Entretenir chirurgicalement ces quatre fragilités pour maximiser le temps de session quotidien.',
        metric: 'Cheval de Troie HCD'
      },
      {
        label: "Les 3 colonnes de l'exercice",
        hcdPromise: '1. Quelles vulnérabilités prétend-il prendre en charge ? Pour qui et dans quel contexte ?',
        surveillanceReality: '2. Quel monde, quelle expérience et quelles conduites ? 3. Quels angles morts et effets à long terme ?',
        metric: 'Analyse en 10 slides'
      }
    ]
  },
  {
    id: 2,
    part: 1,
    partLabel: 'Introduction et cadrage',
    speaker: 'Personne A',
    timingEstimate: '1:00 - 2:00',
    title: 'Instagram en chiffres : pour qui et dans quel contexte ?',
    subtitle: 'La colonisation méthodique des micro-temps morts du quotidien',
    handle: '@donnees.cibles',
    locationTag: 'Colonne 1 · Cible et contexte',
    likesCount: '2 500 000 000 actifs/mois',
    retentionMetric: '50 % du temps total absorbé par les Reels',
    hiddenMechanic: 'Captation interstitielle : remplacer chaque micro-pause cérébrale (ascenseur, transport, lit) par une session.',
    oralScript: [
      "Avant de voir quelles vulnérabilités l'application prétend soigner, répondons aux deux premières questions du HCD : pour qui et dans quel contexte ?",
      "Pour qui ? Avec 2,5 milliards d'utilisateurs dont 60 % ont entre 18 et 34 ans, Instagram cible en priorité les adolescents et jeunes adultes. C'est une tranche d'âge charnière, marquée par une forte vulnérabilité identitaire, sociale et économique : le besoin de validation par les pairs y est à son maximum.",
      "Dans quel contexte ? C'est là que le piège temporel commence. Instagram ne s'utilise plus lors de sessions dédiées, mais dans tous les interstices du quotidien : dans l'ascenseur, dans les transports, entre deux cours, ou dans le lit avant de dormir. Deux chiffres résument cette mutation : 50 % du temps total sur l'application est désormais avalé par les Reels, et près d'un quart de l'activité se passe en messages privés."
    ],
    keyTakeaways: [
      {
        label: '2,5 Mds d’utilisateurs actifs par mois',
        hcdPromise: 'Connecter un tiers des internautes mondiaux sur une plateforme commune.',
        surveillanceReality: "Effet de réseau verrouillé : coût social élevé si l'utilisateur tente de quitter l'application.",
        metric: '1/3 des internautes mondiaux'
      },
      {
        label: '60 % ont entre 18 et 34 ans',
        hcdPromise: 'Accompagner les jeunes adultes dans leur expression personnelle et sociale.',
        surveillanceReality: 'Ciblage d’une population en pleine construction identitaire, hyper-sensible à la validation par les pairs.',
        metric: 'Cible 18-34 ans'
      },
      {
        label: '23 % de l’activité : les messages et DM',
        hcdPromise: 'Favoriser des échanges privés authentiques entre amis.',
        surveillanceReality: 'Privatisation des échanges pour multiplier les notifications entrantes tout au long de la journée.',
        metric: '23 % en messagerie privée'
      },
      {
        label: '50 % du temps total passé sur les Reels',
        hcdPromise: 'Divertir instantanément avec des vidéos courtes adaptées aux goûts de chacun.',
        surveillanceReality: 'Bascule algorithmique vers la rétention vidéo passive et la colonisation des micro-temps morts.',
        metric: '50 % du temps sur les Reels'
      }
    ]
  },
  {
    id: 3,
    part: 1,
    partLabel: 'Partie 1 · Le discours HCD',
    speaker: 'Personne A',
    timingEstimate: '2:00 - 2:30',
    title: '1. Le HCD : quelles fragilités prétend-elle soulager ?',
    subtitle: 'Quatre vulnérabilités humaines transformées en leviers de rétention',
    handle: '@promesse.hcd',
    locationTag: 'Colonne 1 · Les 4 fragilités',
    likesCount: '4 piliers de soin apparent',
    retentionMetric: 'Suppression systématique des frictions',
    hiddenMechanic: "Identifier une douleur psychologique réelle pour y greffer une habitude de consultation compulsivement répétée.",
    oralScript: [
      "Entrons dans la première étape de l'exercice : le discours du Human-Centered Design.",
      "Un bon produit HCD identifie une douleur ou une fragilité humaine et propose une solution sans friction.",
      "Instagram prétend prendre en charge quatre grandes vulnérabilités contemporaines : l'isolement relationnel, l'ennui, l'exclusion culturelle et la précarité économique."
    ],
    keyTakeaways: [
      {
        label: 'Fragilité 1 : L’isolement relationnel',
        hcdPromise: '« Rapprochez-vous de ceux que vous aimez » via les Stories, DM et Amis proches.',
        surveillanceReality: 'Créer une urgence de vérification permanente grâce à la disparition des contenus en 24 heures.',
        metric: 'Cycle de 24h'
      },
      {
        label: 'Fragilité 2 : L’ennui et l’angoisse du vide',
        hcdPromise: 'Combler chaque temps mort par un flux vidéo personnalisé et fluide.',
        surveillanceReality: 'Éliminer tous les signaux d’arrêt naturels (Stopping Cues) via le scroll infini et l’auto-play.',
        metric: '0 signal d’arrêt'
      },
      {
        label: 'Fragilité 3 : L’exclusion culturelle (FOMO)',
        hcdPromise: 'Maintenir l’utilisateur connecté aux tendances, memes et codes de son groupe.',
        surveillanceReality: 'Instaurer la peur d’être marginalisé socialement si l’on se déconnecte quelques jours.',
        metric: 'Synchronisation forcée'
      },
      {
        label: 'Fragilité 4 : La précarité financière',
        hcdPromise: 'Permettre à chacun de monétiser sa passion (« Earn money by doing what you love »).',
        surveillanceReality: 'Transformer le temps de vie des utilisateurs en production gratuite de contenu pour la plateforme.',
        metric: 'Travail algorithmique'
      }
    ]
  },
  {
    id: 4,
    part: 1,
    partLabel: 'Partie 1 · Fragilité n°1',
    speaker: 'Personne A',
    timingEstimate: '2:30 - 3:15',
    title: 'Fragilité n°1 : l’isolement relationnel',
    subtitle: 'Cocons d’intimité gradués et piège de l’éphémérité en 24 heures',
    handle: '@amis.proches',
    locationTag: 'Close Friends · Stories 24h · DM',
    likesCount: 'Liste verte Close Friends',
    retentionMetric: 'Obligation de reconnexion pluri-quotidienne',
    hiddenMechanic: 'L’éphémérité de 24 heures transforme le soin amical en anxiété de manquer une trace fugitive de ses proches.',
    oralScript: [
      "Première vulnérabilité : la peur de l'isolement et de la solitude urbaine. Le slogan officiel d'Instagram au lancement de sa refonte était littéralement : « Rapprochez-vous de ceux que vous aimez ».",
      "Pour prétendre soigner cette solitude, le design crée des cocons d'intimité gradués : les messages privés, les canaux de diffusion et surtout la liste verte des « Amis proches » (Close Friends). L'application promet un espace sécurisé à l'abri du jugement public.",
      "Mais regardez comment cela sert la capture du temps : les Stories durent 24 heures. En créant une intimité éphémère, Instagram oblige l'utilisateur à revenir plusieurs fois par jour pour « prendre des nouvelles » de son cercle proche, transformant le soin relationnel en une vérification permanente."
    ],
    keyTakeaways: [
      {
        label: 'Le cercle vert « Amis proches » (Close Friends)',
        hcdPromise: 'Offrir un refuge intime et bienveillant loin de la pression du profil public.',
        surveillanceReality: 'Utiliser un anneau vert distinctif en haut de l’écran pour déclencher un clic prioritaire immédiat.',
        metric: 'Priorité visuelle n°1'
      },
      {
        label: 'Les Stories éphémères (24 heures)',
        hcdPromise: 'Libérer la spontanéité en garantissant que les photos disparaissent le lendemain.',
        surveillanceReality: 'Imposer un compte à rebours permanent qui force l’utilisateur à ouvrir l’application matin, midi et soir.',
        metric: 'Expiration 24:00:00'
      },
      {
        label: 'Canaux de diffusion et notes',
        hcdPromise: 'Garder le contact direct avec ses créateurs et ses amis en un clin d’œil.',
        surveillanceReality: 'Saturer la boîte de réception de pastilles de notification demandant une validation constante.',
        metric: 'Boucle de présence'
      }
    ]
  },
  {
    id: 5,
    part: 1,
    partLabel: 'Partie 1 · Fragilité n°2',
    speaker: 'Personne A',
    timingEstimate: '3:15 - 4:15',
    title: 'Fragilité n°2 : l’ennui et l’angoisse du vide',
    subtitle: 'Reels, scroll infini et suppression délibérée des signaux d’arrêt (Stopping Cues)',
    handle: '@scroll.infini',
    locationTag: 'Aza Raskin (2006) · Suppression des Stopping Cues',
    likesCount: 'Défilement continu sans fin',
    retentionMetric: '5 min d’attente converties en 45 min de défilement',
    hiddenMechanic: 'Instagram a délibérément supprimé tout signal de fin de page pour court-circuiter la prise de décision consciente.',
    oralScript: [
      "Deuxième vulnérabilité : l'intolérance à l'ennui et au vide. Pour l'humain moderne, attendre 3 minutes à un arrêt de bus sans stimulation est devenu anxiogène. Instagram prétend « soigner » ces temps morts en offrant une distraction immédiate et personnalisée grâce aux Reels.",
      "Le mécanisme clé ici est la suppression des « Stopping Cues », c'est-à-dire les signaux d'arrêt naturels. Quand vous lisez un journal ou regardez un film, il y a une dernière page ou un générique de fin : votre cerveau reçoit un signal qui lui demande « Est-ce que je continue ? ».",
      "Avec le scroll infini (inventé en 2006 par le designer Aza Raskin qui s'en excuse aujourd'hui) et l'auto-play vidéo, Instagram a délibérément supprimé toute friction décisionnelle pour que cinq minutes d'attente deviennent quarante-cinq minutes de défilement."
    ],
    keyTakeaways: [
      {
        label: 'L’ennui comme douleur à anesthésier',
        hcdPromise: 'Offrir un divertissement sur mesure dès que l’utilisateur subit un moment de flottement.',
        surveillanceReality: 'Éradiquer la tolérance au calme pour rendre le cerveau dépendant d’une stimulation visuelle constante.',
        metric: 'Latence < 0,2 seconde'
      },
      {
        label: 'Scroll infini et auto-play vidéo',
        hcdPromise: 'Une navigation fluide, sans effort et sans chargement de page.',
        surveillanceReality: 'Instagram a délibérément supprimé les Stopping Cues (signaux d’arrêt naturels) pour empêcher le cerveau de choisir d’arrêter.',
        metric: 'Aza Raskin (2006)'
      },
      {
        label: 'Démonstration en direct : perte de contrôle',
        hcdPromise: 'L’utilisateur croit maîtriser son temps de pause avec son pouce.',
        surveillanceReality: 'La boucle algorithmique s’emballe et confisque l’attention jusqu’à l’intervention d’un arrêt d’urgence externe.',
        metric: '5 min deviennent 45 min'
      }
    ]
  },
  {
    id: 6,
    part: 1,
    partLabel: 'Partie 1 · Fragilité n°3',
    speaker: 'Personne A',
    timingEstimate: '4:15 - 4:40',
    title: 'Fragilité n°3 : l’exclusion culturelle (FOMO)',
    subtitle: '« See what you’re missing » : la peur d’être hors-jeu socialement',
    handle: '@tendances.fomo',
    locationTag: 'Fear Of Missing Out · Synchronisation culturelle',
    likesCount: 'Sons viraux et memes du jour',
    retentionMetric: 'Coût social de déconnexion maximal',
    hiddenMechanic: 'En accélérant le cycle de vie des références culturelles, quitter Instagram une semaine revient à s’exclure des conversations de son groupe.',
    oralScript: [
      "Troisième fragilité : l'angoisse de l'exclusion culturelle, le fameux FOMO (Fear Of Missing Out). L'écran de connexion d'Instagram affiche littéralement « See what you're missing » (« Voyez ce que vous manquez »).",
      "L'application prétend nous protéger de la marginalisation sociale en nous maintenant synchronisés avec les memes, les sons viraux et les codes esthétiques du moment.",
      "Quitter l'application, même une semaine, c'est risquer de ne plus avoir les références de son groupe social."
    ],
    keyTakeaways: [
      {
        label: 'Injonction « See what you’re missing »',
        hcdPromise: 'Vous aider à rester connecté à la culture vivante et aux passions de vos amis.',
        surveillanceReality: 'Activer explicitement la peur du manque dès l’écran d’accueil pour punir toute absence.',
        metric: 'Alerte FOMO native'
      },
      {
        label: 'Obsolescence accélérée des tendances',
        hcdPromise: 'Découvrir chaque jour de nouveaux formats créatifs, audios viraux et esthétiques.',
        surveillanceReality: 'Rendre les références périmées en 48 heures pour imposer une veille quotidienne obligatoire.',
        metric: 'Cycle viral de 48h'
      }
    ]
  },
  {
    id: 7,
    part: 1,
    partLabel: 'Partie 1 · Fragilité n°4',
    speaker: 'Personne A',
    timingEstimate: '4:40 - 5:00',
    title: 'Fragilité n°4 : la précarité financière et la quête de sens',
    subtitle: '« Earn money by doing what you love » : le mirage de l’ascenseur méritocratique',
    handle: '@programme.creators',
    locationTag: 'Monétisation · Injonction à la production',
    likesCount: 'Promesse Creators Meta',
    retentionMetric: 'Temps de vie converti en production quotidienne',
    hiddenMechanic: 'Pour rester visible dans l’algorithme, le créateur doit alimenter gratuitement la machine en Reels, Stories et Posts 7 jours sur 7.',
    oralScript: [
      "Enfin, quatrième fragilité : l'insécurité économique et la perte de sens au travail chez les jeunes.",
      "Avec son programme Creators (« Earn money by doing what you love »), Instagram prétend offrir un ascenseur social méritocratique où chacun peut monétiser sa passion et son quotidien.",
      "Or, pour espérer plaire à l'algorithme et monétiser son compte, le créateur doit publier tous les jours en Stories, en Reels et en Posts, transformant son temps de vie en temps de production gratuit pour la plateforme."
    ],
    keyTakeaways: [
      {
        label: 'Le rêve de l’indépendance créative',
        hcdPromise: 'Vivre de sa passion sans patron grâce aux outils de monétisation et partenariats intégrés.',
        surveillanceReality: 'Faire miroiter une réussite rare pour inciter des millions d’utilisateurs à produire du contenu haute rétention.',
        metric: '< 1 % vivent des revenus'
      },
      {
        label: 'La servitude algorithmique quotidienne',
        hcdPromise: 'Des statistiques détaillées (Insights) pour aider les créateurs à développer leur audience.',
        surveillanceReality: 'Une pénalité de visibilité immédiate dès que le créateur cesse de publier quelques jours.',
        metric: 'Production 7j/7 exigée'
      }
    ]
  },
  {
    id: 8,
    part: 2,
    partLabel: 'Partie 2 · Les effets du design',
    speaker: 'Personne B',
    timingEstimate: '5:00 - 7:00',
    title: '2. Effets du design : l’architecture de la capture du temps',
    subtitle: 'Lorsque le vernis du soin tombe : quel monde, quelle expérience et quelles conduites ?',
    handle: 'SYS_RETENTION_ENGINE',
    locationTag: 'Colonne 2 · B.F. Skinner · Ratio variable',
    likesCount: 'Métrique : Dwell Time (ms)',
    retentionMetric: 'Renforcement intermittent (Effet Casino)',
    hiddenMechanic: 'Mutation brutale : derrière les cartes pastel du HCD se cache un tableau de bord comportemental de maximisation de la dopamine.',
    oralScript: [
      "Passons à la deuxième partie de l'exercice : quels sont les effets réels de ce design ?",
      "1. D'abord, quel monde ouvre-t-il ? Instagram ouvre un monde où le réel n'existe que s'il est documenté et optimisé. Le design a même modifié notre environnement physique : aujourd'hui, des cafés, des musées ou des hôtels sont conçus architecturalement pour être « instagrammables ». C'est un monde de comparaison sociale quantifiée, où la valeur d'une expérience humaine est indexée sur une métrique visible.",
      "2. Ensuite, quelle expérience produit-il ? Il produit une expérience d'hypnose cognitive et de distorsion du temps. Pour nous faire perdre la notion de l'heure, Instagram utilise un principe de psychologie comportementale théorisé par B.F. Skinner : le renforcement à ratio variable (Variable Ratio Schedule), exactement comme une machine à sous au casino. Lorsque vous tirez l'écran vers le bas (Pull-to-refresh) ou que vous scrollez des Reels, vous ne savez jamais si la prochaine vidéo sera ennuyeuse ou géniale. C'est cette incertitude de la récompense qui maintient un taux élevé de dopamine et empêche le cerveau de fermer l'application.",
      "3. Enfin, quelles conduites ce design normalise-t-il ? Il normalise trois comportements nouveaux qui grignotent notre temps : premièrement, le réflexe moteur inconscient (muscle memory), déverrouiller son téléphone et cliquer sur l'icône Instagram sans même s'en rendre compte, parfois 5 secondes après avoir fermé l'application. Deuxièmement, la performance de la vulnérabilité : avec les Photo Dumps ou les vidéos où l'on se filme en train de pleurer, même l'authenticité et le « lâcher-prise » deviennent des mises en scène calibrées pour la rétention algorithmique. Troisièmement, le « Pebbling » et la dette relationnelle : aujourd'hui, entretenir une amitié sur Instagram consiste à s'envoyer des dizaines de Reels par jour en DM. Le design a transformé l'affection en un flux continu de notifications qu'il faut « traiter », sous peine de culpabiliser vis-à-vis de ses amis grâce à la mention « Vu il y a 2h »."
    ],
    keyTakeaways: [
      {
        label: '1. Quel monde ouvre-t-il ?',
        hcdPromise: 'Un monde esthétique, inspirant et ouvert sur la créativité mondiale.',
        surveillanceReality: 'Un monde panoptique et marchand où chaque lieu, repas ou émotion devient un contenu évalué par un score chiffré (likes, vues).',
        metric: 'Réel indexé sur la métrique'
      },
      {
        label: '2. Quelle expérience produit-il ?',
        hcdPromise: 'Une détente fluide et personnalisée après une journée de travail.',
        surveillanceReality: 'La récompense aléatoire intermittente (B.F. Skinner) : dissociation temporelle (Time Distortion) via le Pull-to-refresh et l’incertitude dopaminergique.',
        metric: 'Variable Ratio Schedule'
      },
      {
        label: '3. Quelles conduites normalise-t-il ?',
        hcdPromise: 'Partager des instants vrais (Photo Dump) et envoyer des clins d’œil à ses amis (DM).',
        surveillanceReality: 'Le réflexe moteur compulsif (Muscle Memory), la mise en scène de l’intime et le « Pebbling » (dette relationnelle sous surveillance du « Vu il y a 2h »).',
        metric: 'Dette relationnelle active'
      }
    ]
  },
  {
    id: 9,
    part: 3,
    partLabel: 'Partie 3 · Les angles morts',
    speaker: 'Personne B',
    timingEstimate: '7:00 - 9:00',
    title: '3. Angles morts : le déplacement des fragilités',
    subtitle: 'Du soin promis à l’épuisement neurologique, psychologique et au Digital Labor',
    handle: 'AUDIT_ANGLES_MORTS',
    locationTag: 'Colonne 3 · Facebook Files · Antonio Casilli',
    likesCount: '32 % aggravation dysmorphie (Meta)',
    retentionMetric: '100 % du temps libre converti en Digital Labor',
    hiddenMechanic: 'Chaque vulnérabilité que le HCD prétendait soigner en Partie 1 est déplacée vers une pathologie chronique plus lucrative pour Meta.',
    oralScript: [
      "Nous arrivons à la troisième et dernière partie : les angles morts du design. Quelles fragilités Instagram produit-il, ignore-t-il ou déplace-t-il à long terme ? En réalité, chaque fragilité qu'il prétendait soigner en Partie 1 est déplacée vers une pathologie plus profonde :",
      "1. Le déplacement de la solitude vers le « Snacking Social » : en prétendant soigner l'isolement, Instagram remplace de vraies conversations (qui demandent du temps et de l'effort) par des micro-interactions sans friction (réagir avec une flamme à une Story). C'est l'équivalent relationnel du fast-food : ça coupe la faim sur le moment, mais ça ne nourrit pas. À la fermeture de l'application, le sentiment de solitude est souvent plus fort qu'avant.",
      "2. Les effets neurologiques à long terme de la suppression de l'ennui : en comblant chaque micro-seconde de notre temps libre, Instagram empêche notre cerveau d'activer ce que les neurosciences appellent le Réseau du Mode par Défaut (Default Mode Network). C'est l'état dans lequel entre notre cerveau quand on regarde par la fenêtre sans rien faire : il est indispensable pour consolider la mémoire, réguler ses émotions et se projeter dans l'avenir. En tuant l'ennui, Instagram produit à long terme de l'anxiété chronique et une fragmentation de l'attention (le syndrome du « Popcorn Brain », qui rend le monde réel trop lent et sous-stimulant).",
      "3. La fragilisation de l'estime de soi ignorée par le design : les études internes de Meta, révélées par la lanceuse d'alerte Frances Haugen dans les Facebook Files, ont prouvé que l'entreprise savait que 32 % des adolescentes souffrant déjà d'un complexe corporel voyaient leur état s'aggraver sur Instagram. Le design ignore volontairement cette fragilité car les contenus qui génèrent de l'envie ou de l'insécurité sont ceux qui maximisent le temps de rétention (dwell time).",
      "4. Enfin, l'angle mort économique majeur : le « Digital Labor » (travail numérique). Comme l'explique le sociologue Antonio Casilli, lorsque nous passons 2 heures par jour sur Instagram en pensant « prendre une pause », nous travaillons gratuitement : chaque milliseconde d'arrêt sur une image entraîne les algorithmes de ciblage publicitaire de Meta."
    ],
    keyTakeaways: [
      {
        label: '1. De l’isolement soigné au « Snacking Social »',
        hcdPromise: 'Maintenir le lien avec des centaines d’amis en un geste rapide (réaction flamme).',
        surveillanceReality: 'Remplacement des liens profonds par une hyper-connexion superficielle et parasociale qui accroît la solitude post-scroll.',
        metric: 'Fast-food relationnel'
      },
      {
        label: '2. De l’ennui comblé à l’atrophie du « Mode par Défaut »',
        hcdPromise: 'Ne plus jamais subir un temps mort improductif ou ennuyeux.',
        surveillanceReality: 'Destruction du Réseau du Mode par Défaut (repos cérébral, mémoire, introspection) et syndrome du « Popcorn Brain ».',
        metric: 'Fragmentation cognitive'
      },
      {
        label: '3. Dysmorphie et santé mentale (Facebook Files)',
        hcdPromise: 'Promouvoir la diversité des corps et l’inspiration lifestyle.',
        surveillanceReality: 'Frances Haugen a révélé que Meta savait que 32 % des adolescentes ayant une mauvaise image de leur corps voient leur état aggravé sur Instagram.',
        metric: '32 % aggravation interne'
      },
      {
        label: '4. L’angle mort économique (Digital Labor)',
        hcdPromise: 'Une application 100 % gratuite au service du divertissement des utilisateurs.',
        surveillanceReality: 'Selon Antonio Casilli, l’utilisateur travaille gratuitement : chaque milliseconde d’attention entraîne les modèles publicitaires de Meta.',
        metric: 'Extraction de valeur'
      }
    ]
  },
  {
    id: 10,
    part: 3,
    partLabel: 'Conclusion · Repenser le soin',
    speaker: 'Personne B',
    timingEstimate: '9:00 - 10:00',
    title: 'Conclusion : du « design sans friction » au « design du soin »',
    subtitle: 'Un design qui prend réellement soin de l’humain n’est pas celui qui cherche à le retenir, mais celui qui l’aide à repartir.',
    handle: '@ethique.du.care',
    locationTag: 'Ouverture critique · Friction positive',
    likesCount: 'Repenser le critère de réussite',
    retentionMetric: 'Objectif Care : qualité de vie écran éteint',
    hiddenMechanic: 'Réintroduire volontairement des points d’arrêt naturels, des fins de flux et une friction protectrice de l’autonomie humaine.',
    oralScript: [
      "Pour conclure cet exercice : l'analyse d'Instagram montre les limites majeures du Human-Centered Design lorsqu'il est soumis au modèle économique de l'économie de l'attention.",
      "En voulant supprimer toutes les frictions pour « soulager » nos vulnérabilités immédiates, le design d'Instagram détruit notre capacité d'autorégulation et confisque notre ressource la plus précieuse : notre temps de vie et de présence au monde.",
      "Si l'on voulait appliquer une véritable éthique du soin (Care) au design d'Instagram, il faudrait faire l'exact inverse : réintroduire de la friction positive, remettre des points d'arrêt naturels, et concevoir une technologie dont le critère de réussite n'est pas le temps passé sur l'écran, mais la qualité de vie retrouvée une fois l'écran éteint. Merci de votre écoute !"
    ],
    keyTakeaways: [
      {
        label: 'Fins de flux explicites (Stopping Cues)',
        hcdPromise: 'Scroll infini qui supprime tout effort de pagination.',
        surveillanceReality: 'Proposition Care : afficher un point d’arrêt net après les contenus des proches suivis, sans injection infinie de recommandations.',
        metric: 'Fin de flux consciente'
      },
      {
        label: 'Friction positive avant le partage et le scroll',
        hcdPromise: 'Auto-play immédiat et envoi compulsif en un clic.',
        surveillanceReality: 'Proposition Care : temps de respiration délibéré et désactivation par défaut de la lecture automatique en boucle.',
        metric: 'Autorégulation restaurée'
      },
      {
        label: 'Nouveau critère de réussite du design',
        hcdPromise: 'Maximiser le Dwell Time et la fréquence d’ouverture quotidienne.',
        surveillanceReality: 'Proposition Care : évaluer la réussite d’une interface à sa capacité à libérer l’utilisateur vers le monde réel.',
        metric: 'Éthique du Care'
      }
    ]
  }
];

export interface ReelMockItem {
  id: number;
  author: string;
  caption: string;
  audio: string;
  views: string;
  dwellTargetMs: number;
  hookType: string;
}

export const INFINITE_REELS_STREAM: ReelMockItem[] = [
  {
    id: 1,
    author: '@dopamine.loop',
    caption: 'Attends la fin... tu ne devineras jamais ce qui se passe à 0:14',
    audio: 'Son viral n°4821 · Boucle hypnotique',
    views: '4,2 M vues',
    dwellTargetMs: 14800,
    hookType: 'Curiosity Gap (Rétention forcée)'
  },
  {
    id: 2,
    author: '@routine.parfaite',
    caption: 'Ma morning routine à 5h du matin dans mon loft minimaliste',
    audio: 'Audio esthétique · Comparaison sociale',
    views: '1,9 M vues',
    dwellTargetMs: 11200,
    hookType: 'Envie et comparaison quantifiée'
  },
  {
    id: 3,
    author: '@meme.relatable',
    caption: 'POV : tu devais dormir à 23h et il est 2h47 du matin sur Reels',
    audio: 'Son accéléré · Normalisation de l’insomnie',
    views: '8,7 M vues',
    dwellTargetMs: 9500,
    hookType: 'Auto-ironie de la perte de contrôle'
  },
  {
    id: 4,
    author: '@astuce.business',
    caption: 'Comment j’ai généré 10 000 € par mois depuis mon téléphone à 19 ans',
    audio: 'Fréquence motivation · Mirage méritocratique',
    views: '3,1 M vues',
    dwellTargetMs: 18400,
    hookType: 'Exploitation de la précarité étudiante'
  },
  {
    id: 5,
    author: '@satisfaisant.video',
    caption: 'Découpe cinétique ultra précise pour calmer ton cerveau en 10 secondes',
    audio: 'ASMR synthétique · Anesthésie sensorielle',
    views: '12,4 M vues',
    dwellTargetMs: 22100,
    hookType: 'Suppression du Réseau du Mode par Défaut'
  },
  {
    id: 6,
    author: '@drama.alert',
    caption: 'Partie 1 sur 14 : pourquoi tout le monde parle de cette histoire',
    audio: 'Tension dramatique · FOMO artificiel',
    views: '6,3 M vues',
    dwellTargetMs: 16900,
    hookType: 'Synchronisation forcée au groupe'
  }
];
