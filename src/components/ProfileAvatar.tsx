import React from 'react';
import { IMAGES } from '../assets/images';

export type AvatarVariant =
  | 'care'
  | 'stats'
  | 'hcd'
  | 'closefriends'
  | 'reels'
  | 'fomo'
  | 'creators'
  | 'skinner'
  | 'blindspots'
  | 'ethics'
  | 'leo'
  | 'creator1'
  | 'creator2'
  | 'creator3'
  | 'greek'
  | 'chinese';

export interface AvatarProfileInfo {
  src: string;
  name: string;
  handle: string;
  role: string;
}

export const AVATAR_DIRECTORY: Record<AvatarVariant, AvatarProfileInfo> = {
  care: {
    src: IMAGES.avatarPerson1,
    name: 'Clara Mercier',
    handle: '@culture.du.soin',
    role: 'Chercheuse en design critique & éthique du Care'
  },
  stats: {
    src: IMAGES.avatarPerson2,
    name: 'Thomas Vance',
    handle: '@observatoire.meta',
    role: 'Analyste données & démographie des plateformes'
  },
  hcd: {
    src: IMAGES.avatarPerson3,
    name: 'Inès Benali',
    handle: '@atelier.hcd',
    role: 'Product Designer · Human-Centered Design'
  },
  closefriends: {
    src: IMAGES.avatarPerson5,
    name: 'Camille Laurent',
    handle: '@cercle.intime',
    role: 'Cercle Amis proches (Close Friends)'
  },
  reels: {
    src: IMAGES.avatarPerson4,
    name: 'Lucas Moreau',
    handle: '@flux.continu',
    role: 'Créateur vidéo & étude du Flow toxique'
  },
  fomo: {
    src: IMAGES.avatarPerson3,
    name: 'Sarah K.',
    handle: '@veille.fomo',
    role: 'Observatoire des tendances et de la synchronisation sociale'
  },
  creators: {
    src: IMAGES.avatarPerson4,
    name: 'Maxime D.',
    handle: '@programme.creators',
    role: 'Créateur de contenu sous contrat algorithmique'
  },
  skinner: {
    src: IMAGES.avatarPerson2,
    name: 'Dr. Marc Halphen',
    handle: '@labo.skinner',
    role: 'Psychologie comportementale & renforcement intermittent'
  },
  blindspots: {
    src: IMAGES.avatarPerson1,
    name: 'Collectif Sciences & Santé',
    handle: '@etudes.cliniques',
    role: 'Revue des études Semmelweis, Harvard & Facebook Files'
  },
  ethics: {
    src: IMAGES.avatarPerson5,
    name: 'Éthique du Care',
    handle: '@design.du.soin',
    role: 'Collectif pour un design de la déconnexion'
  },
  leo: {
    src: IMAGES.avatarPerson4,
    name: 'Léo Prévost',
    handle: '@leo.prvt',
    role: 'Contact DM · Envoi quotidien de Reels (Pebbling)'
  },
  creator1: {
    src: IMAGES.avatarPerson1,
    name: 'Emma R.',
    handle: '@dopamine.daily',
    role: 'Créatrice Reels'
  },
  creator2: {
    src: IMAGES.avatarPerson5,
    name: 'Chloé V.',
    handle: '@5am.aesthetic',
    role: 'Lifestyle & Morning Routine'
  },
  creator3: {
    src: IMAGES.avatarPerson2,
    name: 'Nathan B.',
    handle: '@pov.insomnie',
    role: 'Memes nocturnes'
  },
  greek: {
    src: IMAGES.avatarPerson3,
    name: 'Hélène D.',
    handle: '@pensee.grecque',
    role: 'Philosophie antique · Technè, Praxis & Pharmakon'
  },
  chinese: {
    src: IMAGES.avatarPerson1,
    name: 'Lin W.',
    handle: '@voie.du.tao',
    role: 'Pensée chinoise · Wu wei, Qi & Vide fertile'
  }
};

interface ProfileAvatarProps {
  variant: AvatarVariant;
  size?: 'sm' | 'md' | 'lg';
  ringColor?: 'none' | 'green' | 'red' | 'blue';
  onSelectAvatar?: (info: AvatarProfileInfo) => void;
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  variant,
  size = 'md',
  ringColor = 'none',
  onSelectAvatar
}) => {
  const info = AVATAR_DIRECTORY[variant] || AVATAR_DIRECTORY.care;

  const sizeClasses =
    size === 'sm' ? 'w-7 h-7' : size === 'lg' ? 'w-11 h-11' : 'w-9 h-9';

  const ringClasses =
    ringColor === 'green'
      ? 'border-2 border-[#00BA7C] p-0.5'
      : ringColor === 'red'
      ? 'border-2 border-[#FF3040] p-0.5'
      : ringColor === 'blue'
      ? 'border-2 border-[#0095F6] p-0.5'
      : 'border border-[#DBDBDB]';

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        if (onSelectAvatar) onSelectAvatar(info);
      }}
      title={`Agrandir la photo de ${info.name}`}
      className={`${sizeClasses} ${ringClasses} rounded-full overflow-hidden shrink-0 flex items-center justify-center bg-[#EFEFEF] cursor-pointer hover:scale-105 transition-transform focus:outline-none`}
    >
      <img
        src={info.src}
        alt={info.name}
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover rounded-full"
      />
    </button>
  );
};
