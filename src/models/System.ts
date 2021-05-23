export enum SystemType {
  Nin3DS,
  NinDSi
}

export enum SystemRegion {
  EU,
  US,
  JP
}

const SD_DIRECTORIES_DSI: Record<SystemRegion, string> = {
  [SystemRegion.EU]: '4B475556',
  [SystemRegion.US]: '4B475545',
  [SystemRegion.JP]: '4B47554A'
};

const SD_DIRECTORIES_3DS: Record<SystemRegion, string> = {
  [SystemRegion.EU]: 'JKZP',
  [SystemRegion.US]: 'JKZE',
  [SystemRegion.JP]: 'JKZJ'
};

export function getSdCardRoute(system: SystemType, region: SystemRegion) {
  switch (system) {
    case SystemType.NinDSi:
      return `/private/ds/app/${ SD_DIRECTORIES_DSI[region] }/`;
    case SystemType.Nin3DS:
      return `/private/Nintendo 3DS/app/${ SD_DIRECTORIES_3DS[region] }/`;
  }
}