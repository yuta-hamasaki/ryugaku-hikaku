// types.ts または util/types.ts

// import type { MicroCMSDate, MicroCMSImage, MicroCMSListContent } from 'microcms-js-sdk';

// ------------------------------------
// 関連情報（マスタデータ）の型定義
// ------------------------------------

// 国
export type Country = {
  name: string;
  slug?: string;
}

// 留学タイプ
export type StudyType = {
  name: string;
  slug?: string;
} 

// ------------------------------------
// エージェントの型定義
// ------------------------------------

export type Agent = {
  name?: string;
  logo?: string;
  description?: string;
  website?: string;
  reviews?: number;
} 

// ------------------------------------
// プランの型定義
// ------------------------------------

export type Plan = {
  planName?: string;
  agent?: Agent; // コンテンツ参照なので、エージェントの型を指定
  country?: Country; // コンテンツ参照なので、国の型を指定
  city?: string;
  type?: StudyType; // コンテンツ参照なので、留学タイプの型を指定
  duration?: string;
  price?: number;
  visaSupport?: boolean;
  details?: string;
} 

// ------------------------------------
// API取得レスポンスの型定義
// ------------------------------------

// 複数件取得時のレスポンス
export type PlanResponse = {
  totalCount: number;
  offset: number;
  limit: number;
  contents: Plan[];
};

export type AgentResponse = {
  totalCount: number;
  offset: number;
  limit: number;
  contents: Agent[];
};

export type CountryResponse = {
  totalCount: number;
  offset: number;
  limit: number;
  contents: Country[];
};

export type StudyTypeResponse = {
  totalCount: number;
  offset: number;
  limit: number;
  contents: StudyType[];
};