import React from "react";

interface Props {
  query: string;
  setQuery: (s: string) => void;
}

const SearchBar: React.FC<Props> = ({ query, setQuery }) => {
  return (
    <input
      placeholder="Tìm theo tên..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      style={{ padding: 8, width: 220 }}
    />
  );
};

export default SearchBar;
