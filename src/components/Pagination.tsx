import ArrowLeftIcon from "../assets/ArrowLeftIcon";
import ArrowRightIcon from "../assets/ArrowRightIcon";

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
};

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null; // don't show pagination when there's only one page

  return (
    <div className="pagination">
      <button onClick={() => onPageChange(page - 1)} disabled={page === 1}>
        <ArrowLeftIcon className="icon" />
      </button>
      <span>
        {page} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        <ArrowRightIcon className="icon" />
      </button>
    </div>
  );
}
