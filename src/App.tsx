/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { InfiniteScrollSabotage } from './components/InfiniteScrollSabotage';
import {
  StolenTimeWidget,
  DigitalLaborReceipt
} from './components/DigitalLaborReceipt';
import { SkinnerPullPost, PebblingDmPost } from './components/RetentionEngineeringWidget';
import {
  ProfileAvatar,
  AvatarProfileInfo,
  AvatarVariant
} from './components/ProfileAvatar';
import { IMAGES } from './assets/images';
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  Home,
  Compass,
  Film,
  Flame,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Star,
  BadgeCheck,
  Eye,
  X,
  Clock,
  ShieldAlert,
  AlertTriangle,
  Layers
} from 'lucide-react';

interface FlameParticle {
  id: number;
  leftPercent: number;
  delayMs: number;
  sizeClass: string;
}

interface CommentItem {
  user: string;
  avatar: AvatarVariant;
  text: string;
  time: string;
}

const INITIAL_LIKES: Record<string, number> = {
  '00-stats': 24,
  '00-history': 19,
  '1.1-hcd': 31,
  '1.2-context': 18,
  '2.1-world': 29,
  '2.2-reels': 42,
  '2.2-skinner': 37,
  '2.3-pebbling': 26,
  '3.1-studies': 53,
  '3.2-longterm': 44,
  '3.2-slides': 39,
  '04-care': 68
};

const HISTORY_ERAS = [
  {
    period: '2010-2012',
    title: 'Le Polaroid numérique',
    sub: 'Systrom et Krieger · Flux chronologique fini',
    badge: 'Quand on a tout vu, on ferme l’application',
    image: IMAGES.instaPolaroidCoffee,
    witnessCaption: 'Un café au soleil avant de reprendre le travail ☕ #polaroid'
  },
  {
    period: '2012-2016',
    title: 'L’ère Facebook et le graphe social',
    sub: 'Rachat pour 1 milliard $ · Flux algorithmique (2016)',
    badge: 'Quantification sociale par les mentions j’aime',
    image: IMAGES.instaPanopticMuseum,
    witnessCaption: 'Naissance des influenceurs et du score social chiffré.'
  },
  {
    period: '2016-2020',
    title: 'Le clonage de Snapchat et les stories',
    sub: 'Contenus éphémères de 24 heures',
    badge: 'Boucle d’urgence quotidienne',
    image: IMAGES.vulnIsolementFriends,
    witnessCaption: 'Story amis proches · Expire dans 24h pour forcer le retour quotidien.'
  },
  {
    period: '2020-2026',
    title: 'La panique TikTok et les recommandations IA',
    sub: 'Du graphe social au graphe d’intérêt',
    badge: 'Aucun point d’arrêt · Rétention maximale',
    image: IMAGES.instaReelVerticalScene,
    witnessCaption: 'Inconnus recommandés par intelligence artificielle en plein écran vertical sans fin.'
  }
];

const HCD_VULNERABILITIES = [
  {
    tag: 'L’angoisse de l’oubli',
    title: 'La peur que nos vies ne laissent aucune trace',
    image: IMAGES.vulnOubliNostalgia,
    hcdPromise: 'Un musée personnel et un journal de bord pour conserver nos souvenirs.',
    hiddenThought: 'Si un moment n’est pas publié et chiffré en cœurs, il semble ne pas avoir existé.'
  },
  {
    tag: 'L’isolement social urbain',
    title: '« Rapprochez-vous de ceux que vous aimez »',
    image: IMAGES.vulnIsolementFriends,
    hcdPromise: 'Cocons d’intimité (amis proches et messages privés) : 81 % des adolescents s’y sentent plus proches de leurs amis (Pew Research Center).',
    hiddenThought: 'Les stories expirent en 24 heures : le soin amical devient une vérification permanente.'
  },
  {
    tag: 'La peur du vide et l’ennui',
    title: 'Combler l’attente et anesthésier le stress',
    image: IMAGES.vulnEnnuiWaiting,
    hcdPromise: 'À court terme, le défilement vidéo agit comme un tampon émotionnel face à l’ennui.',
    hiddenThought: 'Éradiquer toute tolérance au calme pour rendre le cerveau dépendant au flux.'
  },
  {
    tag: 'La peur d’être exclu et la précarité',
    title: 'Ne rien manquer du groupe et monétiser sa passion',
    image: IMAGES.memeFomoInsta,
    hcdPromise: 'Rester connecté aux références communes et permettre aux créateurs de vivre de leur contenu.',
    hiddenThought: 'Anxiété d’être hors-jeu socialement et production gratuite de contenus sept jours sur sept.'
  }
];

const LONGTERM_SLIDES = [
  {
    tag: 'Déplacement de l’isolement',
    title: 'La solitude hyper-connectée',
    image: IMAGES.longtermSolitudeHyperconnectee,
    description:
      'La profondeur des relations humaines est remplacée par la largeur de l’audience : entouré de millions de comptes, mais fondamentalement seul face à l’écran.'
  },
  {
    tag: 'Entretien de la marque personnelle',
    title: 'La perssion numérique',
    image: IMAGES.longtermEpuisementPerformatif,
    description:
      'Maintenir sa façade numérique et nourrir l’algorithme sous peine d’invisibilisation transforme le soin de soi en source permanente de stress.'
  }
];

