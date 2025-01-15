export type SearchInputType = {
  type: string;
  name: string;
  id: string;
  placeholder: string;
  className: string;
  onChange: (event: any) => void;
  onKeyDown?: (event: any) => void;
  value: string;
};
