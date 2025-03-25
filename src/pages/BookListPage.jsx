import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import BackImage from "../assets/images/Back.svg";
import SearchIcon from "../assets/images/Search.svg";
import CancelIcon from "../assets/images/Cancel.svg";

const API_URL = "http://skunkworks.ignitesol.com:8000/books";

const BookListPage = () => {
  const { category } = useParams();
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [nextPage, setNextPage] = useState(null);

  const fetchBooks = async (url, reset = false) => {
    setLoading(true);
    try {
      const response = await axios.get(url);

      const filteredBooks = response.data.results.filter((book) => {
        const formats = book.formats;
        return (
          formats["image/jpeg"] &&
          (formats["text/html"] ||
            formats["application/pdf"] ||
            formats["text/plain"])
        );
      });

      setBooks((prev) => (reset ? filteredBooks : [...prev, ...filteredBooks]));

      // Had to construct correct next page URL from the response
      if (response.data.next) {
        const nextUrl = new URL(response.data.next);
        const params = new URLSearchParams(nextUrl.search);
        setNextPage(`${API_URL}?${params.toString()}`);
      } else {
        setNextPage(null);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000);

    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    setBooks([]);
    setNextPage(null);

    const url = debouncedSearch
      ? `${API_URL}?topic=${category}&search=${debouncedSearch}&mime_type=image/`
      : `${API_URL}?topic=${category}&mime_type=image/`;

    fetchBooks(url, true);
  }, [category, debouncedSearch]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const clearSearch = () => {
    setSearch("");
    setDebouncedSearch("");
    setBooks([]);
    setNextPage(null);
  };

  return (
    <>
      <div className="w-full min-h-screen">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          {/* Top Header */}
          <div className="flex items-center mb-4 pt-4">
            <Link to="/" className="text-blue-500">
              <img
                src={BackImage}
                alt="back"
                className="h-6 w-6 cursor-pointer"
              />
            </Link>
            <h1 className="text-2xl font-bold capitalize ml-2 text-[var(--blue-color)]">
              {category}
            </h1>
          </div>

          {/* Search Bar */}
          <div className="relative my-6">
            <img
              src={SearchIcon}
              alt="Search"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
            />
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search"
              className="w-full h-10 pl-10 pr-4 border border-[#A0A0A0] rounded-md bg-[#F0F0F6] text-dark-grey placeholder-[#A0A0A0] focus:outline-none focus:border-blue-500"
            />
            {search && (
              <img
                src={CancelIcon}
                alt="Cancel"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
              />
            )}
          </div>
        </div>

        {/* Book List */}
        <div className="bg-[var(--white-color)] w-full">
          <div className="max-w-screen-xl mx-auto p-4 md:p-4">
            {loading ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : books.length === 0 ? (
              <p className="text-center text-gray-500">No books found.</p>
            ) : (
              <InfiniteScroll
                dataLength={books.length}
                next={() => fetchBooks(nextPage)}
                hasMore={!!nextPage}
                loader={<p>Loading more books...</p>}
              >
                <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-x-4 gap-y-6">
                  {books.map((book, index) => (
                    <div
                      key={`${book.id}-${index}`}
                      className="flex flex-col items-center cursor-pointer"
                      onClick={() => {
                        const formats = book.formats;
                        const url =
                          formats["text/html"] ||
                          formats["application/pdf"] ||
                          formats["text/plain"];
                        if (url) window.open(url, "_blank");
                        else alert("No viewable version available");
                      }}
                    >
                      <img
                        src={book.formats["image/jpeg"]}
                        alt={book.title}
                        className="w-[114px] h-[162px] rounded-lg shadow-md"
                        style={{
                          boxShadow: "0 2px 5px 0 rgba(211, 209, 238, 0.5)",
                        }}
                      />
                      <h3 className="text-[12px] font-semibold text-dark-grey uppercase mt-2 w-[114px] line-clamp-2">
                        {book.title}
                      </h3>
                      <p className="text-[12px] text-[#a0a0a0] font-semibold mt-1 w-[114px] line-clamp-2">
                        {book.authors.map((a) => a.name).join(", ")}
                      </p>
                    </div>
                  ))}
                </div>
              </InfiniteScroll>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookListPage;
