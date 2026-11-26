import React, { useState } from 'react';
import { RefreshCw, Heart, MessageCircle, UserPlus, Eye, Play } from 'lucide-react';
import { ProfileAvatar, AvatarProfileInfo } from './ProfileAvatar';
import { IMAGES } from '../assets/images';

const CASINO_PULLS = [
  {
    badge: '0 notification · Frustration programmée',
    dopamine: 'Anticiper le prochain tirage',
    title: 'Rien de nouveau pour l’instant',
    sub: 'Comme au casino, l’absence de gain pousse le cerveau à tirer à nouveau vers le bas.',
    likes: 0,
    comments: 0,
    follows: 0,
    isJackpot: false
  },
  {
    badge: 'Récompense intermittente',
    dopamine: 'Pic dopaminergique +64 %',
    title: 'Une réaction flamme sur votre story',
    sub: 'Une micro-validation imprévisible suffit à prolonger la session.',
    likes: 3,
    comments: 1,
    follows: 0,
    isJackpot: false
  },
  {
    badge: 'Jackpot à ratio variable (B.F. Skinner)',
    dopamine: 'Pic dopaminergique +195 %',
    title: 'Avalanche de validations sociales',
    sub: 'La dopamine est libérée dans l’anticipation anxieuse du prochain rafraîchissement.',
    likes: 48,
    comments: 12,
    follows: 7,
    isJackpot: true
  }
];

interface SkinnerPullPostProps {
  onSelectAvatar?: (info: AvatarProfileInfo) => void;
}

export const SkinnerPullPost: React.FC<SkinnerPullPostProps> = () => {
  const [pullIndex, setPullIndex] = useState<number>(2);
  const [pullsTotal, setPullsTotal] = useState<number>(1);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);

  const triggerPull = () => {
    setIsSpinning(true);
    setPullsTotal((n) => n + 1);
    setTimeout(() => {
      setPullIndex((prev) => (prev + 1) % CASINO_PULLS.length);
      setIsSpinning(false);
    }, 180);
  };

  const current = CASINO_PULLS[pullIndex];

  return (
    <div
      onClick={triggerPull}
      title="Cliquer sur l’image ou le bouton pour tirer vers le bas"
      className="bg-[#0A0A0A] text-white p-6 min-h-[360px] flex flex-col justify-between border-t border-[#262626] cursor-pointer select-none group"
    >
      <div className="flex items-center justify-between text-xs text-[#A8A8A8]">
        <span className="font-semibold text-white">
          Conditionnement skinnerien (ratio variable)
        </span>
        <span className="tabular-nums">Tirage #{pullsTotal}</span>
      </div>

      {/* Bulle de notifications Instagram cliquable */}
      <div className="my-6 flex flex-col items-center text-center">
        <div
          className={`inline-flex items-center gap-5 px-6 py-3.5 rounded-2xl border-2 mb-5 transition-transform duration-150 group-hover:scale-105 ${
            isSpinning ? 'scale-95' : 'scale-100'
          } ${
            current.isJackpot
              ? 'bg-[#FF3040] border-white text-white'
              : 'bg-[#181818] border-[#363636] text-[#FAFAFA]'
          }`}
        >
          <div className="flex items-center gap-1.5 font-bold text-base tabular-nums">
            <Heart className="w-5 h-5 fill-current" />
            <span>{current.likes}</span>
          </div>
          <div className="flex items-center gap-1.5 font-bold text-base tabular-nums">
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>{current.comments}</span>
          </div>
          <div className="flex items-center gap-1.5 font-bold text-base tabular-nums">
            <UserPlus className="w-5 h-5 fill-current" />
            <span>{current.follows}</span>
          </div>
        </div>

        <div className="text-xs font-semibold text-[#FF3040] mb-1">
          {current.badge} · {current.dopamine}
        </div>
        <h3 className="text-2xl font-bold tracking-tight">
          {current.title}
        </h3>
        <p className="text-xs text-[#A8A8A8] mt-1.5 max-w-xs leading-relaxed">
          {current.sub}
        </p>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          triggerPull();
        }}
        className="w-full py-3 px-4 bg-[#FF3040] hover:bg-[#D9202E] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer"
      >
        <RefreshCw className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
        <span>Tirer vers le bas pour rafraîchir</span>
      </button>
    </div>
  );
};

interface PebblingDmPostProps {
  onSelectAvatar?: (info: AvatarProfileInfo) => void;
}

const DM_REEL_THUMBS = [
  {
    img: IMAGES.dmThumbCat,
    label: '« Regarde cette vidéo »'
  },
  {
    img: IMAGES.dmThumbStreetfood,
    label: '« On y va quand ? »'
  },
  {
    img: IMAGES.dmThumbSkate,
    label: '« Attends la chute »'
  }
];

export const PebblingDmPost: React.FC<PebblingDmPostProps> = ({ onSelectAvatar }) => {
  const [unreadReels, setUnreadReels] = useState<number>(17);

  return (
    <div
      onClick={() => setUnreadReels((n) => n + 1)}
      className="bg-[#0A0A0A] text-white p-6 min-h-[340px] flex flex-col justify-between border-t border-[#262626] cursor-pointer select-none"
    >
      {/* En-tête de conversation DM Instagram avec photo de profil cliquable */}
      <div className="flex items-center justify-between pb-3 border-b border-[#262626]">
        <div className="flex items-center gap-2.5">
          <ProfileAvatar
            variant="leo"
            size="md"
            ringColor="green"
            onSelectAvatar={onSelectAvatar}
          />
          <div>
            <div className="text-sm font-bold">leo.prvt</div>
            <div className="text-[11px] text-[#00BA7C]">En ligne il y a 2 min</div>
          </div>
        </div>
        <div className="px-3 py-1 bg-[#FF3040] text-white text-xs font-bold rounded-full tabular-nums">
          {unreadReels} vidéos non lues
        </div>
      </div>

      {/* Vignettes de vidéos distinctes envoyées en message privé */}
      <div className="my-4 space-y-4">
        <div className="grid grid-cols-3 gap-2.5">
          {DM_REEL_THUMBS.map((item, idx) => (
            <div
              key={idx}
              className="h-36 border border-[#262626] rounded-xl p-2.5 flex flex-col justify-between relative overflow-hidden bg-black"
            >
              <img
                src={item.img}
                alt={item.label}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />
              <div className="relative z-10 flex items-center justify-between text-[10px] text-white font-semibold">
                <span className="px-1.5 py-0.5 bg-black/60 rounded">Vidéo</span>
                <Play className="w-3 h-3 text-white fill-current" />
              </div>
              <div className="relative z-10 text-[11px] font-bold leading-snug text-white bg-black/75 px-1.5 py-1 rounded">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-end">
          <div className="bg-[#1C1C1C] border border-[#363636] rounded-2xl px-4 py-2.5 text-xs max-w-xs leading-relaxed">
            Je t’ai envoyé {unreadReels} vidéos aujourd’hui, tu ne réponds plus ?
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#FF3040] mt-1.5">
            <Eye className="w-3.5 h-3.5" />
            <span>Vu il y a 2h · Dette relationnelle</span>
          </div>
        </div>
      </div>
    </div>
  );
};
