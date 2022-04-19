import './BlogpostCard.css';
/*import {blogposts} from '../../../mockupdata/blogposts.js';*/
import { useContext, useEffect, useState } from "react";
import { Link, useHistory, useNavigate } from "react-router-dom";
import { AdminContext } from "../../context";
import axios from "axios";
import parse from 'html-react-parser';

function BlogpostCard() {

  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

    // Context
    //const { adminData, setAdminData } = useContext(AdminContext);
    // console.log("adminContext:", adminData)
    useEffect(() => {
  
      const getData = async () => {
        const response = await axios.get(`/post/list`);
  
        console.log("home loading: response is", response);
  
        setPosts([...response.data]);
      };
  
      getData();
    }, []);

  return (
    posts.slice(0, 6).map(({id, title, date, body}) =>
    <div className='blogpostCard' key={id}>
      <div>
        <h3 className='blogpostCard-title'>{title}</h3>

        <p className='blogpostCard-date'>{date}</p>

        <div className='blogpostCard-text'>{parse(body)}</div>
      </div>

      <div className='btn-container'>
        <a className='btn-readmore' href='#'>Read full article...</a>
      </div>
    </div>
  ));
}

export default BlogpostCard;
