import { SearchInputType } from "../../types/searchInput.type";

export const CustomSearchInput = (inputProps: SearchInputType) => {
  return (
    <input
      data-testid={inputProps["data-testid"]}
      type={inputProps.type}
      name={inputProps.name}
      id={inputProps.id}
      placeholder={inputProps.placeholder}
      className={inputProps.className}
      onChange={inputProps.onChange}
      value={inputProps.value}
    />
  );
};
