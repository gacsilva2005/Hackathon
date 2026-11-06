import { useMemo } from 'react';
import { UBS } from '../types/ubs';

function getDistanceKm(
  lat1: number, lon1: number,
  lat2: number, lon2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function useNearbyUBS(
  ubsList: UBS[],
  userLocation: { latitude: number; longitude: number } | null,
  searchQuery: string,
  activeFilter: string
) {
  return useMemo(() => {
    let filtered = ubsList;

    // Filter by tab
    if (activeFilter !== 'all') {
      filtered = filtered.filter((u) => {
        if (activeFilter === 'saude_sus') return u.tags.some((t) => t.includes('Sampa Trans') || t.includes('Trans'));
        if (activeFilter === 'testagem') return u.tags.some((t) => t.toLowerCase().includes('test'));
        if (activeFilter === 'prep') return u.tags.some((t) => t.includes('PrEP') || t.includes('PEP'));
        if (activeFilter === 'acolhimento') return u.tags.some((t) => t.toLowerCase().includes('acolh'));
        return true;
      });
    }

    // Filter by search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.address.toLowerCase().includes(q) ||
          u.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sort by distance if location available
    if (userLocation) {
      filtered = [...filtered].sort((a, b) => {
        const da = getDistanceKm(
          userLocation.latitude, userLocation.longitude,
          a.coordinates.latitude, a.coordinates.longitude
        );
        const db = getDistanceKm(
          userLocation.latitude, userLocation.longitude,
          b.coordinates.latitude, b.coordinates.longitude
        );
        return da - db;
      });
    }

    return filtered;
  }, [ubsList, userLocation, searchQuery, activeFilter]);
}
