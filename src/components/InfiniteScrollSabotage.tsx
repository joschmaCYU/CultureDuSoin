import React, { useState, useEffect, useRef } from 'react';
import { Heart, MessageCircle, Send, Bookmark } from 'lucide-react';
import { ProfileAvatar, AvatarVariant, AvatarProfileInfo } from './ProfileAvatar';

interface InfiniteScrollSabotageProps {
  disableInfiniteScroll?: boolean;
  hideMetrics?: boolean;
  onSelectAvatar?: (info: AvatarProfileInfo) => void;
}

const REELS_VISUALS: {
  id: number;
  user: string;
  avatar: AvatarVariant;
  image: string;
  hook: string;
  tag: string;
  likes: string;
  comments: string;
}[] = [
  {
    id: 1,
    user: 'dopamine.daily',
    avatar: 'creator1',
    image: '/src/assets/images/insta_reel_vertical_scene_1794408841850.jpg',
    hook: 'Attends la fin (0:14)',
    tag: 'Horloge système masquée',
    likes: '412 k',
    comments: '3 810'
  },
  {
    id: 2,
    user: 'satisfaisant.loop',
    avatar: 'reels',
    image: '/src/assets/images/dm_thumb_skate_1794409618963.jpg',
    hook: 'Ne cligne pas des yeux',
    tag: 'Flux continu sans pause',
    likes: '2,8 M',
    comments: '41,2 k'
  },
  {
    id: 3,
    user: 'pov.insomnie',
    avatar: 'creator3',
    image: '/src/assets/images/vuln_ennui_waiting_1794409614845.jpg',
    hook: 'Il est 3h12 du matin',
    tag: 'Distorsion temporelle',
    likes: '1,4 M',
    comments: '29,1 k'
  },
  {
    id: 4,
    user: 'routine.matin',
    avatar: 'creator2',
    image: '/src/assets/images/dm_thumb_streetfood_1794409617727.jpg',
    hook: 'Encore une dernière vidéo',
    tag: 'Aucun signal d’arrêt',
    likes: '890 k',
    comments: '12,4 k'
  }
];

