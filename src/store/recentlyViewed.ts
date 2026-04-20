import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RecentlyViewedState {
  items: string[]; // Array of product IDs (most recent first)
  maxItems: number;
  addItem: (productId: string) => void;
  getItems: () => string[];
  clearItems: () => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set, get) => ({
      items: [],
      maxItems: 8,

      addItem: (productId: string) => {
        set((state) => {
          // Remove if already exists, then add to front
          const filtered = state.items.filter((id) => id !== productId);
          const newItems = [productId, ...filtered].slice(0, state.maxItems);
          return { items: newItems };
        });
      },

      getItems: () => get().items,

      clearItems: () => set({ items: [] }),
    }),
    {
      name: 'framed-nest-recently-viewed',
    }
  )
);
