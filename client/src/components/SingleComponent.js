import axios from 'axios';
import { useState, useEffect } from 'react';
import NavbarComponent from './NavbarComponent';
import HTMLReactParser from 'html-react-parser';

const SingleComponent = (props) => {
  const [blog, setBlog] = useState('');
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/blog/${props.match.params.slug}`)
      .then((response) => {
        setBlog(response.data);
      })
      .catch((err) => {
        alert(err);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <NavbarComponent />
      <div className="container p-5">
        {blog && (
          <div>
            <h1>{blog.title}</h1>
            <div className="pt-3">{HTMLReactParser(blog.content)}</div>
            <p className="text-muted">
              ผู้เขียน: {blog.author} , เผยแพร่:{' '}
              {new Date(blog.createdAt).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default SingleComponent;
