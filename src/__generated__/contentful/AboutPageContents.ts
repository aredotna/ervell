/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AboutPageContents
// ====================================================

export interface AboutPageContents_aboutPage_businessModelAndPosition_businessModelContent {
  __typename: "BusinessModelAndPositionBusinessModelContent";
  json: any;
}

export interface AboutPageContents_aboutPage_businessModelAndPosition {
  __typename: "BusinessModelAndPosition";
  businessModelContent: AboutPageContents_aboutPage_businessModelAndPosition_businessModelContent | null;
}

export interface AboutPageContents_aboutPage_team_teamDescription {
  __typename: "TeamTeamDescription";
  json: any;
}

export interface AboutPageContents_aboutPage_team {
  __typename: "Team";
  teamDescription: AboutPageContents_aboutPage_team_teamDescription | null;
}

export interface AboutPageContents_aboutPage {
  __typename: "AboutPage";
  businessModelAndPosition: AboutPageContents_aboutPage_businessModelAndPosition | null;
  team: AboutPageContents_aboutPage_team | null;
}

export interface AboutPageContents {
  aboutPage: AboutPageContents_aboutPage | null;
}
