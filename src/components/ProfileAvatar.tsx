import React from 'react';

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
  | 'creator3';

export interface AvatarProfileInfo {
  src: string;
  name: string;
  handle: string;
  role: string;
}

export const AVATAR_DIRECTORY: Record<AvatarVariant, AvatarProfileInfo> = {
  care: {
    src: '/src/assets/images/avatar_person_1_1794407544411.jpg',
    name: 'Clara Mercier',
    handle: '@culture.du.soin',
    role: 'Chercheuse en design critique & éthique du Care'
  },
  stats: {
    src: '/src/assets/images/avatar_person_2_1794407547308.jpg',
    name: 'Thomas Vance',
    handle: '@observatoire.meta',
    role: 'Analyste données & démographie des plateformes'
  },
  hcd: {
    src: '/src/assets/images/avatar_person_3_1794407548359.jpg',
    name: 'Inès Benali',
    handle: '@atelier.hcd',
    role: 'Product Designer · Human-Centered Design'
  },
  closefriends: {
    src: '/src/assets/images/avatar_person_5_1794407555444.jpg',
    name: 'Camille Laurent',
    handle: '@cercle.intime',
    role: 'Cercle Amis proches (Close Friends)'
  },
  reels: {
    src: '/src/assets/images/avatar_person_4_1794407548888.jpg',
    name: 'Lucas Moreau',
    handle: '@flux.continu',
    role: 'Créateur vidéo & étude du Flow toxique'
  },
  fomo: {
    src: '/src/assets/images/avatar_person_3_1794407548359.jpg',
    name: 'Sarah K.',
    handle: '@veille.fomo',
    role: 'Observatoire des tendances et de la synchronisation sociale'
  },
  creators: {
    src: '/src/assets/images/avatar_person_4_1794407548888.jpg',
    name: 'Maxime D.',
    handle: '@programme.creators',
    role: 'Créateur de contenu sous contrat algorithmique'
  },
  skinner: {
    src: '/src/assets/images/avatar_person_2_1794407547308.jpg',
    name: 'Dr. Marc Halphen',
    handle: '@labo.skinner',
    role: 'Psychologie comportementale & renforcement intermittent'
  },
  blindspots: {
    src: '/src/assets/images/avatar_person_1_1794407544411.jpg',
    name: 'Collectif Sciences & Santé',
    handle: '@etudes.cliniques',
    role: 'Revue des études Semmelweis, Harvard & Facebook Files'
  },
  ethics: {
    src: '/src/assets/images/avatar_person_5_1794407555444.jpg',
    name: 'Éthique du Care',
    handle: '@design.du.soin',
    role: 'Collectif pour un design de la déconnexion'
  },
  leo: {
    src: '/src/assets/images/avatar_person_4_1794407548888.jpg',
    name: 'Léo Prévost',
    handle: '@leo.prvt',
    role: 'Contact DM · Envoi quotidien de Reels (Pebbling)'
  },
  creator1: {
    src: '/src/assets/images/avatar_person_1_1794407544411.jpg',
    name: 'Emma R.',
    handle: '@dopamine.daily',
    role: 'Créatrice Reels'
  },
  creator2: {
    src: '/src/assets/images/avatar_person_5_1794407555444.jpg',
    name: 'Chloé V.',
    handle: '@5am.aesthetic',
    role: 'Lifestyle & Morning Routine'
  },
  creator3: {
    src: '/src/assets/images/avatar_person_2_1794407547308.jpg',
    name: 'Nathan B.',
    handle: '@pov.insomnie',
    role: 'Memes nocturnes'
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
