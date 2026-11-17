export type UBSStatus = 'open' | 'requires_referral' | 'closed';

export interface UBSCoordinates {
  latitude: number;
  longitude: number;
}

export interface UBS {
  id: string;
  name: string;
  shortName: string;
  address: string;
  distance: string;
  hours: string;
  weekdays?: string;
  status: UBSStatus;
  statusLabel: string;
  tags: string[];
  phone?: string;
  careLineWarning?: string;
  hasFlow?: boolean;
  region?: string;
  coordinates: UBSCoordinates;
}

export type FilterTab = {
  id: string;
  label: string;
};
