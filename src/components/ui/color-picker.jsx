import React from 'react';
import { Input } from './input';

const PRESET_COLORS = [
  '#000000',
  '#4f46e5',
  '#059669',
  '#e11d48',
  '#d97706',
  '#9333ea',
  '#0891b2',
  '#2563eb',
  '#ffffff',
  '#64748b'
];

export function ColorPicker({ value, onChange, label, className = '' }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && <label className="text-xs font-bold text-muted-foreground uppercase block">{label}</label>}
      <div className="flex items-center gap-3">
        <div className="relative shrink-0">
          <Input
            type="color"
            value={value || '#000000'}
            onChange={(e) => onChange(e.target.value)}
            className="h-9 w-9 p-0 border border-input rounded-lg cursor-pointer bg-transparent opacity-0 absolute inset-0 z-10"
          />
          <div
            className="h-9 w-9 rounded-lg border border-input shadow-xs transition-transform active:scale-95 flex items-center justify-center cursor-pointer"
            style={{ backgroundColor: value || '#000000' }}
          >
            {value?.toLowerCase() === '#ffffff' && (
              <span className="text-[10px] text-zinc-400 font-bold">W</span>
            )}
          </div>
        </div>

        <Input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#000000"
          className="bg-background border border-input text-xs uppercase font-mono tracking-wider w-28"
        />

        <div className="flex flex-wrap items-center gap-1.5 pl-1">
          {PRESET_COLORS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => onChange(preset)}
              className={`h-5 w-5 rounded-full border border-border transition-transform hover:scale-110 active:scale-95 cursor-pointer ${value?.toLowerCase() === preset.toLowerCase() ? 'ring-2 ring-primary ring-offset-1 scale-110' : ''
                }`}
              style={{ backgroundColor: preset }}
              title={preset}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
