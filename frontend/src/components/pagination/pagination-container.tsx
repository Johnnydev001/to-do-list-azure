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
        className="p-1 bg-white text-xs rounded-md text-center w-5 cursor-pointer hover:bg-gray-400 hover:text-white"
      >
        {item}
      </li>
    ));
  };

  return (
    <nav role="navigation" className="col-start-6 col-end-6">
      {items?.length && (
        <ul role="list" className="text-center flex space-x-1 justify-center">
          {renderPaginationItems()}
        </ul>
      )}
    </nav>
  );
};
