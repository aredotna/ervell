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
  INVITE = "INVITE",
  MONTHLY_PREMIUM_REMINDER = "MONTHLY_PREMIUM_REMINDER",
  PREMIUM_PLUS = "PREMIUM_PLUS",
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

export interface ChannelMemberInput {
  id: string;
  type?: MemberTypes | null;
}

export interface ConnectableInput {
  id: string;
  type: BaseConnectableTypeEnum;
}

export interface MeFlagInput {
  name: string;
  value: boolean;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
