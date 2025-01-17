export const PaginationContainer = ({
  items = [],
  setSelectedPagination = () => {},
}: {
  items: Array<number>;
  setSelectedPagination: (x: number) => void;
}) => {
  const renderPaginationItems = () => {
    return items?.map((item: number, index: number) => (
      <li
        onClick={() => setSelectedPagination(item)}
        key={index}
        className="p-1 bg-white text-xs rounded-md text-center w-10 cursor-pointer"
      >
        {item}
      </li>
    ));
  };

  return (
    <nav role="navigation" className="text-center flex space-x-2">
      {items?.length && <ul role="list">{renderPaginationItems()}</ul>}
    </nav>
  );
};
