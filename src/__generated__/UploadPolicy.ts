/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UploadPolicy
// ====================================================

export interface UploadPolicy_me_policy {
  __typename: "Policy";
  AWSAccessKeyId: string;
  acl: string;
  bucket: string;
  expires: string;
  key: string | null;
  policy: string;
  signature: string;
  success_action_status: string;
}

export interface UploadPolicy_me {
  __typename: "Me";
  id: number;
  /**
   * Manifest for uploading new files to S3
   */
  policy: UploadPolicy_me_policy | null;
}

export interface UploadPolicy {
  /**
   * The current logged in user
   */
  me: UploadPolicy_me | null;
}
