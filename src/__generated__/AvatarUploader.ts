/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: AvatarUploader
// ====================================================

export interface AvatarUploader_policy {
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

export interface AvatarUploader {
  __typename: "Me";
  id: number;
  /**
   * Manifest for uploading new files to S3
   */
  policy: AvatarUploader_policy | null;
}
