/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum BannerEnum {
  BOOKMARKLET = "BOOKMARKLET",
  CONFIRM = "CONFIRM",
  CREATE_CHANNEL = "CREATE_CHANNEL",
  CREATE_CONNECTIONS = "CREATE_CONNECTIONS",
  FOLLOW_ANYTHING = "FOLLOW_ANYTHING",
  INVITE = "INVITE",
  MONTHLY_PREMIUM_REMINDER = "MONTHLY_PREMIUM_REMINDER",
  PREMIUM_PLUS = "PREMIUM_PLUS",
  PREVIOUSLY_PREMIUM = "PREVIOUSLY_PREMIUM",
  PROPOSE_PREMIUM = "PROPOSE_PREMIUM",
  STRONGLY_PROPOSE_PREMIUM = "STRONGLY_PROPOSE_PREMIUM",
}

/**
 * Possible connectables for a new connection
 */
export enum BaseConnectableTypeEnum {
  BLOCK = "BLOCK",
  CHANNEL = "CHANNEL",
}

/**
 * Block types
 */
export enum BlockFilterEnum {
  ALL = "ALL",
  ATTACHMENT = "ATTACHMENT",
  EMBED = "EMBED",
  IMAGE = "IMAGE",
  LINK = "LINK",
  TEXT = "TEXT",
}

export enum ChannelOwnerTypeEnum {
  GROUP = "GROUP",
  USER = "USER",
}

/**
 * Privacy states for a channel
 */
export enum ChannelVisibility {
  CLOSED = "CLOSED",
  PRIVATE = "PRIVATE",
  PUBLIC = "PUBLIC",
}

/**
 * Ways to sort channels
 */
export enum ChannelsSort {
  ADDED_TO_AT = "ADDED_TO_AT",
  CREATED_AT = "CREATED_AT",
  TITLE = "TITLE",
  UPDATED_AT = "UPDATED_AT",
}

/**
 * State of the logged in account
 */
export enum ConfirmedStatus {
  ALREADY_CONFIRMED = "ALREADY_CONFIRMED",
  CONFIRMED = "CONFIRMED",
  ERROR = "ERROR",
}

/**
 * Connectable types
 */
export enum ConnectableTypeEnum {
  ATTACHMENT = "ATTACHMENT",
  BLOCK = "BLOCK",
  CHANNEL = "CHANNEL",
  EMBED = "EMBED",
  IMAGE = "IMAGE",
  LINK = "LINK",
  TEXT = "TEXT",
}

/**
 * Available content flag states for channels
 */
export enum ContentFlag {
  NSFW = "NSFW",
  SAFE = "SAFE",
}

export enum ExportFormats {
  HTML = "HTML",
  PDF = "PDF",
  ZIP = "ZIP",
}

/**
 * defines search file types/extensions
 */
export enum ExtensionsEnum {
  AAC = "AAC",
  AI = "AI",
  AIFF = "AIFF",
  AVI = "AVI",
  BMP = "BMP",
  CSV = "CSV",
  DOC = "DOC",
  DOCX = "DOCX",
  EPS = "EPS",
  EPUB = "EPUB",
  FLA = "FLA",
  GIF = "GIF",
  H264 = "H264",
  IND = "IND",
  INDD = "INDD",
  JPEG = "JPEG",
  JPG = "JPG",
  KEY = "KEY",
  KML = "KML",
  KMZ = "KMZ",
  LATEX = "LATEX",
  M4A = "M4A",
  MA = "MA",
  MB = "MB",
  MID = "MID",
  MIDI = "MIDI",
  MOV = "MOV",
  MP3 = "MP3",
  MP4 = "MP4",
  MP4V = "MP4V",
  MPEG = "MPEG",
  MPG = "MPG",
  MPG4 = "MPG4",
  NUMBERS = "NUMBERS",
  OGA = "OGA",
  OGG = "OGG",
  OGV = "OGV",
  OTF = "OTF",
  PAGES = "PAGES",
  PDF = "PDF",
  PGP = "PGP",
  PNG = "PNG",
  PPT = "PPT",
  PPTX = "PPTX",
  PSD = "PSD",
  SVG = "SVG",
  SWA = "SWA",
  SWF = "SWF",
  TEX = "TEX",
  TEXI = "TEXI",
  TEXINFO = "TEXINFO",
  TFM = "TFM",
  TIF = "TIF",
  TIFF = "TIFF",
  TORRENT = "TORRENT",
  TTC = "TTC",
  TTF = "TTF",
  TXT = "TXT",
  WAV = "WAV",
  WEBM = "WEBM",
  WEBP = "WEBP",
  WMA = "WMA",
  XLS = "XLS",
  XLSX = "XLSX",
  XLT = "XLT",
}

/**
 * defines search fields
 */
export enum FieldsEnum {
  ALL = "ALL",
  CONTENT = "CONTENT",
  DESCRIPTION = "DESCRIPTION",
  DOMAIN = "DOMAIN",
  NAME = "NAME",
  URL = "URL",
}

