interface ApiError {
  response: {
    status: number;
    detail: string;
  };
}

export type { ApiError };
