/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BaseConnectableTypeEnum, FlagCategoryEnum } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: flagContentMutation
// ====================================================

export interface flagContentMutation_flag_content {
  __typename: "FlagContentMutationPayload";
  status: string;
}

export interface flagContentMutation {
  flag_content: flagContentMutation_flag_content | null;
}

export interface flagContentMutationVariables {
  id: string;
  type: BaseConnectableTypeEnum;
  category: FlagCategoryEnum;
}
