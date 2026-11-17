export interface UnitResultItem {
  id: string;
  name: string;
  categoryTag: string;
  categoryVariant: 'blue' | 'green' | 'purple';
  address: string;
  tags: {
    label: string;
    variant: 'default' | 'green' | 'blue';
    iconName?: 'medical' | 'check' | 'pill';
  }[];
  distanceText: string;
  transportIcon: 'bus' | 'compass' | 'walk';
  phone: string;
}

export interface ActiveFiltersState {
  careType: string;
  region: string;
  sphere: 'all' | 'sus' | 'private';
}
