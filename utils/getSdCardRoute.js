const TWL_REGION_FOLDERS = {
  eu: '4B475556',
  us: '4B475545',
  jp: '4B47554A'
};

const CTR_REGION_FOLDERS = {
  eu: 'JKZP',
  us: 'JKZE',
  jp: 'JKZJ'
};

export function getSdCardRoute(system='twl', region='eu') {
  switch (system.toLowerCase()) {
    case 'twl':
    case 'dsi':
      return `/private/ds/app/${ TWL_REGION_FOLDERS[region.toLowerCase()] }/`;
    case '3ds':
    case 'ctr':
      return `/private/Nintendo 3DS/app/${ CTR_REGION_FOLDERS[region.toLowerCase()] }/`;
  }
}