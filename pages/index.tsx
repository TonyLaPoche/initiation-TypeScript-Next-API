import Link from "next/link";

const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <Link href='/blog'>
        <a>blog</a>
      </Link>
      <Link href='/product'>
        <a>products list</a>
      </Link>
    </div>
    
  )
}

export default Home;