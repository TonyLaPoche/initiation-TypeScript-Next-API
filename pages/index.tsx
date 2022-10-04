import Link from "next/link";
import { NextRouter, useRouter } from "next/router";

const Home = () => {

const router: NextRouter = useRouter();

  const handleClick = () => {
    console.log('place order used !');
    router.push('/product');    
  }

  return (
    <div>
      <h1>Home Page</h1>
      <Link href='/blog'>
        <a>blog</a>
      </Link>
      <Link href='/product'>
        <a>products list</a>
      </Link>

      <button onClick={handleClick}>Place Order</button>

    </div>
    
  )
}

export default Home;