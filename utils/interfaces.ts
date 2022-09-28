export interface Detail {
  resource?: number;
  list?: [Video];
}
export interface Video {
  vod_name?: string;
}

export interface IVideoItemFiltered {
  rate: string | number;
  vod_class: string;
  vod_douban_score: string;
  vod_id: number;
  vod_name: string;
  vod_pic: string;
  vod_remarks: string;
}
export interface IVideosResponse {
  code: number;
  limit: string;
  msg: string;
  page: string;
  pagecount: number;
  total: number;
  list: [IVideoItemFiltered];
}