/**
 * Reason for flagging a content
 */
export enum FlagCategoryEnum {
  NSFW = "NSFW",
  OFFENSIVE = "OFFENSIVE",
  SPAM = "SPAM",
}

/**
 * Types of followable objects
 */
export enum FollowableTypeEnum {
  CHANNEL = "CHANNEL",
  GROUP = "GROUP",
  USER = "USER",
}

/**
 * Ways to filter following
 */
export enum FollowingTypeEnum {
  ALL = "ALL",
  CHANNEL = "CHANNEL",
  GROUP = "GROUP",
  USER = "USER",
}

export enum IndexedChannelsTypes {
  COLLABORATION = "COLLABORATION",
  OWN = "OWN",
}

/**
 * Member types
 */
export enum MemberTypes {
  GROUP = "GROUP",
  USER = "USER",
}

export enum Movements {
  INSERT_AT = "INSERT_AT",
  MOVE_DOWN = "MOVE_DOWN",
  MOVE_TO_BOTTOM = "MOVE_TO_BOTTOM",
  MOVE_TO_TOP = "MOVE_TO_TOP",
  MOVE_UP = "MOVE_UP",
}

/**
 * Objects that can be muted
 */
export enum MutableTypeEnum {
  BLOCK = "BLOCK",
  CHANNEL = "CHANNEL",
  USER = "USER",
}

/**
 * Newsletters that can be subscribed to
 */
export enum NewsletterListEnum {
  EDITORIAL = "EDITORIAL",
  GENERAL = "GENERAL",
}

/**
 * defines logical operation
 */
export enum OperationEnum {
  AND = "AND",
  OR = "OR",
}

/**
 * Ways to sort blocks
 */
export enum SearchSorts {
  ALPHA = "ALPHA",
  CREATED_AT = "CREATED_AT",
  DEFAULT = "DEFAULT",
  FOLLOWER_COUNT = "FOLLOWER_COUNT",
  LENGTH = "LENGTH",
  RANDOM = "RANDOM",
  UPDATED_AT = "UPDATED_AT",
}

/**
 * Ways to filter search by type
 */
export enum SearchType {
  ALL = "ALL",
  CHANNEL = "CHANNEL",
  CONNECTABLE = "CONNECTABLE",
  USER = "USER",
}

export enum SearchesCollaboratorsType {
  GROUP = "GROUP",
  USER = "USER",
}

/**
 * Directions to sort blocks
 */
export enum SortDirection {
  ASC = "ASC",
  DESC = "DESC",
}

/**
 * Ways to sort Advanced Search results
 */
export enum SortOrderEnum {
  CONNECTIONS_COUNT = "CONNECTIONS_COUNT",
  CREATED_AT = "CREATED_AT",
  NAME = "NAME",
  RANDOM = "RANDOM",
  SCORE = "SCORE",
  UPDATED_AT = "UPDATED_AT",
}

/**
 * Ways to sort blocks
 */
export enum Sorts {
  CREATED_AT = "CREATED_AT",
  POSITION = "POSITION",
  UPDATED_AT = "UPDATED_AT",
}

/**
 * Ways to filter search by type
 */
export enum SsearchType {
  BLOCK = "BLOCK",
  CHANNEL = "CHANNEL",
  GROUP = "GROUP",
  USER = "USER",
}

/**
 * Subscription plans that are purchaseable by users
 */
export enum SupportedPlanEnum {
  MONTHLY = "MONTHLY",
  PLUS_YEARLY = "PLUS_YEARLY",
  YEARLY = "YEARLY",
}

/**
 * defines for what searched
 */
export enum WhatEnum {
  ALL = "ALL",
  ATTACHMENT = "ATTACHMENT",
  BLOCK = "BLOCK",
  CHANNEL = "CHANNEL",
  GROUP = "GROUP",
  IMAGE = "IMAGE",
  LINK = "LINK",
  MEDIA = "MEDIA",
  TEXT = "TEXT",
  USER = "USER",
}

/**
 * defines search space
 */
export enum WhereEnum {
  ALL = "ALL",
  CHANNEL = "CHANNEL",
  FOLLOWING = "FOLLOWING",
  GROUP = "GROUP",
  MY = "MY",
  USER = "USER",
}

export interface ChannelMemberInput {
  id: string;
  type?: MemberTypes | null;
}

export interface ConnectableInput {
  id: string;
  type: BaseConnectableTypeEnum;
}

export interface Fields {
  facets?: FieldsEnum[] | null;
  op?: OperationEnum | null;
}

export interface MeFlagInput {
  name: string;
  value: boolean;
}

export interface Order {
  facet?: SortOrderEnum | null;
  dir?: SortDirection | null;
}

export interface Term {
  facet?: string | null;
  op?: OperationEnum | null;
}

export interface What {
  facets?: WhatEnum[] | null;
  op?: OperationEnum | null;
}

export interface Where {
  facet?: WhereEnum | null;
  id?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
