import React, { useRef, useCallback } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { MaterialIcons } from '@expo/vector-icons';
import { UBS } from '../../types/ubs';

interface MapContainerProps {
  ubsList: UBS[];
  selectedUBSId: string | null;
  initialRegion: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  userLocation?: { latitude: number; longitude: number } | null;
  onSelectUBS: (ubs: UBS) => void;
  onRecenter?: () => void;
}

/**
 * MapContainer usando react-native-webview + Leaflet + OpenStreetMap.
 *
 * Tiles: CartoCDN Positron (minimalista, igual ao Google Maps claro)
 * Geocoding: Nominatim (via useNominatim hook na SearchBar)
 * Comunicação RN ↔ WebView: postMessage / window.ReactNativeWebView.postMessage
 */
export default function MapContainer({
  ubsList,
  selectedUBSId,
  initialRegion,
  userLocation,
  onSelectUBS,
  onRecenter,
}: MapContainerProps) {
  const webViewRef = useRef<WebView>(null);

  // Serializa os dados das UBS para injetar no HTML
  const ubsJson = JSON.stringify(
    ubsList.map((u) => ({
      id: u.id,
      shortName: u.shortName,
      name: u.name,
      address: u.address,
      distance: u.distance,
      hours: u.hours,
      status: u.status,
      lat: u.coordinates.latitude,
      lng: u.coordinates.longitude,
      isPopTT: u.shortName.includes('CR POP TT') || u.shortName.includes('CRS'),
    }))
  );

  const userLat = userLocation?.latitude ?? initialRegion.latitude;
  const userLng = userLocation?.longitude ?? initialRegion.longitude;
  const centerLat = initialRegion.latitude;
  const centerLng = initialRegion.longitude;

  // HTML completo do mapa Leaflet embarcado na WebView
  const mapHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body, #map { width: 100%; height: 100%; background: #e5e7eb; }

    /* Marcadores UBS */
    .ubs-marker-wrap { display:flex; flex-direction:column; align-items:center; cursor:pointer; }
    .ubs-label-pill {
      background:#fff; padding:3px 8px; border-radius:12px;
      border:1px solid #cbd5e1; box-shadow:0 2px 6px rgba(0,0,0,.15);
      font-size:10px; font-weight:700; color:#0f172a;
      display:flex; align-items:center; gap:4px; white-space:nowrap;
      font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
    }
    .ubs-label-pill.selected { border-color:#2563eb; border-width:2px; color:#2563eb; }
    .ubs-dot { width:7px; height:7px; border-radius:50%; flex-shrink:0; }
    .ubs-pin-circle {
      width:32px; height:32px; border-radius:50%;
      background:#93c5fd; border:2.5px solid #fff;
      box-shadow:0 3px 8px rgba(0,0,0,.2);
      display:flex; align-items:center; justify-content:center;
      margin:3px auto 0; font-size:17px; color:#1d4ed8;
    }
    .ubs-pin-circle.selected { background:#3b82f6; transform:scale(1.15); }
    .ubs-pin-circle.popttt { background:#fde68a; color:#b45309; }

    /* Marcador Usuário */
    .user-wrap { display:flex; flex-direction:column; align-items:center; }
    .user-pulse {
      width:28px; height:28px; border-radius:50%;
      background:rgba(15,23,42,.18); animation:pulse 1.6s infinite ease-out;
      position:absolute; top:-7px;
    }
    .user-core {
      width:14px; height:14px; background:#0f172a;
      border:2.5px solid #fff; border-radius:50%;
      box-shadow:0 2px 6px rgba(0,0,0,.35); position:relative; z-index:2;
    }
    .user-label {
      background:#0f172a; color:#fff; font-size:9px; font-weight:800;
      padding:2px 7px; border-radius:10px; margin-top:4px; white-space:nowrap;
      font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
    }
    @keyframes pulse {
      0%  { transform:scale(.9); opacity:1; }
      100%{ transform:scale(2.4); opacity:0; }
    }
  </style>
</head>
<body>
<div id="map"></div>
<script>
  // — Dados injetados pelo React Native —
  const UBS_LIST   = ${ubsJson};
  const USER_LAT   = ${userLat};
  const USER_LNG   = ${userLng};
  const CENTER_LAT = ${centerLat};
  const CENTER_LNG = ${centerLng};
  let   SELECTED_ID = ${selectedUBSId ? `"${selectedUBSId}"` : 'null'};

  // — Inicializa o mapa —
  const map = L.map('map', {
    center: [CENTER_LAT, CENTER_LNG],
    zoom: 15,
    zoomControl: false,
    attributionControl: false,
  });

  // Tiles limpos e neutros (sem ícones comerciais de mercados, postos ou cemitérios)
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 16,
  }).addTo(map);

  // Nomes de vias e bairros
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 16,
  }).addTo(map);

  // — Marcador do usuário —
  const userIcon = L.divIcon({
    className: '',
    html: \`<div class="user-wrap">
              <div class="user-pulse"></div>
              <div class="user-core"></div>
              <div class="user-label">Você está aqui</div>
           </div>\`,
    iconSize: [80, 46],
    iconAnchor: [40, 14],
  });
  L.marker([USER_LAT, USER_LNG], { icon: userIcon }).addTo(map);

  // — Marcadores das UBS —
  const markers = {};

  function buildUBSIcon(ubs, selected) {
    const dotColor = ubs.isPopTT ? '#b45309' : '#16a34a';
    const icon     = ubs.isPopTT ? '&#9881;' : '+';
    const pillCls  = selected ? 'ubs-label-pill selected' : 'ubs-label-pill';
    const pinCls   = [
      'ubs-pin-circle',
      selected ? 'selected' : '',
      ubs.isPopTT ? 'popttt' : '',
    ].filter(Boolean).join(' ');

    return L.divIcon({
      className: '',
      html: \`<div class="ubs-marker-wrap">
                <div class="\${pillCls}">
                  <span class="ubs-dot" style="background:\${dotColor}"></span>
                  \${ubs.shortName}
                </div>
                <div class="\${pinCls}">\${icon}</div>
              </div>\`,
      iconSize: [120, 58],
      iconAnchor: [60, 54],
    });
  }

  UBS_LIST.forEach(ubs => {
    const marker = L.marker([ubs.lat, ubs.lng], {
      icon: buildUBSIcon(ubs, ubs.id === SELECTED_ID),
    }).addTo(map);

    marker.on('click', () => {
      sendToRN({ type: 'SELECT_UBS', id: ubs.id });
    });

    markers[ubs.id] = { marker, ubs };
  });

  // — Comunicação WebView → React Native —
  function sendToRN(payload) {
    const msg = JSON.stringify(payload);
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(msg);
    }
  }

  // — Receber comandos do React Native → WebView —
  document.addEventListener('message', handleRNMessage);
  window.addEventListener('message', handleRNMessage);

  function handleRNMessage(event) {
    try {
      const cmd = JSON.parse(event.data);

      if (cmd.type === 'SELECT_UBS') {
        selectUBS(cmd.id);
      } else if (cmd.type === 'RECENTER') {
        map.flyTo([USER_LAT, USER_LNG], 15.5, { duration: 0.8 });
      } else if (cmd.type === 'FLY_TO') {
        map.flyTo([cmd.lat, cmd.lng], cmd.zoom || 16, { duration: 0.8 });
      } else if (cmd.type === 'UPDATE_UBS') {
        // Re-renderiza todos os markers com nova lista
        updateMarkers(cmd.ubsList);
      }
    } catch (_) {}
  }

  function selectUBS(id) {
    if (SELECTED_ID === id) return;
    // Atualiza ícone do anterior
    if (SELECTED_ID && markers[SELECTED_ID]) {
      const { marker, ubs } = markers[SELECTED_ID];
      marker.setIcon(buildUBSIcon(ubs, false));
    }
    SELECTED_ID = id;
    if (markers[id]) {
      const { marker, ubs } = markers[id];
      marker.setIcon(buildUBSIcon(ubs, true));
      map.flyTo([ubs.lat, ubs.lng], 16, { duration: 0.6 });
    }
  }

  function updateMarkers(newList) {
    // Remove markers existentes
    Object.values(markers).forEach(({ marker }) => map.removeLayer(marker));
    Object.keys(markers).forEach(k => delete markers[k]);

    // Recria com nova lista
    newList.forEach(ubs => {
      const marker = L.marker([ubs.lat, ubs.lng], {
        icon: buildUBSIcon(ubs, ubs.id === SELECTED_ID),
      }).addTo(map);
      marker.on('click', () => sendToRN({ type: 'SELECT_UBS', id: ubs.id }));
      markers[ubs.id] = { marker, ubs };
    });
  }
</script>
</body>
</html>
  `;

  // Envia mensagem para a WebView
  const sendToWebView = useCallback((payload: object) => {
    webViewRef.current?.injectJavaScript(
      `handleRNMessage({ data: ${JSON.stringify(JSON.stringify(payload))} }); true;`
    );
  }, []);

  // Recentra no usuário
  const handleRecenter = useCallback(() => {
    if (userLocation) {
      sendToWebView({ type: 'RECENTER' });
    }
    onRecenter?.();
  }, [userLocation, onRecenter, sendToWebView]);

  // Recebe eventos da WebView (clique em marker)
  const handleWebViewMessage = useCallback(
    (event: { nativeEvent: { data: string } }) => {
      try {
        const msg = JSON.parse(event.nativeEvent.data);
        if (msg.type === 'SELECT_UBS') {
          const ubs = ubsList.find((u) => u.id === msg.id);
          if (ubs) onSelectUBS(ubs);
        }
      } catch (_) {}
    },
    [ubsList, onSelectUBS]
  );

  // Atualiza markers quando a lista de UBS muda
  React.useEffect(() => {
    const newList = ubsList.map((u) => ({
      id: u.id,
      shortName: u.shortName,
      lat: u.coordinates.latitude,
      lng: u.coordinates.longitude,
      isPopTT: u.shortName.includes('CR POP TT') || u.shortName.includes('CRS'),
    }));
    sendToWebView({ type: 'UPDATE_UBS', ubsList: newList });
  }, [ubsList, sendToWebView]);

  // Seleciona UBS no mapa quando muda o selectedUBSId
  React.useEffect(() => {
    if (selectedUBSId) {
      sendToWebView({ type: 'SELECT_UBS', id: selectedUBSId });
    }
  }, [selectedUBSId, sendToWebView]);

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        style={styles.map}
        source={{ html: mapHTML }}
        onMessage={handleWebViewMessage}
        javaScriptEnabled
        domStorageEnabled
        // Necessário para carregar tiles externos (HTTP/HTTPS)
        mixedContentMode="always"
        // No iOS, permite carregar recursos externos
        originWhitelist={['*']}
        // Melhora performance de scroll no Android
        overScrollMode="never"
        bounces={false}
        scrollEnabled={false}
      />

      {/* Botão flutuante "Minha Localização" */}
      <TouchableOpacity
        style={styles.locationBtn}
        onPress={handleRecenter}
        activeOpacity={0.85}
      >
        <MaterialIcons name="my-location" size={20} color="#1f2937" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#e5e7eb',
  },
  locationBtn: {
    position: 'absolute',
    right: 16,
    top: 130,
    backgroundColor: '#ffffff',
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
});
