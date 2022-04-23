import { Dimensions } from 'react-native';

// --------------- COLORS -------------- //
export const DARK_ORANGE = '#C53124';
export const MEDIUM_ORANGE = '#E27A2D';
export const LIGHT_ORANGE = '#F8B133';
export const BLACK = '#030303';
export const GRAY = '#434343';
export const LIGHT_GRAY = '#9E9E9E';
export const WHITE = "#ffffff";
export const DARK_WHITE = "#CDCDCD";
export const ERROR = "#E22D2D"

// --------------- FONT -------------- //
export const MAIN_FONT = "BebasNeue-Regular";
//export const MAIN_FONT = "Bebas Neue Regular";

// --------------- SIZES -------------- //
export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;

export const MAIN_CONTAINERS_WIDTH = "87%";
export const HERO_HEIGHT = '20%';
export const SEARCH_VIEW_CONTAINERS_WIDTH = MAIN_CONTAINERS_WIDTH;
export const INPUT_HEIGHT = WIDTH > 370 ? HEIGHT/14 : HEIGHT/15;
export const SEARCH_CONTAINER_RADIUS = 7;

export const PROFILE_PICTURE_SIZE = WIDTH > 370 ? 100 : 80
export const MORE_ICON_WIDTH = WIDTH > 370 ? 33 : 25
export const MORE_ICON_HEIGHT = WIDTH > 370 ? 26.6 : 20

export const SEARCH_INPUT = {
    color: WHITE,
    fontFamily: MAIN_FONT,
    fontSize: WIDTH > 370 ? 20 : 15,
    paddingHorizontal: 15,
    borderTopRightRadius: SEARCH_CONTAINER_RADIUS,
    borderBottomRightRadius: SEARCH_CONTAINER_RADIUS,
    borderColor: MEDIUM_ORANGE,
    borderWidth: 2,
    backgroundColor: BLACK,
    justifyContent: 'center',
    flex: 1
};

export const BASIC_TEXT = {
    color: WHITE,
    fontFamily: MAIN_FONT,
    fontSize: WIDTH > 370 ? 20 : 15
}

export const ERROR_TEXT = {
    fontFamily: MAIN_FONT,
    fontSize: WIDTH > 370 ? 16 : 13,
    color: ERROR,
}




