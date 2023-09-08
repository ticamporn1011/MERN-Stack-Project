import NavbarComponent from './components/NavbarComponent';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import HTMLReactParser from 'html-react-parser';
import { Link } from 'react-router-dom';
import { getToken, getUser } from './services/authorize';

function App() {
  const [blogs, setBlogs] = useState([]);
  const fetchData = () => {
    axios
      .get(`${process.env.REACT_APP_API}/blogs`)
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const confirmDelete = (slug) => {
    Swal.fire({
      title: 'คุณต้องการลบบทความนี้หรือไม่ ?',
      icon: 'warning',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBlog(slug);
      }
    });
  };

  const deleteBlog = (slug) => {
    // ส่ง request ไปที่ api เพื่อเพิ่มข้อมูล
    axios
      .delete(`${process.env.REACT_APP_API}/blog/${slug}`, {
        headers: {
          authorization: `Bearer ${getToken()}`
        }
      })
      .then((response) => {
        Swal.fire('Deleted!', response.data.message, 'success');
        fetchData();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <NavbarComponent />
      <div className="container p-5">
        {blogs.map((blog, index) => (
          <div className="row" key={index} style={{ borderBottom: '1px solid silver' }}>
            <div className="col pt-3 pb-2">
              <Link to={`/blog/${blog.slug}`} className="text-decoration-none">
                <h4>{blog.title}</h4>
              </Link>
              <div className="pt-3">
                {HTMLReactParser(blog.content.substring(0, 250))}
              </div>
              <p className="text-muted">
                ผู้เขียน: {blog.author} , เผยแพร่:{' '}
                {new Date(blog.createdAt).toLocaleString()}
              </p>
              {getUser() && (
                <div>
                  <Link
                    to={`/blog/edit/${blog.slug}`}
                    className="btn btn-outline-success"
                  >
                    แก้ไขบทความ
                  </Link>
                  &nbsp;
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => confirmDelete(blog.slug)}
                  >
                    ลบบทความ
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
