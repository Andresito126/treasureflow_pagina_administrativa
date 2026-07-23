/**
 * Shared domain vocabulary for recyclable waste categories.
 * Used by posts, collections and the dashboard so labels/icons stay consistent.
 */
export type WasteCategory =
  | 'aluminum'
  | 'oil'
  | 'paper'
  | 'plastic'
  | 'metal'
  | 'battery';

export const WASTE_CATEGORIES: WasteCategory[] = [
  'aluminum',
  'oil',
  'paper',
  'plastic',
  'metal',
  'battery',
];

interface CategoryMeta {
  label: string;
  /** Material Symbols icon name. */
  icon: string;
}

const CATEGORY_META: Record<WasteCategory, CategoryMeta> = {
  aluminum: { label: 'Aluminio', icon: 'recycling' },
  oil: { label: 'Aceite', icon: 'water_drop' },
  paper: { label: 'Papel/Cartón', icon: 'description' },
  plastic: { label: 'Plástico', icon: 'water_bottle' },
  metal: { label: 'Metal', icon: 'hardware' },
  battery: { label: 'Pila/Batería', icon: 'battery_horiz_075' },
};

export function categoryLabel(category: WasteCategory): string {
  return CATEGORY_META[category].label;
}

export function categoryIcon(category: WasteCategory): string {
  return CATEGORY_META[category].icon;
}
