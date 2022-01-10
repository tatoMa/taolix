import Link from "next/link";

const Pagination = ({ page, t }) => {
  return (
    <div className="w-full h-full max-w-screen-2xl mx-auto flex justify-center mt-8 md:mt-0 mb-16">
      <Link
        href={
          t
            ? `/list/${t}/${parseInt(page) - 1}`
            : `/list?page=${parseInt(page) - 1}`
        }
      >
        <a
          className={`px-4 py-2 mx-1 ${
            page == 1
              ? "text-gray-500 cursor-not-allowed bg-black border border-white"
              : "text-white transition-colors duration-200 transform bg-black border border-white hover:bg-white hover:text-black"
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
        <a className="px-4 py-2 mx-1 text-white transition-colors duration-200 transform bg-black border border-white hover:bg-white hover:text-black">
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
        <a className="px-4 py-2 mx-1 text-white transition-colors duration-200 transform bg-black border border-white hover:bg-white hover:text-black">
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
        <a className="px-4 py-2 mx-1 text-white transition-colors duration-200 transform bg-black border border-white hover:bg-white hover:text-black">
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
        <a className="hidden md:block px-4 py-2 mx-1 text-white transition-colors duration-200 transform bg-black border border-white hover:bg-white hover:text-black">
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
        <a className="hidden md:block px-4 py-2 mx-1 text-white transition-colors duration-200 transform bg-black border border-white hover:bg-white hover:text-black">
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
        <a className="hidden md:block px-4 py-2 mx-1 text-white transition-colors duration-200 transform bg-black border border-white hover:bg-white hover:text-black">
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
        <a className="px-4 py-2 mx-1 text-white transition-colors duration-200 transform bg-black border border-white hover:bg-white hover:text-black">
          NEXT
        </a>
      </Link>
    </div>
  );
};

export default Pagination;
