type ClashFormType = {
  title?: string;
  description?: string;
};

type ClashFormErrorType = {
  title?: string;
  description?: string;
  image?: string;
  expire_at?: string;
};

type ClashType = {
  id: number;
  user_id: number;
  title: string;
  description?: string;
  image?: string;
  created_at: string;
  ClashItem?: Array<ClashItem>;
  ClashComments?: Array<ClashComment>;
  expire_at: string;
};

type ClashItemType = {
  id: number;
  image: string;
  count: number;
};
type ClashCommentType = {
  id: number;
  comment: string;
  created_at: string;
};

type ClashItemForm = {
  image: File | null;
};

type ClashItem = {
  id: number;
  count: number;
  image: string;
};

type ClashComment = {
  id: number;
  comment: string;
  created_at: string;
};
