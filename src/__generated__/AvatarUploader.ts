/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: AvatarUploader
// ====================================================

export interface AvatarUploader_policy {
  __typename: "Policy";
  AWSAccessKeyId: string | null;
  acl: string | null;
  bucket: string | null;
  expires: string | null;
  key: string | null;
  policy: string | null;
  signature: string | null;
  success_action_status: string | null;
}

export interface AvatarUploader {
  __typename: "Me";
  id: number | null;
  /**
   * Manifest for uploading new files to S3
   */
  policy: AvatarUploader_policy | null;
}
