/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RoadmapContents
// ====================================================

export interface RoadmapContents_roadmap_sys {
  __typename: "Sys";
  publishedAt: any | null;
}

export interface RoadmapContents_roadmap_businessRevenue {
  __typename: "RoadmapBusinessRevenue";
  json: any;
}

export interface RoadmapContents_roadmap_businessEthics {
  __typename: "RoadmapBusinessEthics";
  json: any;
}

export interface RoadmapContents_roadmap_businessCommunity {
  __typename: "RoadmapBusinessCommunity";
  json: any;
}

export interface RoadmapContents_roadmap_businessTeam {
  __typename: "RoadmapBusinessTeam";
  json: any;
}

export interface RoadmapContents_roadmap_productInProgress {
  __typename: "RoadmapProductInProgress";
  json: any;
}

export interface RoadmapContents_roadmap_productUpNext {
  __typename: "RoadmapProductUpNext";
  json: any;
}

export interface RoadmapContents_roadmap_productOnTheHorizon {
  __typename: "RoadmapProductOnTheHorizon";
  json: any;
}

export interface RoadmapContents_roadmap_productCompleted {
  __typename: "RoadmapProductCompleted";
  json: any;
}

export interface RoadmapContents_roadmap {
  __typename: "Roadmap";
  sys: RoadmapContents_roadmap_sys;
  rawMrr: string | null;
  rawGoalMrr: string | null;
  goalDate: any | null;
  statsRawMaMs: string | null;
  statsRawCustomers: string | null;
  statsRawConnections: string | null;
  statsPremiumRevenue: string | null;
  statsPatronRevenue: string | null;
  businessRevenue: RoadmapContents_roadmap_businessRevenue | null;
  businessEthics: RoadmapContents_roadmap_businessEthics | null;
  businessCommunity: RoadmapContents_roadmap_businessCommunity | null;
  businessTeam: RoadmapContents_roadmap_businessTeam | null;
  productInProgress: RoadmapContents_roadmap_productInProgress | null;
  productUpNext: RoadmapContents_roadmap_productUpNext | null;
  productOnTheHorizon: RoadmapContents_roadmap_productOnTheHorizon | null;
  productCompleted: RoadmapContents_roadmap_productCompleted | null;
}

export interface RoadmapContents {
  roadmap: RoadmapContents_roadmap | null;
}