export const InfiniteScrollSabotage: React.FC<InfiniteScrollSabotageProps> = ({
  disableInfiniteScroll = false,
  hideMetrics = false,
  onSelectAvatar
}) => {
  const [sabotageState, setSabotageState] = useState<'ready' | 'hijacked' | 'crt_collapsing' | 'stopped'>('ready');
  const [speedFactor, setSpeedFactor] = useState<number>(3.2);
  const [simulatedMinutes, setSimulatedMinutes] = useState<number>(5);
  const [offsetY, setOffsetY] = useState<number>(0);
  const [hasEnteredPost, setHasEnteredPost] = useState<boolean>(false);
  const [hasTriggeredOnLeave, setHasTriggeredOnLeave] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const startHijack = () => {
    if (disableInfiniteScroll) return;
    if (sabotageState === 'hijacked') return;
    setSabotageState('hijacked');
    setSpeedFactor(3.5);
    setSimulatedMinutes(5);
    lastTimeRef.current = performance.now();
  };

  const stopSabotage = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    setSabotageState('crt_collapsing');
    setTimeout(() => {
      setSabotageState('stopped');
    }, 420);
  };

  useEffect(() => {
    if (disableInfiniteScroll && sabotageState === 'hijacked') {
      setSabotageState('stopped');
    }
  }, [disableInfiniteScroll, sabotageState]);

  // 1) Détecte quand l'utilisateur arrive sur la publication "Les Reels"
  // 2) Dès qu'il commence à scroller pour quitter la publication, le scroll infini démarre rapidement
  useEffect(() => {
    if (disableInfiniteScroll || hasTriggeredOnLeave || sabotageState !== 'ready') return;

    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      if (!hasEnteredPost && rect.top <= vh * 0.45 && rect.bottom >= vh * 0.45) {
        setHasEnteredPost(true);
        return;
      }

      if (hasEnteredPost && rect.top < vh * 0.18 && rect.bottom > 100) {
        setHasTriggeredOnLeave(true);
        startHijack();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [disableInfiniteScroll, hasEnteredPost, hasTriggeredOnLeave, sabotageState]);

  // Touche Échap pour arrêter rapidement pendant l'exposé
  useEffect(() => {
    if (sabotageState !== 'hijacked') return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        stopSabotage();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [sabotageState]);

  // Animation rapide du flux infini
  useEffect(() => {
    if (sabotageState !== 'hijacked') return;

    const step = (now: number) => {
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = now;

      setSpeedFactor((prev) => Math.min(prev + dt * 5.5, 24));
      setSimulatedMinutes((prev) => Math.min(prev + dt * 7.2, 45));
      setOffsetY((prev) => (prev + dt * 460 * speedFactor) % 1920);

      animFrameRef.current = requestAnimationFrame(step);
    };

    animFrameRef.current = requestAnimationFrame(step);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [sabotageState, speedFactor]);

  const blurPx = sabotageState === 'hijacked' ? Math.min((speedFactor - 1) * 0.35, 5.5) : 0;

  return (
    <div
      ref={containerRef}
      className="bg-[#000000] text-white relative overflow-hidden select-none"
    >
      {/* Barre supérieure "Les Reels" avec compteur rouge "Temps estimé passé" en haut à droite */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#262626] bg-[#000000] z-20 relative">
        <div className="flex items-center gap-2.5">
          <span className="font-bold text-sm tracking-tight">Les Reels</span>
          <span className="text-xs text-[#A8A8A8]">·</span>
          <span className="text-xs text-[#A8A8A8]">
            {sabotageState === 'hijacked'
              ? 'Défilement infini enclenché'
              : 'Pour vous'}
          </span>
        </div>

        <div className="px-3 py-1 bg-[#FF3040] text-white text-xs font-bold rounded-md tabular-nums">
          Temps estimé passé : {Math.round(simulatedMinutes)} min
        </div>
      </div>

      {/* Corps visuel des Reels */}
      {sabotageState === 'stopped' ? (
        <div className="h-[480px] flex flex-col items-center justify-center p-8 text-center bg-[#0A0A0A]">
          <div className="w-14 h-0.5 bg-[#00BA7C] mb-5" />
          <h3 className="text-2xl font-bold text-white mb-2">
            Vous êtes à jour
          </h3>
          <p className="text-xs text-[#A8A8A8] max-w-xs leading-relaxed">
            Il a fallu réintroduire un signal d’arrêt extérieur pour interrompre la boucle automatique.
          </p>
        </div>
      ) : (
        <div
          onClick={() => {
            if (sabotageState === 'ready') startHijack();
          }}
          className={`h-[480px] relative overflow-hidden cursor-pointer ${
            sabotageState === 'crt_collapsing' ? 'crt-collapse bg-white' : ''
          }`}
        >
          <div
            style={{
              transform: `translateY(-${offsetY % 1920}px)`,
              filter: blurPx > 0 ? `blur(${blurPx.toFixed(1)}px)` : 'none'
            }}
            className="flex flex-col"
          >
            {[...REELS_VISUALS, ...REELS_VISUALS, ...REELS_VISUALS].map((reel, idx) => (
              <div
                key={`${reel.id}-${idx}`}
                className="h-[480px] border-b border-[#262626] relative flex flex-col justify-between p-6 overflow-hidden bg-black"
              >
                <img
                  src={reel.image}
                  alt={reel.hook}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                />

                <div className="relative z-10 flex items-center justify-between text-xs">
                  <span className="px-2.5 py-1 bg-black/75 rounded-md font-semibold text-white">
                    {reel.tag}
                  </span>
                </div>

                <div className="relative z-10 flex items-end justify-between">
                  <div className="bg-black/75 p-3 rounded-xl">
                    <div className="flex items-center gap-2.5">
                      <ProfileAvatar
                        variant={reel.avatar}
                        size="sm"
                        ringColor="red"
                        onSelectAvatar={onSelectAvatar}
                      />
                      <span className="text-sm font-bold text-white">@{reel.user}</span>
                      <span className="text-xs px-2.5 py-0.5 border border-white/40 rounded-md text-white font-medium">
                        Suivre
                      </span>
                    </div>
                    <div className="text-xs text-[#DBDBDB] mt-1.5">
                      {reel.hook} · Audio original
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-4 text-white bg-black/70 p-2.5 rounded-xl">
                    <div className="flex flex-col items-center gap-1">
                      <Heart className="w-6 h-6 text-[#FF3040] fill-current" />
                      {!hideMetrics && (
                        <span className="text-[11px] font-bold tabular-nums">{reel.likes}</span>
                      )}
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <MessageCircle className="w-6 h-6" />
                      {!hideMetrics && (
                        <span className="text-[11px] font-bold tabular-nums">{reel.comments}</span>
                      )}
                    </div>
                    <Send className="w-6 h-6" />
                    <Bookmark className="w-6 h-6" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
