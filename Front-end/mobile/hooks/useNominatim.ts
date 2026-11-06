import { useState, useEffect, useRef } from 'react';

export interface NominatimResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  type: string;
  importance: number;
}

/**
 * Hook para geocoding via Nominatim (OpenStreetMap).
 *
 * Respeita o ToS do Nominatim:
 * - Debounce de 600ms para evitar requests em excesso
 * - Máximo 1 request/segundo
 * - User-Agent identificando o app
 *
 * @param query  Texto digitado na SearchBar
 * @param countrycodes  Código(s) de país para restringir resultados (ex: 'br')
 */
export function useNominatim(query: string, countrycodes = 'br') {
  const [results, setResults] = useState<NominatimResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Referência para o timeout do debounce
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // AbortController para cancelar requests em andamento
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    // Limpa quando a query é muito curta
    if (!query || query.trim().length < 3) {
      setResults([]);
      setError(null);
      return;
    }

    // Debounce: aguarda 600ms após o usuário parar de digitar
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(async () => {
      // Cancela request anterior se ainda estiver em andamento
      if (abortRef.current) {
        abortRef.current.abort();
      }
      abortRef.current = new AbortController();

      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          q: query.trim(),
          format: 'json',
          limit: '5',
          countrycodes,
          addressdetails: '1',
        });

        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?${params.toString()}`,
          {
            headers: {
              // Obrigatório pelo ToS do Nominatim
              'User-Agent': 'UBSFinder/1.0 (hackathon; contact@ubsfinder.app)',
              'Accept-Language': 'pt-BR,pt;q=0.9',
            },
            signal: abortRef.current.signal,
          }
        );

        if (!response.ok) {
          throw new Error(`Nominatim error: ${response.status}`);
        }

        const data: NominatimResult[] = await response.json();
        setResults(data);
      } catch (err: any) {
        // Ignora erros de cancelamento (AbortError)
        if (err.name !== 'AbortError') {
          setError('Não foi possível buscar o endereço.');
          setResults([]);
        }
      } finally {
        setLoading(false);
      }
    }, 600);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [query, countrycodes]);

  return { results, loading, error };
}

/**
 * Função utilitária: geocoding pontual (uma vez, sem hook).
 * Útil para buscar coordenadas de um endereço específico.
 */
export async function geocodeAddress(address: string): Promise<NominatimResult | null> {
  try {
    const params = new URLSearchParams({
      q: address,
      format: 'json',
      limit: '1',
      countrycodes: 'br',
    });

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?${params.toString()}`,
      {
        headers: {
          'User-Agent': 'UBSFinder/1.0 (hackathon; contact@ubsfinder.app)',
          'Accept-Language': 'pt-BR,pt;q=0.9',
        },
      }
    );

    if (!response.ok) return null;
    const data: NominatimResult[] = await response.json();
    return data[0] ?? null;
  } catch {
    return null;
  }
}
