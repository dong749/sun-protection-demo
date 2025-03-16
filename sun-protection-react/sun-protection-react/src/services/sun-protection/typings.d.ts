declare namespace API {
  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseListMelanomaSkinCancer_ = {
    code?: number;
    data?: MelanomaSkinCancer[];
    message?: string;
  };

  type BaseResponseListProduct_ = {
    code?: number;
    data?: Product[];
    message?: string;
  };

  type BaseResponseLong_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponsePageProduct_ = {
    code?: number;
    data?: PageProduct_;
    message?: string;
  };

  type BaseResponseProduct_ = {
    code?: number;
    data?: Product;
    message?: string;
  };

  type BaseResponseString_ = {
    code?: number;
    data?: string;
    message?: string;
  };

  type DeleteRequest = {
    id?: number;
  };

  type getProductVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUVIndexByLatAndLonUsingGETParams = {
    /** lat */
    lat?: number;
    /** lon */
    lon?: number;
  };

  type getUVIndexUsingGETParams = {
    /** city */
    city?: string;
    /** district */
    district?: string;
  };

  type MelanomaSkinCancer = {
    count?: number;
    id?: number;
    year?: string;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageProduct_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Product[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type Product = {
    category?: string;
    createTime?: string;
    detail?: string;
    id?: number;
    isDelete?: number;
    name?: string;
    price?: number;
    updateTime?: string;
    userId?: number;
  };

  type ProductAddRequest = {
    category?: string;
    createTime?: string;
    detail?: string;
    isDelete?: number;
    name?: string;
    price?: number;
    updateTime?: string;
  };

  type ProductEditRequest = {
    category?: string;
    createTime?: string;
    detail?: string;
    id?: number;
    isDelete?: number;
    name?: string;
    price?: number;
    updateTime?: string;
  };

  type ProductQueryRequest = {
    category?: string;
    current?: number;
    id?: number;
    name?: string;
    pageSize?: number;
    price?: number;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
  };

  type uploadFileUsingPOSTParams = {
    biz?: string;
  };
}
