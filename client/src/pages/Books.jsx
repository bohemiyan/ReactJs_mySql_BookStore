import {React,useEffect,useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {

  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("/books");
        const db = await axios.get("/conn");
        console.log(db.data);
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/books/${id}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>

      <h1>Books</h1>
      <button className="addHome">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
          Add new Book
        </Link>
      </button>
      <div className="books">
        {books.map((book) => (
          <div key={book.id} className="book">
            {/* <img src={book.cover} alt="cover_image" /> */}
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <span>₹{book.price}</span>
            <p>{book.cover}</p>
            <button className="delete" onClick={() => handleDelete(book.id)}>Delete</button>
            <button className="update">
              <Link
                to={`/update/${book.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Update
              </Link>
            </button>
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default Books;
