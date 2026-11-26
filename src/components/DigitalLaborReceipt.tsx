import React from 'react';
import { Clock, Pause, Play, RotateCcw } from 'lucide-react';

export const HUMAN_HOURS_PER_SECOND = 15432;
export const META_REVENUE_PER_SECOND = 2061;

export function formatDuration(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = Math.floor(totalSeconds % 60);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

interface LiveTickerProps {
  elapsedSeconds: number;
  isRunning: boolean;
  isDarkSection: boolean;
  onToggleRun: () => void;
  onReset: () => void;
}

export const StolenTimeWidget: React.FC<LiveTickerProps> = ({
  elapsedSeconds,
  isRunning,
  isDarkSection,
  onToggleRun,
  onReset
}) => {
  const worldHours = Math.floor(elapsedSeconds * HUMAN_HOURS_PER_SECOND);
  const metaRevenue = Math.floor(elapsedSeconds * META_REVENUE_PER_SECOND);

  return (
    <div
      className={`border transition-colors duration-300 ${
        isDarkSection
          ? 'bg-[#121212] border-[#262626] text-[#F5F5F5]'
          : 'bg-[#FAFAFA] border-[#DBDBDB] text-[#262626]'
      } rounded-2xl p-3.5 w-full`}
    >
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-current/10">
        <div className="flex items-center gap-1.5 text-xs font-bold tabular-nums">
          <Clock className={`w-3.5 h-3.5 ${isDarkSection ? 'text-[#FF3040]' : 'text-[#0095F6]'}`} />
          <span>Temps volé ({formatDuration(elapsedSeconds)})</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onToggleRun}
            title={isRunning ? 'Pause' : 'Lecture'}
            className="p-1 border border-current/15 hover:bg-current/10 rounded-md cursor-pointer"
          >
            {isRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </button>
          <button
            type="button"
            onClick={onReset}
            title="Réinitialiser"
            className="p-1 border border-current/15 hover:bg-current/10 rounded-md cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="space-y-1.5 text-xs tabular-nums">
        <div className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-current/5">
          <span className="text-[11px] opacity-75">Vie humaine</span>
          <span className={`font-bold ${isDarkSection ? 'text-[#FF3040]' : ''}`}>
            {(worldHours / 1000000).toFixed(2)} M h
          </span>
        </div>
        <div className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-current/5">
          <span className="text-[11px] opacity-75">Revenus Meta</span>
          <span className="font-bold text-[#00BA7C]">
            {(metaRevenue / 1000).toFixed(0)} k $
          </span>
        </div>
      </div>
    </div>
  );
};

interface DigitalLaborReceiptProps {
  elapsedSeconds: number;
}

export const DigitalLaborReceipt: React.FC<DigitalLaborReceiptProps> = ({ elapsedSeconds }) => {
  const effectiveSeconds = Math.max(elapsedSeconds, 1);
  const worldHours = Math.floor(effectiveSeconds * HUMAN_HOURS_PER_SECOND);
  const worldYears = (worldHours / (24 * 365)).toFixed(1);
  const metaRevenue = Math.floor(effectiveSeconds * META_REVENUE_PER_SECOND);

  return (
    <div className="bg-[#0A0A0A] p-6 border-t border-[#262626] flex flex-col items-center">
      {/* Ticket thermique : Travail gratuit (Digital Labor - Antonio Casilli) */}
      <div className="receipt-print-anim w-full max-w-sm bg-[#F7F4EE] text-[#1C1917] border border-[#1C1917] p-5 font-mono text-xs">
        <div className="text-center border-b border-[#1C1917]/30 pb-3">
          <div className="text-sm font-bold">Travail gratuit (A. Casilli)</div>
          <div className="text-[11px] mt-0.5">Quand se divertir revient à travailler pour Meta</div>
        </div>

        {/* Section 1 : Tâches effectuées gratuitement par l'utilisateur */}
        <div className="py-3 border-b border-[#1C1917]/30 space-y-1.5 text-[11px]">
          <div className="flex justify-between gap-2">
            <span>Photos et stories :</span>
            <span className="font-bold text-[#9A3412] text-right">Création gratuite de contenu</span>
          </div>
          <div className="flex justify-between gap-2">
            <span>Mentions j’aime :</span>
            <span className="font-bold text-[#9A3412] text-right">Qualification de l’algorithme</span>
          </div>
          <div className="flex justify-between gap-2">
            <span>Temps de visionnage :</span>
            <span className="font-bold text-[#9A3412] text-right">Entraînement publicitaire</span>
          </div>
        </div>

        {/* Section 2 : Extraction économique en direct */}
        <div className="py-3 border-b border-[#1C1917]/30 space-y-1.5">
          <div className="flex justify-between">
            <span>Temps d’exposition</span>
            <span className="font-bold">{formatDuration(effectiveSeconds)}</span>
          </div>
          <div className="flex justify-between">
            <span>Heures passées (monde)</span>
            <span className="font-bold text-[#9A3412]">{worldHours.toLocaleString('fr-FR')} h ({worldYears} ans)</span>
          </div>
          <div className="flex justify-between">
            <span>Revenus publicitaires générés</span>
            <span className="font-bold">{metaRevenue.toLocaleString('fr-FR')} $</span>
          </div>
        </div>

        <div className="pt-3 space-y-1">
          <div className="flex justify-between text-xs font-bold">
            <span>Salaire versé à l’utilisateur :</span>
            <span>0,00 €</span>
          </div>
          <div className="flex justify-between text-xs font-bold text-[#9A3412]">
            <span>Coût réel prélevé :</span>
            <span>100 % du temps disponible</span>
          </div>
        </div>
      </div>
    </div>
  );
};
