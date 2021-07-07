/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Uploader
// ====================================================

export interface Uploader_policy {
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

export interface Uploader {
  __typename: "Me";
  id: number;
  /**
   * Manifest for uploading new files to S3
   */
  policy: Uploader_policy | null;
}
