const COLORS = {
  balck: '#252525',
  subText: '#999',
  primary1: '#5C64AE',
  primary2: '#393F71',
  gray: '#83829A',
  gray2: '#C1C0C8',
  primaryLight: '#BBBEDD',
  primaryLightBkg:"#EEEFF7",

  white: '#F3F4F8',
  lightWhite: '#FAFAFC',
  darkModalBkg: '#25252533',
  lightModalBkg: '#ffffffcc',
};

const FONTS = {
  AcronymRegular: 'acronymregular',
  AcronymLight: 'acronymlight',
  AcronymMedium: 'acronymsemibold',
  Caveat: 'Caveat-VariableFont_wght',
};

const SAFE_AREA = 16;

const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
  bottom: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.0,
    elevation: 1,
  },
};

export {COLORS, FONTS, SHADOWS, SAFE_AREA};
