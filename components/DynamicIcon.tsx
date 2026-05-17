'use client';

import type { CSSProperties } from 'react';
import {
  AlertTriangle, ArrowRight, ArrowUpRight, BadgeCheck, Battery, CalendarCheck, Car,
  Check, CheckCircle, ChevronDown, ChevronLeft, ChevronRight, Circle, CircleSlash, Clipboard,
  ClipboardList, Clock, Droplets, File, Flame, Inbox, Layers, MapPin, Menu, Navigation,
  Phone, RefreshCw, ScanLine, Settings, ShieldCheck, Thermometer, UploadCloud,
  Volume2, Wind, Wrench, X, Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const MAP: Record<string, LucideIcon> = {
  'alert-triangle': AlertTriangle,
  'arrow-right': ArrowRight,
  'arrow-up-right': ArrowUpRight,
  'badge-check': BadgeCheck,
  'battery': Battery,
  'calendar-check': CalendarCheck,
  'car': Car,
  'check': Check,
  'check-circle': CheckCircle,
  'chevron-down': ChevronDown,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'circle': Circle,
  'circle-slash': CircleSlash,
  'clipboard': Clipboard,
  'clipboard-list': ClipboardList,
  'clock': Clock,
  'droplets': Droplets,
  'file': File,
  'flame': Flame,
  'inbox': Inbox,
  'layers': Layers,
  'map-pin': MapPin,
  'menu': Menu,
  'navigation': Navigation,
  'phone': Phone,
  'refresh-cw': RefreshCw,
  'scan-line': ScanLine,
  'settings': Settings,
  'shield-check': ShieldCheck,
  'thermometer': Thermometer,
  'upload-cloud': UploadCloud,
  'volume-2': Volume2,
  'wind': Wind,
  'wrench': Wrench,
  'x': X,
  'zap': Zap,
};

export default function DynamicIcon({
  name,
  size = 16,
  style,
  strokeWidth,
}: {
  name: string;
  size?: number;
  style?: CSSProperties;
  strokeWidth?: number;
}) {
  const Cmp = MAP[name];
  if (!Cmp) return null;
  return <Cmp size={size} style={style} strokeWidth={strokeWidth} />;
}
