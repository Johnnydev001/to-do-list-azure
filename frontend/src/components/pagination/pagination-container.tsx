export const PaginationContainer = ({
  totalPages = 1,
  currentPage = 1,
  setCurrentPage = () => {},
}: {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (x: number) => void;
}) => {
  const renderPaginationItems = () => {
    const pagesArray = Array.from(
      { length: totalPages },
      (_, index) => index + 1
    );

    return pagesArray?.map((item: number, index: number) => (
      <li
        onClick={() => setCurrentPage(item)}
        key={item + index}
        className={`${
          currentPage === item ? "bg-gray-500 text-white" : "bg-white text-black"
        }  p-2 text-xs rounded-md text-center w-10 cursor-pointer hover:bg-gray-400 hover:text-white`}
      >
        {item}
      </li>
    ));
  };

  return (
    <nav role="navigation" aria-label="pagination">
      {totalPages && (
        <ul role="list" className="text-center flex space-x-1 justify-center">
          {renderPaginationItems()}
        </ul>
      )}
    </nav>
  );
};
