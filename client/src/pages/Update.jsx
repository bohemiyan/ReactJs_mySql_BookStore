import axios from "axios";
import  {React, useState,useEffect} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";


const Update = () => {
  const [book, setBook] = useState({});
  const [error,setError] = useState(false)


  const location = useLocation();
  const navigate = useNavigate();

  const bookId = location.pathname.split("/")[2];
 

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`/books/${bookId}`);
       
        setBook(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBook();
  }, [bookId]);
 

  const handleChange = (e) => {
    e.preventDefault();
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`/books/${bookId}`, book);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  
  
  return (
    <div className="form" key={book.id}>
      <h1>Update the Book</h1>
      <input
        type="text"
        value={book.title}
        name="title"
        onChange={handleChange}
        required
      />
      <input
        //textarea
        //rows={5}
        type="text"
        value={book.desc}
        name="desc"
        onChange={handleChange}
      />
      <input
        type="number"
        value={book.price}
        name="price"
        onChange={handleChange}
      />
      <input
        type="text"
        alt="image"
        value={book.cover}
        name="cover"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Update</button>
      {error && "Something went wrong!"}
      <Link to="/">See all books</Link>
    </div>
  );
};

export default Update;
