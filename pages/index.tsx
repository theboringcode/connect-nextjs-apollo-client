import Head from "next/head";
import gql from "graphql-tag";
import { withApollo } from "../lib/withApollo";
import { useQuery } from "@apollo/react-hooks";
import { BooksQuery } from "../generated/graphql";

const BOOKS_QUERY = gql`
  query books {
    books {
      title
      author
    }
  }
`;

const Home = withApollo(() => {
  const { data, loading, error } = useQuery<BooksQuery>(BOOKS_QUERY);
  if (loading) return <div>loading...</div>;
  if (error) return <div>error...</div>;
  if (!data || !data.books) return <div>no data...</div>;
  return (
    <div>
      <h2>Book list</h2>
      <ul>
        {data.books.map(book => {
          return <li key={book.title}>{book.title}</li>;
        })}
      </ul>
    </div>
  );
});

export default Home;
