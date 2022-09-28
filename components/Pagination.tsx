import Link from "next/link";

const Pagination = ({ page, t }: { page: string; t: string }) => {
  return (
    <div className="mx-auto mt-8 mb-10 flex h-full w-full max-w-screen-2xl justify-center md:mt-0">
      <Link
        href={
          t
            ? `/list/${t}/${parseInt(page) - 1}`
            : `/list?page=${parseInt(page) - 1}`
        }
      >
        <a
          className={`btn btn-outline btn-secondary rounded-none px-4 py-2  ${
            page === "1" ? "btn-disabled cursor-not-allowed" : ""
          }`}
        >
          PREV
        </a>
      </Link>

      <Link
        href={
          t
            ? `/list/${t}/${parseInt(page) + 1}`
            : `/list?page=${parseInt(page) + 1}`
        }
      >
        <p className="btn btn-disabled btn-outline btn-square cursor-not-allowed rounded-none px-4 py-2">
          {parseInt(page)}
        </p>
      </Link>

      <Link
        href={
          t
            ? `/list/${t}/${parseInt(page) + 1}`
            : `/list?page=${parseInt(page) + 1}`
        }
      >
        <a className="btn btn-outline btn-square rounded-none px-4 py-2 ">
          {parseInt(page) + 1}
        </a>
      </Link>
      <Link
        href={
          t
            ? `/list/${t}/${parseInt(page) + 2}`
            : `/list?page=${parseInt(page) + 2}`
        }
      >
        <a className="btn btn-outline btn-square rounded-none px-4 py-2 ">
          {parseInt(page) + 2}
        </a>
      </Link>
      <Link
        href={
          t
            ? `/list/${t}/${parseInt(page) + 3}`
            : `/list?page=${parseInt(page) + 3}`
        }
      >
        <a className="btn btn-outline btn-square rounded-none px-4 py-2 ">
          {parseInt(page) + 3}
        </a>
      </Link>
      <Link
        href={
          t
            ? `/list/${t}/${parseInt(page) + 4}`
            : `/list?page=${parseInt(page) + 4}`
        }
      >
        <a className="btn btn-outline btn-square hidden rounded-none px-4 py-2 md:inline-flex">
          {parseInt(page) + 4}
        </a>
      </Link>
      <Link
        href={
          t
            ? `/list/${t}/${parseInt(page) + 5}`
            : `/list?page=${parseInt(page) + 5}`
        }
      >
        <a className="btn btn-outline btn-square hidden rounded-none px-4 py-2 md:inline-flex">
          {parseInt(page) + 5}
        </a>
      </Link>
      <Link
        href={
          t
            ? `/list/${t}/${parseInt(page) + 6}`
            : `/list?page=${parseInt(page) + 6}`
        }
      >
        <a className="btn btn-outline btn-square hidden rounded-none px-4 py-2 md:inline-flex">
          {parseInt(page) + 6}
        </a>
      </Link>

      <Link
        href={
          t
            ? `/list/${t}/${parseInt(page) + 1}`
            : `/list?page=${parseInt(page) + 1}`
        }
      >
        <a className="btn btn-outline btn-secondary rounded-none px-4 py-2 ">
          NEXT
        </a>
      </Link>
    </div>
  );
};

export default Pagination;
