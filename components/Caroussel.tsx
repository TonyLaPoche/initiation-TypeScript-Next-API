import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import style from "../styles/Home.module.css"
import imageLoader from "../imagesLoader";
import { GetCharacterResults } from "../types";




const CarouselCharacters = ({results, info}: GetCharacterResults): JSX.Element => {
  console.log(results);
  
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 5,
          slidesToSlide: 1 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 1 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
      };
      return (
<Carousel
        swipeable={true}
        draggable={true}
        showDots={false}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={false}
        customTransition="all 1s ease-in-out"
        // transitionDuration={5000}
        centerMode={false}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["desktop", "tablet", "mobile"]}
        // deviceType={this.props.deviceType}
        // dotListClass="custom-dot-list-style"
        itemClass="react-multi-carousel-item caroussel__card}"
      >
        {results.map(character => (
            <div className={style.caroussel__card} key={character.id}>

                <Image
                    src={character.image}
                    alt={character.name}
                    width={200}
                    height={200}
                    loader={imageLoader}
                />
                <h2>{character.name} </h2>
            </div>   
            ))}
      </Carousel>
      )
      
}

export default CarouselCharacters;