export default function App() {
  const [activeSectionId, setActiveSectionId] = useState<string>('00');
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [heartBurstPost, setHeartBurstPost] = useState<Record<string, number>>({});

  // Modal d'agrandissement de la photo de profil
  const [zoomedAvatar, setZoomedAvatar] = useState<AvatarProfileInfo | null>(null);

  // États interactifs des carrousels (avec support du glisser à la souris)
  const [historyTab, setHistoryTab] = useState<number>(0);
  const [hcdSlide, setHcdSlide] = useState<number>(0);
  const [longtermSlide, setLongtermSlide] = useState<number>(0);
  const [decodeHcdSlide, setDecodeHcdSlide] = useState<Record<number, boolean>>({});
  const [decodeContext, setDecodeContext] = useState<boolean>(false);

  const dragStartXRef = useRef<number | null>(null);

  // Flammes sur la story amis proches
  const [flamesSent, setFlamesSent] = useState<number>(6);
  const [flameParticles, setFlameParticles] = useState<FlameParticle[]>([]);
  const [storySecondsLeft, setStorySecondsLeft] = useState<number>(86382);

  // Section conclusion : les 3 interrupteurs du design du soin
  const [careSwitchStoppingCue, setCareSwitchStoppingCue] = useState<boolean>(false);
  const [careSwitchHideMetrics, setCareSwitchHideMetrics] = useState<boolean>(false);
  const [careSwitchDisableInfinite, setCareSwitchDisableInfinite] = useState<boolean>(false);

  const allCareSwitchesActive =
    careSwitchStoppingCue && careSwitchHideMetrics && careSwitchDisableInfinite;

  // Chronomètre de temps volé
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Transition fluide Clair -> Noir (Effets & Angles morts) -> Blanc (Conclusion)
  const isDarkSection =
    (activeSectionId.startsWith('2.') || activeSectionId.startsWith('3.')) &&
    !allCareSwitchesActive;

  const effectiveTimerRunning = isTimerRunning && !allCareSwitchesActive;

  useEffect(() => {
    if (!effectiveTimerRunning) return;
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
      setStorySecondsLeft((prev) => (prev > 0 ? prev - 1 : 86400));
    }, 1000);
    return () => clearInterval(interval);
  }, [effectiveTimerRunning]);

  useEffect(() => {
    const keys = ['00', '1.1', '1.2', '2.1', '2.2', '2.3', '3.1', '3.2', '04'];
    const handleScroll = () => {
      const center = window.innerHeight * 0.42;
      let closest = '00';
      let minDist = Infinity;

      for (const key of keys) {
        const el = sectionRefs.current[key];
        if (el) {
          const rect = el.getBoundingClientRect();
          const dist = Math.abs(rect.top + rect.height / 2 - center);
          if (dist < minDist) {
            minDist = dist;
            closest = key;
          }
        }
      }
      setActiveSectionId(closest);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (key: string) => {
    const el = sectionRefs.current[key];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setActiveSectionId(key);
  };

  const triggerLike = (postKey: string, forceLike = false) => {
    setLikedPosts((prev) => {
      const nextLiked = forceLike ? true : !prev[postKey];
      if (nextLiked) {
        setHeartBurstPost((b) => ({ ...b, [postKey]: Date.now() }));
      }
      return { ...prev, [postKey]: nextLiked };
    });
  };

  const handleSendFlameReaction = () => {
    setFlamesSent((n) => n + 1);
    const now = Date.now();
    const batch: FlameParticle[] = [
      { id: now + 1, leftPercent: 22 + Math.random() * 55, delayMs: 0, sizeClass: 'text-3xl' },
      { id: now + 2, leftPercent: 32 + Math.random() * 45, delayMs: 60, sizeClass: 'text-4xl' },
      { id: now + 3, leftPercent: 18 + Math.random() * 60, delayMs: 120, sizeClass: 'text-2xl' },
      { id: now + 4, leftPercent: 40 + Math.random() * 35, delayMs: 180, sizeClass: 'text-3xl' }
    ];
    setFlameParticles((prev) => [...prev, ...batch]);
    setTimeout(() => {
      setFlameParticles((prev) => prev.filter((p) => !batch.some((b) => b.id === p.id)));
    }, 1250);
  };

  // Gestion du glisser à la souris ou au doigt sur les carrousels
  const handleSwipeStart = (clientX: number) => {
    dragStartXRef.current = clientX;
  };

  const handleSwipeEnd = (
    clientX: number,
    currentIdx: number,
    maxIdx: number,
    setter: React.Dispatch<React.SetStateAction<number>>
  ) => {
    if (dragStartXRef.current === null) return;
    const deltaX = clientX - dragStartXRef.current;
    dragStartXRef.current = null;
    if (Math.abs(deltaX) > 35) {
      if (deltaX < 0) {
        setter(currentIdx < maxIdx ? currentIdx + 1 : 0);
      } else {
        setter(currentIdx > 0 ? currentIdx - 1 : maxIdx);
      }
    }
  };

  const formatCountdown = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const renderHeartBurstOverlay = (postKey: string) => {
    const burstKey = heartBurstPost[postKey];
    if (!burstKey) return null;
    return (
      <div
        key={burstKey}
        className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center"
      >
        <Heart className="w-24 h-24 text-[#FF3040] fill-current insta-heart-burst" />
      </div>
    );
  };

  const renderPostFooter = (
    postKey: string,
    username: string,
    caption: string,
    comments: CommentItem[]
  ) => {
    const isLiked = Boolean(likedPosts[postKey]);
    const likesCount = (INITIAL_LIKES[postKey] || 20) + (isLiked ? 1 : 0);

    return (
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => triggerLike(postKey)}
              className="cursor-pointer focus:outline-none"
            >
              <Heart
                key={isLiked ? 'liked' : 'unliked'}
                className={`w-6 h-6 transition-transform ${
                  isLiked
                    ? 'text-[#FF3040] fill-current insta-like-bounce'
                    : 'hover:opacity-70'
                }`}
              />
            </button>
            <MessageCircle className="w-6 h-6 hover:opacity-70 cursor-pointer" />
            <Send className="w-6 h-6 hover:opacity-70 cursor-pointer" />
          </div>
          <Bookmark className="w-6 h-6 hover:opacity-70 cursor-pointer" />
        </div>

        {!careSwitchHideMetrics ? (
          <div className="text-xs font-bold tabular-nums">{likesCount} mentions j’aime</div>
        ) : (
          <div className="text-xs opacity-60">Compteur masqué</div>
        )}

        <p className="text-xs leading-relaxed">
          <strong className="mr-1.5">{username}</strong>
          {caption}
        </p>

        {comments.length > 0 && (
          <div className="pt-2 border-t border-current/10 space-y-2">
            {comments.map((c, idx) => (
              <div key={idx} className="flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <ProfileAvatar
                    variant={c.avatar}
                    size="sm"
                    onSelectAvatar={setZoomedAvatar}
                  />
                  <div>
                    <strong className="mr-1.5">{c.user}</strong>
                    <span className="opacity-90">{c.text}</span>
                  </div>
                </div>
                <span className="text-[11px] opacity-50 shrink-0">{c.time}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const cardSurfaceClass = isDarkSection
    ? 'bg-[#121212] border-[#262626] text-[#F5F5F5]'
    : 'bg-white border-[#DBDBDB] text-[#111827]';

  const subtleSurfaceClass = isDarkSection
    ? 'bg-[#181818] border-[#262626] text-[#F5F5F5]'
    : 'bg-[#FAFAFA] border-[#EFEFEF] text-[#111827]';

  const currentEra = HISTORY_ERAS[historyTab];
  const currentVulnerability = HCD_VULNERABILITIES[hcdSlide];
  const currentLongterm = LONGTERM_SLIDES[longtermSlide];
  const isCurrentHcdDecoded = Boolean(decodeHcdSlide[hcdSlide]);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 relative ${
        isDarkSection
          ? 'bg-[#0A0A0A] text-[#F5F5F5]'
          : 'bg-[#FAFAFA] text-[#111827]'
      }`}
    >
      {/* Modal d'agrandissement de la photo de profil quand on clique sur la tête d'une personne */}
      {zoomedAvatar && (
        <div
          onClick={() => setZoomedAvatar(null)}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`max-w-sm w-full rounded-2xl overflow-hidden border p-5 ${
              isDarkSection
                ? 'bg-[#181818] border-[#363636] text-white'
                : 'bg-white border-[#DBDBDB] text-[#111827]'
            }`}
          >
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-current/10">
              <div>
                <div className="text-sm font-bold">{zoomedAvatar.name}</div>
                <div className="text-xs text-[#0095F6] font-medium">{zoomedAvatar.handle}</div>
              </div>
              <button
                type="button"
                onClick={() => setZoomedAvatar(null)}
                className="p-1.5 rounded-full hover:bg-current/10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="aspect-square w-full rounded-xl overflow-hidden bg-[#EFEFEF]">
              <img
                src={zoomedAvatar.src}
                alt={zoomedAvatar.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs opacity-80 mt-3 text-center">{zoomedAvatar.role}</p>
          </div>
        </div>
      )}

      {/* SIDEBAR GAUCHE SANS NOMBRES */}
      <aside
        className={`hidden lg:flex flex-col justify-between fixed top-0 left-0 z-30 w-[250px] h-screen border-r px-4 py-6 transition-colors duration-300 ${
          isDarkSection
            ? 'bg-[#000000] border-[#262626] text-white'
            : 'bg-white border-[#DBDBDB] text-[#262626]'
        }`}
      >
        <div>
          <a
            href="#sec-00"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('00');
            }}
            className="flex items-center gap-2.5 px-3.5 pb-5 text-xl font-bold tracking-tight"
          >
            <ProfileAvatar
              variant="care"
              size="sm"
              ringColor="green"
              onSelectAvatar={setZoomedAvatar}
            />
            <span>Instagram</span>
          </a>

          <nav className="space-y-0.5">
            <button
              type="button"
              onClick={() => scrollToSection('00')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-xs rounded-xl text-left cursor-pointer ${
                activeSectionId === '00'
                  ? 'font-bold bg-current/5'
                  : 'opacity-75 hover:opacity-100 hover:bg-current/5'
              }`}
            >
              <Home className="w-4 h-4 shrink-0" />
              <span>Chiffres et histoire</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('1.1')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-xs rounded-xl text-left cursor-pointer ${
                activeSectionId === '1.1'
                  ? 'font-bold text-[#00BA7C] bg-current/5'
                  : 'opacity-75 hover:opacity-100 hover:bg-current/5'
              }`}
            >
              <Star className="w-4 h-4 text-[#00BA7C] shrink-0" />
              <span>Les vulnérabilités</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('1.2')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-xs rounded-xl text-left cursor-pointer ${
                activeSectionId === '1.2'
                  ? 'font-bold bg-current/5'
                  : 'opacity-75 hover:opacity-100 hover:bg-current/5'
              }`}
            >
              <Layers className="w-4 h-4 shrink-0" />
              <span>Pour qui et contexte</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('2.1')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-xs rounded-xl text-left cursor-pointer ${
                activeSectionId === '2.1'
                  ? 'font-bold text-[#FF3040] bg-current/5'
                  : 'opacity-75 hover:opacity-100 hover:bg-current/5'
              }`}
            >
              <Compass className="w-4 h-4 shrink-0" />
              <span>Quel monde ouvre-t-il ?</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('2.2')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-xs rounded-xl text-left cursor-pointer ${
                activeSectionId === '2.2'
                  ? 'font-bold text-[#FF3040] bg-current/5'
                  : 'opacity-75 hover:opacity-100 hover:bg-current/5'
              }`}
            >
              <Film className="w-4 h-4 shrink-0" />
              <span>Reels et Skinner</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('2.3')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs rounded-xl text-left cursor-pointer ${
                activeSectionId === '2.3'
                  ? 'font-bold text-[#FF3040] bg-current/5'
                  : 'opacity-75 hover:opacity-100 hover:bg-current/5'
              }`}
            >
              <span className="flex items-center gap-3">
                <Send className="w-4 h-4 shrink-0" />
                <span>Conduites (messages)</span>
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-[#FF3040] text-white rounded-full">
                17
              </span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('3.1')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-xs rounded-xl text-left cursor-pointer ${
                activeSectionId === '3.1' || activeSectionId === '3.2'
                  ? 'font-bold text-[#FF3040] bg-current/5'
                  : 'opacity-75 hover:opacity-100 hover:bg-current/5'
              }`}
            >
              <AlertTriangle className="w-4 h-4 text-[#FF3040] shrink-0" />
              <span>Facebook Files et ticket</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('04')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-xs rounded-xl text-left cursor-pointer ${
                activeSectionId === '04'
                  ? 'font-bold text-[#00BA7C] bg-current/5'
                  : 'opacity-75 hover:opacity-100 hover:bg-current/5'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-[#00BA7C] shrink-0" />
              <span>Conclusion</span>
            </button>
          </nav>
        </div>

        {/* Temps volé en bas de la sidebar */}
        <StolenTimeWidget
          elapsedSeconds={elapsedSeconds}
          isRunning={effectiveTimerRunning}
          isDarkSection={isDarkSection}
          onToggleRun={() => setIsTimerRunning((r) => !r)}
          onReset={() => setElapsedSeconds(0)}
        />
      </aside>

      {/* FLUX CENTRAL INSTAGRAM CENTRÉ */}
      <div className="relative z-10 w-full lg:pl-[250px] flex justify-center px-3 sm:px-6 py-8 pb-24">
        <main className="w-full max-w-[520px] space-y-12">
          {/* ===================================================================
              THÈSE, CHIFFRES ET HISTOIRE D'INSTAGRAM
             =================================================================== */}
          <section
            id="sec-00"
            ref={(el) => {
              sectionRefs.current['00'] = el;
            }}
            className="space-y-8 scroll-mt-8"
          >
            {/* Bannière de thèse centrale */}
            <div className={`p-5 rounded-2xl border transition-colors duration-300 ${cardSurfaceClass}`}>
              <div className="flex items-center gap-3 mb-2.5">
                <ProfileAvatar
                  variant="care"
                  size="md"
                  ringColor="green"
                  onSelectAvatar={setZoomedAvatar}
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold">culture.du.soin</span>
                    <BadgeCheck className="w-4 h-4 text-[#0095F6]" />
                  </div>
                  <div className="text-[11px] opacity-60">Thèse centrale</div>
                </div>
              </div>
              <p className="text-base font-bold leading-snug">
                « Instagram est un pharmakon : une architecture d’extraction d’attention déguisée en infrastructure de soin. »
              </p>
            </div>

            {/* Post des 4 grands chiffres */}
            <article className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${cardSurfaceClass}`}>
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <ProfileAvatar
                    variant="stats"
                    size="md"
                    ringColor="blue"
                    onSelectAvatar={setZoomedAvatar}
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold">observatoire.meta</span>
                      <BadgeCheck className="w-3.5 h-3.5 text-[#0095F6]" />
                    </div>
                    <div className="text-[11px] opacity-60">Instagram en quatre chiffres clés</div>
                  </div>
                </div>
              </div>

              <div
                onDoubleClick={() => triggerLike('00-stats', true)}
                className="relative grid grid-cols-2 gap-px bg-[#DBDBDB] border-y border-current/10 select-none cursor-pointer"
              >
                {renderHeartBurstOverlay('00-stats')}

                <div className={`p-6 flex flex-col justify-between min-h-[165px] transition-colors duration-300 ${cardSurfaceClass}`}>
                  <span className="text-[11px] font-medium opacity-60">
                    Un tiers des internautes mondiaux
                  </span>
                  <div>
                    <div className="text-3xl sm:text-4xl font-bold tracking-tight tabular-nums">
                      2,5 Mds
                    </div>
                    <div className="text-xs mt-1 opacity-80">
                      Utilisateurs actifs par mois
                    </div>
                  </div>
                </div>

                <div className={`p-6 flex flex-col justify-between min-h-[165px] transition-colors duration-300 ${cardSurfaceClass}`}>
                  <span className="text-[11px] font-semibold text-[#0095F6]">
                    Jeunes en construction
                  </span>
                  <div>
                    <div className="text-3xl sm:text-4xl font-bold tracking-tight tabular-nums">
                      60 %
                    </div>
                    <div className="text-xs mt-1 opacity-80">
                      Ont entre 18 et 34 ans
                    </div>
                  </div>
                </div>

                <div className={`p-6 flex flex-col justify-between min-h-[165px] transition-colors duration-300 ${cardSurfaceClass}`}>
                  <span className="text-[11px] font-semibold text-[#00BA7C]">
                    Privatisation des échanges
                  </span>
                  <div>
                    <div className="text-3xl sm:text-4xl font-bold tracking-tight tabular-nums">
                      23 %
                    </div>
                    <div className="text-xs mt-1 opacity-80">
                      De l’activité en messages privés
                    </div>
                  </div>
                </div>

                <div className={`p-6 flex flex-col justify-between min-h-[165px] transition-colors duration-300 ${cardSurfaceClass}`}>
                  <span className="text-[11px] font-semibold text-[#FF3040]">
                    Rétention vidéo
                  </span>
                  <div>
                    <div className="text-3xl sm:text-4xl font-bold tracking-tight text-[#FF3040] tabular-nums">
                      50 %
                    </div>
                    <div className="text-xs mt-1 font-medium">
                      Du temps total passé sur les Reels
                    </div>
                  </div>
                </div>
              </div>

              {renderPostFooter(
                '00-stats',
                'observatoire.meta',
                '2,5 milliards d’utilisateurs et la moitié du temps total désormais absorbée par les Reels.',
                []
              )}
            </article>

            {/* Carrousel visuel de l'histoire d'Instagram (2010 à 2026) glissable à la souris */}
            <article className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${cardSurfaceClass}`}>
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <ProfileAvatar
                    variant="hcd"
                    size="md"
                    ringColor="blue"
                    onSelectAvatar={setZoomedAvatar}
                  />
                  <div>
                    <div className="text-xs font-bold">histoire.instagram</div>
                    <div className="text-[11px] opacity-60">
                      De 2010 à 2026 · Glissez l’image avec la souris
                    </div>
                  </div>
                </div>
              </div>

              {/* Image 100 % dégagée glissable à la souris */}
              <div
                onMouseDown={(e) => handleSwipeStart(e.clientX)}
                onMouseUp={(e) => handleSwipeEnd(e.clientX, historyTab, 3, setHistoryTab)}
                onTouchStart={(e) => handleSwipeStart(e.touches[0].clientX)}
                onTouchEnd={(e) => handleSwipeEnd(e.changedTouches[0].clientX, historyTab, 3, setHistoryTab)}
                onDoubleClick={() => triggerLike('00-history', true)}
                className="relative aspect-square w-full bg-black overflow-hidden select-none cursor-grab active:cursor-grabbing"
              >
                {renderHeartBurstOverlay('00-history')}

                <img
                  src={currentEra.image}
                  alt={currentEra.title}
                  referrerPolicy="no-referrer"
                  draggable={false}
                  className="w-full h-full object-cover"
                />

                {/* Badge discret en haut à gauche */}
                <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-full bg-black/70 text-white text-xs font-bold">
                  {currentEra.period}
                </div>

                {/* Flèches gauche / droite sur l'image */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setHistoryTab((t) => (t > 0 ? t - 1 : 3));
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center cursor-pointer z-20"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setHistoryTab((t) => (t < 3 ? t + 1 : 0));
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center cursor-pointer z-20"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Informations placées sous l'image pour ne pas cacher la photo */}
              <div className="px-4 pt-3.5 pb-1 space-y-2">
                <div className="flex items-center justify-center gap-1.5">
                  {HISTORY_ERAS.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setHistoryTab(idx)}
                      className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
                        historyTab === idx ? 'bg-[#0095F6]' : 'bg-current/20'
                      }`}
                    />
                  ))}
                </div>

                <div>
                  <div className="text-xs font-semibold text-[#0095F6]">
                    {currentEra.badge}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold mt-0.5">
                    {currentEra.title}
                  </h3>
                  <p className="text-xs opacity-75">{currentEra.sub}</p>
                </div>
              </div>

              {renderPostFooter(
                '00-history',
                'histoire.instagram',
                currentEra.witnessCaption,
                []
              )}
            </article>
          </section>

          {/* ===================================================================
              QUELLES VULNÉRABILITÉS L'APPLICATION PRÉTEND-ELLE PRENDRE EN CHARGE ?
             =================================================================== */}
          <section
            id="sec-1.1"
            ref={(el) => {
              sectionRefs.current['1.1'] = el;
            }}
            className="space-y-8 scroll-mt-8"
          >
            <article className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${cardSurfaceClass}`}>
              {/* En-tête bien espacé sans numéro */}
              <div className="px-5 py-4">
                <div className="flex items-center justify-between gap-6">
                  <div className="flex items-center gap-3">
                    <ProfileAvatar
                      variant="closefriends"
                      size="md"
                      ringColor="green"
                      onSelectAvatar={setZoomedAvatar}
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold">atelier.hcd</span>
                        <span className="px-2 py-0.5 bg-[#00BA7C] text-white text-[10px] font-bold rounded-full flex items-center gap-1">
                          <Star className="w-2.5 h-2.5 fill-current" />
                          Amis proches
                        </span>
                      </div>
                      <div className="text-xs opacity-75 mt-1">
                        Quelle vulnérabilité l’application prétend-elle prendre en charge ?
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setDecodeHcdSlide((prev) => ({
                        ...prev,
                        [hcdSlide]: !prev[hcdSlide]
                      }))
                    }
                    className={`px-3.5 py-2 rounded-full text-xs font-semibold border transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 ${
                      isCurrentHcdDecoded
                        ? 'bg-[#FF3040] text-white border-[#FF3040]'
                        : 'bg-[#ECFDF5] text-[#047857] border-[#A7F3D0] hover:bg-[#D1FAE5]'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>
                      {isCurrentHcdDecoded ? 'Arrière-pensée' : 'Décoder'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Image 100 % visible et distincte pour chaque vulnérabilité, glissable à la souris */}
              <div
                onMouseDown={(e) => handleSwipeStart(e.clientX)}
                onMouseUp={(e) => handleSwipeEnd(e.clientX, hcdSlide, 3, setHcdSlide)}
                onTouchStart={(e) => handleSwipeStart(e.touches[0].clientX)}
                onTouchEnd={(e) => handleSwipeEnd(e.changedTouches[0].clientX, hcdSlide, 3, setHcdSlide)}
                onDoubleClick={() => triggerLike('1.1-hcd', true)}
                className="relative aspect-square w-full bg-black overflow-hidden select-none cursor-grab active:cursor-grabbing"
              >
                {renderHeartBurstOverlay('1.1-hcd')}

                <img
                  src={currentVulnerability.image}
                  alt={currentVulnerability.title}
                  referrerPolicy="no-referrer"
                  draggable={false}
                  className="w-full h-full object-cover"
                />

                {/* Flammes qui remontent sur la deuxième vulnérabilité (isolement) */}
                <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
                  {flameParticles.map((particle) => (
                    <div
                      key={particle.id}
                      style={{
                        left: `${particle.leftPercent}%`,
                        bottom: '40px',
                        animationDelay: `${particle.delayMs}ms`
                      }}
                      className={`absolute insta-flame-particle select-none ${particle.sizeClass}`}
                    >
                      🔥
                    </div>
                  ))}
                </div>

                {/* Flèches gauche / droite sur l'image */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setHcdSlide((s) => (s > 0 ? s - 1 : 3));
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center cursor-pointer z-20"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setHcdSlide((s) => (s < 3 ? s + 1 : 0));
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center cursor-pointer z-20"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Texte placé sous l'image pour que la photo ne soit jamais cachée */}
              <div
                className={`px-5 pt-4 pb-2 transition-colors ${
                  isCurrentHcdDecoded
                    ? 'bg-[#1F0508] text-white'
                    : ''
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span
                    className={`font-bold ${
                      isCurrentHcdDecoded ? 'text-[#FF3040]' : 'text-[#00BA7C]'
                    }`}
                  >
                    {currentVulnerability.tag}
                  </span>
                  <span className="text-[11px] font-semibold opacity-70">
                    {isCurrentHcdDecoded ? 'Mécanique de rétention' : 'Promesse de soin'}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold leading-snug">
                  {currentVulnerability.title}
                </h3>

                <p className="text-xs sm:text-sm mt-1 leading-relaxed opacity-90">
                  {isCurrentHcdDecoded
                    ? currentVulnerability.hiddenThought
                    : currentVulnerability.hcdPromise}
                </p>

                {/* Bouton Réagir (flammes) sur la slide Isolement */}
                {hcdSlide === 1 && (
                  <div className="flex items-center justify-between gap-3 mt-3">
                    <span className="text-xs opacity-80 tabular-nums">
                      Story 24h ({formatCountdown(storySecondsLeft)}) · {flamesSent} 🔥
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSendFlameReaction();
                      }}
                      className="px-4 py-1.5 bg-[#00BA7C] hover:bg-[#009E69] active:scale-95 transition-transform text-white font-bold text-xs rounded-full flex items-center gap-1.5 cursor-pointer"
                    >
                      <Flame className="w-3.5 h-3.5 fill-current" />
                      <span>Réagir</span>
                    </button>
                  </div>
                )}

                {/* Points indicateurs bleus centrés sans Précédent / Suivant */}
                <div className="flex items-center justify-center gap-1.5 mt-3">
                  {HCD_VULNERABILITIES.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setHcdSlide(idx)}
                      className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
                        hcdSlide === idx ? 'bg-[#0095F6]' : 'bg-current/25'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {renderPostFooter(
                '1.1-hcd',
                'atelier.hcd',
                'Glissez l’image avec la souris pour parcourir les quatre vulnérabilités (oubli, isolement, ennui, exclusion).',
                []
              )}
            </article>
          </section>

          {/* Pour qui ? Et dans quel contexte ? */}
          <section
            id="sec-1.2"
            ref={(el) => {
              sectionRefs.current['1.2'] = el;
            }}
            className="scroll-mt-8"
          >
            <article className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${cardSurfaceClass}`}>
              <div className="flex items-center justify-between gap-4 px-5 py-4">
                <div className="flex items-center gap-2.5">
                  <ProfileAvatar
                    variant="stats"
                    size="md"
                    ringColor="green"
                    onSelectAvatar={setZoomedAvatar}
                  />
                  <div>
                    <div className="text-xs font-bold">cible.et.contexte</div>
                    <div className="text-xs opacity-60">
                      Pour qui et dans quel contexte ?
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setDecodeContext((d) => !d)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 ${
                    decodeContext
                      ? 'bg-[#FF3040] text-white border-[#FF3040]'
                      : 'bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{decodeContext ? 'Arrière-pensée' : 'Décoder'}</span>
                </button>
              </div>

              <div
                onDoubleClick={() => triggerLike('1.2-context', true)}
                className="relative grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#DBDBDB] border-y border-current/10 select-none cursor-pointer"
              >
                {renderHeartBurstOverlay('1.2-context')}

                {/* Volet Pour qui */}
                <div className={`p-6 flex flex-col justify-between space-y-3 transition-colors duration-300 ${cardSurfaceClass}`}>
                  <div>
                    <div className="flex items-center gap-2 mb-2.5">
                      <ProfileAvatar
                        variant="creator1"
                        size="sm"
                        ringColor="blue"
                        onSelectAvatar={setZoomedAvatar}
                      />
                      <ProfileAvatar
                        variant="creator2"
                        size="sm"
                        ringColor="green"
                        onSelectAvatar={setZoomedAvatar}
                      />
                      <span className="text-xs font-bold text-[#0095F6]">
                        Pour qui ?
                      </span>
                    </div>
                    <h3 className="text-lg font-bold leading-snug">
                      Jeunes adultes (15-35 ans · 60 %)
                    </h3>
                    <p className="text-xs opacity-85 mt-1.5 leading-relaxed">
                      {decodeContext
                        ? 'Forte neuroplasticité : cerveau hyper-perméable au regard des pairs et dépendant à la validation chiffrée.'
                        : 'Jeunes en pleine construction identitaire où la reconnaissance du groupe est vitale.'}
                    </p>
                  </div>
                </div>

                {/* Volet Dans quel contexte */}
                <div className={`p-6 flex flex-col justify-between space-y-3 transition-colors duration-300 ${cardSurfaceClass}`}>
                  <div>
                    <div className="flex items-center gap-2 mb-2.5">
                      <Clock className="w-4 h-4 text-[#00BA7C]" />
                      <span className="text-xs font-bold text-[#00BA7C]">
                        Dans quel contexte ?
                      </span>
                    </div>
                    <h3 className="text-lg font-bold leading-snug">
                      Les interstices du quotidien
                    </h3>
                    <p className="text-xs opacity-85 mt-1.5 leading-relaxed">
                      {decodeContext
                        ? 'Coloniser chaque micro-temps mort (transports, ascenseur, file d’attente, insomnie) pour supprimer toute pause.'
                        : 'Accompagner chaque petite pause de la journée avec un contenu immédiat.'}
                    </p>
                  </div>
                </div>
              </div>

              {renderPostFooter(
                '1.2-context',
                'cible.et.contexte',
                'Cibler les 15-35 ans dans chaque micro-temps mort du quotidien.',
                []
              )}
            </article>
          </section>

          {/* ===================================================================
              EFFETS DU DESIGN (BASCULE FLUIDE EN SOMBRE)
             =================================================================== */}
          {/* Quel monde ouvre-t-il ? */}
          <section
            id="sec-2.1"
            ref={(el) => {
              sectionRefs.current['2.1'] = el;
            }}
            className="scroll-mt-8"
          >
            <article className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${cardSurfaceClass}`}>
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <ProfileAvatar
                    variant="skinner"
                    size="md"
                    ringColor="red"
                    onSelectAvatar={setZoomedAvatar}
                  />
                  <div>
                    <div className="text-xs font-bold">monde.instagram</div>
                    <div className="text-[11px] opacity-60">
                      Effets du design · Quel monde ouvre-t-il ?
                    </div>
                  </div>
                </div>
              </div>

              <div
                onDoubleClick={() => triggerLike('2.1-world', true)}
                className="relative aspect-square w-full bg-black overflow-hidden select-none cursor-pointer"
              >
                {renderHeartBurstOverlay('2.1-world')}

                <img
                  src={IMAGES.decorPhotogeniqueCafe}
                  alt="Le monde réel réduit à un décor photogénique"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="px-5 pt-4 pb-1 space-y-1">
                <div className="text-xs font-bold text-[#FF3040]">
                  Panoptique esthétique et compétition quantifiée
                </div>
                <h3 className="text-base sm:text-lg font-bold leading-snug">
                  Le monde réel réduit à un décor photogénique
                </h3>
                <p className="text-xs opacity-85 leading-relaxed">
                  Tout lieu, repas ou émotion est évalué pour son potentiel photographique et indexé sur un marché boursier de l’attention (cœurs, vues, abonnés).
                </p>
              </div>

              {renderPostFooter(
                '2.1-world',
                'monde.instagram',
                'Quand le réel n’existe que s’il est photographié et chiffré.',
                []
              )}
            </article>
          </section>

          {/* Quelle expérience produit-il ? (Les Reels + Skinner séparé) */}
          <section
            id="sec-2.2"
            ref={(el) => {
              sectionRefs.current['2.2'] = el;
            }}
            className="space-y-8 scroll-mt-8"
          >
            {/* Publication A : Les Reels */}
            <article className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${cardSurfaceClass}`}>
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <ProfileAvatar
                    variant="reels"
                    size="md"
                    ringColor="red"
                    onSelectAvatar={setZoomedAvatar}
                  />
                  <div>
                    <div className="text-xs font-bold">experience.reels</div>
                    <div className="text-[11px] opacity-60">
                      Quelle expérience produit-il ? · Distorsion temporelle
                    </div>
                  </div>
                </div>
              </div>

              <InfiniteScrollSabotage
                disableInfiniteScroll={careSwitchDisableInfinite}
                hideMetrics={careSwitchHideMetrics}
                onSelectAvatar={setZoomedAvatar}
              />

              {renderPostFooter(
                '2.2-reels',
                'experience.reels',
                'Dès que l’on tente de quitter les Reels, le défilement infini s’emballe sans point d’arrêt.',
                []
              )}
            </article>

            {/* Publication B (séparée) : Conditionnement skinnerien */}
            <article className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${cardSurfaceClass}`}>
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <ProfileAvatar
                    variant="skinner"
                    size="md"
                    ringColor="red"
                    onSelectAvatar={setZoomedAvatar}
                  />
                  <div>
                    <div className="text-xs font-bold">labo.skinner</div>
                    <div className="text-[11px] opacity-60">
                      Conditionnement skinnerien · Ratio variable
                    </div>
                  </div>
                </div>
              </div>

              <SkinnerPullPost onSelectAvatar={setZoomedAvatar} />

              {renderPostFooter(
                '2.2-skinner',
                'labo.skinner',
                'Cliquez sur l’image ou le bouton : l’incertitude de la récompense libère la dopamine (B.F. Skinner).',
                []
              )}
            </article>
          </section>

          {/* Quelles conduites normalise-t-il ? */}
          <section
            id="sec-2.3"
            ref={(el) => {
              sectionRefs.current['2.3'] = el;
            }}
            className="scroll-mt-8"
          >
            <article className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${cardSurfaceClass}`}>
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <ProfileAvatar
                    variant="leo"
                    size="md"
                    ringColor="blue"
                    onSelectAvatar={setZoomedAvatar}
                  />
                  <div>
                    <div className="text-xs font-bold">conduites.messages</div>
                    <div className="text-[11px] opacity-60">
                      Quelles conduites normalise-t-il ? · Partage vidéo et dette relationnelle
                    </div>
                  </div>
                </div>
              </div>

              <PebblingDmPost onSelectAvatar={setZoomedAvatar} />

              {renderPostFooter(
                '2.3-pebbling',
                'conduites.messages',
                'L’amitié réduite à un flux de vidéos à traiter sous la pression du « Vu il y a 2h ».',
                []
              )}
            </article>
          </section>

          {/* ===================================================================
              ANGLES MORTS : FACEBOOK FILES ET TICKET DE CAISSE
             =================================================================== */}
          <section
            id="sec-3.1"
            ref={(el) => {
              sectionRefs.current['3.1'] = el;
            }}
            className="space-y-8 scroll-mt-8"
          >
            {/* Uniquement les Facebook Files */}
            <article className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${cardSurfaceClass}`}>
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <ProfileAvatar
                    variant="blindspots"
                    size="md"
                    ringColor="red"
                    onSelectAvatar={setZoomedAvatar}
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold">facebook.files.wsj</span>
                      <BadgeCheck className="w-4 h-4 text-[#0095F6]" />
                    </div>
                    <div className="text-[11px] opacity-60">
                      Angles morts · Étude interne Meta (Frances Haugen)
                    </div>
                  </div>
                </div>
              </div>

              <div
                onDoubleClick={() => triggerLike('3.1-studies', true)}
                className="relative aspect-square w-full bg-black overflow-hidden select-none cursor-pointer"
              >
                {renderHeartBurstOverlay('3.1-studies')}

                <img
                  src={IMAGES.instaFacebookFilesMirror}
                  alt="Facebook Files dysmorphie adolescente"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="px-5 pt-4 pb-1 space-y-1">
                <div className="text-xs font-bold text-[#FF3040]">
                  Facebook Files (Wall Street Journal · Frances Haugen)
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-[#FF3040] tabular-nums">
                  32 %
                </div>
                <p className="text-xs sm:text-sm font-semibold leading-snug">
                  Des adolescentes souffrant d’une mauvaise image de leur corps déclarent qu’Instagram aggrave leur état (+13 % d’anxiété).
                </p>
              </div>

              {renderPostFooter(
                '3.1-studies',
                'facebook.files.wsj',
                'Meta connaissait en interne ces effets sur la santé mentale mais les a ignorés pour préserver le temps de rétention.',
                []
              )}
            </article>
          </section>

          {/* Quels effets à long terme : Facture thermique + Post 2 images (Solitude hyper-connectée & Épuisement performatif) */}
          <section
            id="sec-3.2"
            ref={(el) => {
              sectionRefs.current['3.2'] = el;
            }}
            className="space-y-8 scroll-mt-8"
          >
            <article className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${cardSurfaceClass}`}>
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <ProfileAvatar
                    variant="stats"
                    size="md"
                    ringColor="red"
                    onSelectAvatar={setZoomedAvatar}
                  />
                  <div>
                    <div className="text-xs font-bold">digital.labor.casilli</div>
                    <div className="text-[11px] opacity-60">
                      Travail gratuit
                    </div>
                  </div>
                </div>
              </div>

              <DigitalLaborReceipt elapsedSeconds={elapsedSeconds} />

              {renderPostFooter(
                '3.2-longterm',
                'digital.labor.casilli',
                'Votre pause sur Instagram est un travail gratuit qui entraîne l’intelligence artificielle publicitaire de Meta (Antonio Casilli).',
                []
              )}
            </article>

            {/* Post à 2 images : Solitude hyper-connectée & Épuisement performatif */}
            <article className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${cardSurfaceClass}`}>
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <ProfileAvatar
                    variant="blindspots"
                    size="md"
                    ringColor="red"
                    onSelectAvatar={setZoomedAvatar}
                  />
                  <div>
                    <div className="text-xs font-bold">effets.long.terme</div>
                    <div className="text-[11px] opacity-60">
                      Quels effets à long terme ?
                    </div>
                  </div>
                </div>
              </div>

              <div
                onMouseDown={(e) => handleSwipeStart(e.clientX)}
                onMouseUp={(e) => handleSwipeEnd(e.clientX, longtermSlide, 1, setLongtermSlide)}
                onTouchStart={(e) => handleSwipeStart(e.touches[0].clientX)}
                onTouchEnd={(e) => handleSwipeEnd(e.changedTouches[0].clientX, longtermSlide, 1, setLongtermSlide)}
                onDoubleClick={() => triggerLike('3.2-slides', true)}
                className="relative aspect-square w-full bg-black overflow-hidden select-none cursor-grab active:cursor-grabbing"
              >
                {renderHeartBurstOverlay('3.2-slides')}

                <img
                  src={currentLongterm.image}
                  alt={currentLongterm.title}
                  referrerPolicy="no-referrer"
                  draggable={false}
                  className="w-full h-full object-cover"
                />

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLongtermSlide((s) => (s === 0 ? 1 : 0));
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center cursor-pointer z-20"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLongtermSlide((s) => (s === 0 ? 1 : 0));
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center cursor-pointer z-20"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="px-5 pt-4 pb-2 space-y-1.5">
                <div className="flex items-center justify-center gap-1.5 mb-2">
                  {LONGTERM_SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setLongtermSlide(idx)}
                      className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
                        longtermSlide === idx ? 'bg-[#0095F6]' : 'bg-current/25'
                      }`}
                    />
                  ))}
                </div>

                <div className="text-xs font-bold text-[#FF3040]">
                  {currentLongterm.tag}
                </div>
                <h3 className="text-base sm:text-lg font-bold leading-snug">
                  {currentLongterm.title}
                </h3>
                <p className="text-xs sm:text-sm opacity-90 leading-relaxed">
                  {currentLongterm.description}
                </p>
              </div>

              {renderPostFooter(
                '3.2-slides',
                'effets.long.terme',
                'Le remède initial s’est retourné en solitude face à l’écran et en corvée d’entretien d’une façade numérique.',
                []
              )}
            </article>
          </section>

          {/* ===================================================================
              CONCLUSION INTERACTIVE (RETRANSITIONNE EN BLANC)
             =================================================================== */}
          <section
            id="sec-04"
            ref={(el) => {
              sectionRefs.current['04'] = el;
            }}
            className="scroll-mt-8"
          >
            <article className={`border-2 border-[#00BA7C] rounded-2xl overflow-hidden transition-colors duration-300 ${cardSurfaceClass}`}>
              <div className="flex items-center justify-between px-4 py-3 border-b border-current/10">
                <div className="flex items-center gap-2.5">
                  <ProfileAvatar
                    variant="ethics"
                    size="md"
                    ringColor="green"
                    onSelectAvatar={setZoomedAvatar}
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold">design.du.soin</span>
                      <BadgeCheck className="w-4 h-4 text-[#00BA7C]" />
                    </div>
                    <div className="text-[11px] opacity-60">
                      Conclusion · Du sans-friction au design du soin
                    </div>
                  </div>
                </div>
              </div>

              <div
                onDoubleClick={() => triggerLike('04-care', true)}
                className="relative p-6 sm:p-8 space-y-6 select-none"
              >
                {renderHeartBurstOverlay('04-care')}

                <div className="space-y-3">
                  <div className="inline-block px-3 py-1 rounded-full bg-[#00BA7C]/15 text-[#00BA7C] text-xs font-bold">
                    Éthique du care
                  </div>
                  <blockquote className="text-base sm:text-lg font-bold leading-relaxed">
                    « Un design qui prend réellement soin de l’humain n’est pas celui qui cherche à le retenir, mais celui qui l’aide à repartir. »
                  </blockquote>
                </div>

                {/* Mini-simulateur à 3 interrupteurs */}
                <div className={`p-5 rounded-2xl border space-y-3.5 ${subtleSurfaceClass}`}>
                  <div className="text-xs font-bold">
                    Activer un vrai design du soin :
                  </div>

                  <label className="flex items-center justify-between gap-4 cursor-pointer">
                    <span className="text-xs sm:text-sm font-medium">
                      Réintroduire un point d’arrêt naturel (« Vous êtes à jour »)
                    </span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={careSwitchStoppingCue}
                      onClick={() => setCareSwitchStoppingCue((v) => !v)}
                      className={`w-11 h-6 rounded-full transition-colors p-0.5 cursor-pointer shrink-0 ${
                        careSwitchStoppingCue ? 'bg-[#00BA7C]' : 'bg-[#DBDBDB]'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white transition-transform ${
                          careSwitchStoppingCue ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </label>

                  <label className="flex items-center justify-between gap-4 cursor-pointer">
                    <span className="text-xs sm:text-sm font-medium">
                      Masquer les compteurs de comparaison sociale (mentions j’aime et vues)
                    </span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={careSwitchHideMetrics}
                      onClick={() => setCareSwitchHideMetrics((v) => !v)}
                      className={`w-11 h-6 rounded-full transition-colors p-0.5 cursor-pointer shrink-0 ${
                        careSwitchHideMetrics ? 'bg-[#00BA7C]' : 'bg-[#DBDBDB]'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white transition-transform ${
                          careSwitchHideMetrics ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </label>

                  <label className="flex items-center justify-between gap-4 cursor-pointer">
                    <span className="text-xs sm:text-sm font-medium">
                      Désactiver la lecture automatique et le défilement infini
                    </span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={careSwitchDisableInfinite}
                      onClick={() => setCareSwitchDisableInfinite((v) => !v)}
                      className={`w-11 h-6 rounded-full transition-colors p-0.5 cursor-pointer shrink-0 ${
                        careSwitchDisableInfinite ? 'bg-[#00BA7C]' : 'bg-[#DBDBDB]'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white transition-transform ${
                          careSwitchDisableInfinite ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </label>
                </div>

                {allCareSwitchesActive ? (
                  <div className="p-6 rounded-2xl bg-[#ECFDF5] border border-[#00BA7C] text-[#065F46] text-center space-y-2">
                    <CheckCircle2 className="w-10 h-10 text-[#00BA7C] mx-auto" />
                    <div className="text-base sm:text-lg font-bold">
                      Vous avez tout vu. Fermez l’écran et retournez habiter le monde réel.
                    </div>
                    <p className="text-xs opacity-85">
                      Le compteur de temps volé en bas à gauche s’est enfin arrêté.
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-xs opacity-70">
                    <span className="flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-[#00BA7C]" />
                      Activez les trois interrupteurs pour apaiser l’interface.
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setCareSwitchStoppingCue(true);
                        setCareSwitchHideMetrics(true);
                        setCareSwitchDisableInfinite(true);
                      }}
                      className="font-bold text-[#00BA7C] underline cursor-pointer shrink-0 ml-2"
                    >
                      Tout activer
                    </button>
                  </div>
                )}
              </div>

              {renderPostFooter(
                '04-care',
                'design.du.soin',
                'Réintroduire de la friction positive pour rendre à l’humain sa liberté.',
                []
              )}
            </article>
          </section>
        </main>
      </div>
    </div>
  );
}
