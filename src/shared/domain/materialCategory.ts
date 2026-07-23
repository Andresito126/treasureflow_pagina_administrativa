import type { WasteCategory } from './wasteCategory';

/**
 * Maps a backend material/category name (Spanish, free-form from material_types)
 * to one of the panel's six fixed waste categories. Best-effort keyword match;
 * falls back to 'plastic' for unknown names (e.g. second-hand item categories).
 */
export function mapMaterialToCategory(name: string | null | undefined): WasteCategory {
  const n = (name ?? '').toLowerCase();
  if (n.includes('alumin')) return 'aluminum';
  if (n.includes('aceite') || n.includes('oil')) return 'oil';
  if (n.includes('papel') || n.includes('cartón') || n.includes('carton')) return 'paper';
  if (n.includes('plás') || n.includes('plas') || n.includes('pet')) return 'plastic';
  if (
    n.includes('metal') ||
    n.includes('chatarra') ||
    n.includes('cobre') ||
    n.includes('aluminio')
  ) {
    return 'metal';
  }
  if (n.includes('pila') || n.includes('bater')) return 'battery';
  return 'plastic';
}
