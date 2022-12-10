export enum AppRoute {
  Main = '/',
  Login = '/login',
  Room = '/offer/:id'
}

export enum APIRoute {
  Offers = '/hotels',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const CITY_LIST = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf'
];

export const MIN_COMMENT_LENGTH = 50;
export const MAX_COMMENT_LENGTH = 300;

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export enum MapMarker {
  Default = '/img/pin.svg',
  Current = '/img/pin-active.svg'
}

export enum Sort {
  Popular = 'Popular',
  PriceASC = 'Price: low to high',
  PriceDESC = 'Price: high to low',
  RateDESC = 'Top rated first'
}

export const PASSWORD_VALIDATION_FAIL_TEXT = 'Password must contain at least one letter and number';
