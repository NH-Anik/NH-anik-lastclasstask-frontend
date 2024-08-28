import HeroSlider, { Slide, MenuNav } from "hero-slider";

const HeroRight = () => {
    return (
        <div>
            <HeroSlider height={"35vh"} width={"100%"} autoplay controller={{initialSlide: 1,slidingDuration: 500,slidingDelay: 100,
                onSliding: (nextSlide) =>console.debug("onSliding(nextSlide): ", nextSlide),
                onBeforeSliding: (previousSlide, nextSlide) =>console.debug("onBeforeSliding(previousSlide, nextSlide): ",previousSlide,nextSlide),
                onAfterSliding: (nextSlide) =>console.debug("onAfterSliding(nextSlide): ", nextSlide)}}>
                <Slide shouldRenderMask background={{backgroundImageSrc: "https://res.cloudinary.com/dcd9icdyb/image/upload/QBCORE-STORE/home-one.jpg"}}/>
                <Slide shouldRenderMask background={{backgroundImageSrc: "https://res.cloudinary.com/dcd9icdyb/image/upload/QBCORE-STORE/home-two.jpg"}}/>
                <Slide shouldRenderMask background={{backgroundImageSrc: "https://res.cloudinary.com/dcd9icdyb/image/upload/QBCORE-STORE/home-three.jpg"}}/>
                <Slide shouldRenderMask background={{backgroundImageSrc: "https://res.cloudinary.com/dcd9icdyb/image/upload/QBCORE-STORE/home-four.jpg"}}/>
                <Slide shouldRenderMask background={{backgroundImageSrc: "https://res.cloudinary.com/dcd9icdyb/image/upload/QBCORE-STORE/home-five.jpg"}}/>
                <Slide shouldRenderMask background={{backgroundImageSrc: "https://res.cloudinary.com/dcd9icdyb/image/upload/QBCORE-STORE/home-six.jpg"}}/>
                <Slide shouldRenderMask background={{backgroundImageSrc: "https://res.cloudinary.com/dcd9icdyb/image/upload/QBCORE-STORE/home-seven.jpg"}}/>
                <Slide shouldRenderMask background={{backgroundImageSrc: "https://res.cloudinary.com/dcd9icdyb/image/upload/QBCORE-STORE/home-eight.jpg"}}/>
                <Slide shouldRenderMask background={{backgroundImageSrc: "https://res.cloudinary.com/dcd9icdyb/image/upload/QBCORE-STORE/home-nine.jpg"}}/>
              <MenuNav />
            </HeroSlider>
        </div>
    );
};

export default HeroRight;