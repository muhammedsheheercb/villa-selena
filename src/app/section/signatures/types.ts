export interface SignatureModel {
  name: string;
  displayName: string;
  glbUrl: string;
  price: number;
}

export interface ApiModelRow {
  name: string;
  status: number;
  meta: { restaurantID: string };
  modelPath?: {
    glb?: string;
  };
}

export interface ApiResponse {
  success: boolean;
  data: {
    rows: ApiModelRow[];
  };
}
