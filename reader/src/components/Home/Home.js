import './Home.css';
import banner from '../../assets/banner.png';
import BlogpostCard from './BlogpostCard/BlogpostCard';
import CategorySidebar from './CategorySidebar/CategorySidebar';

function Home() {  
  return (
    <main>

      <img src={banner} />

      <div className='main-container'>

        <div className='blogpostCard-container'>
          <BlogpostCard />
        </div>

        <CategorySidebar />

      </div>

    </main>
  );
}

export default Home;
