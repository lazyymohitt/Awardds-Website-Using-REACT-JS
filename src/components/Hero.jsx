import React, { useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import {gsap} from "gsap"
import { ScrollTrigger } from "gsap/all";
import { useEffect } from "react";
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  //index of the video
  const [currentIndex, setcurrentIndex] = useState(1);
  // useClicked or not
  const [hasClicked, sethasClicked] = useState(false);
  // viddeo is Loading
  const [isLoading, setisLoading] = useState(true);
  //number of videos  loaded
  const [loadedVideos, setloadedVideos] = useState(0);
  const TotalVideos = 4;
  // here  inam suing the ref because I want To Target the Specific DOM ELEMENT
    // to escape from breaking the continuosly videos renderig

    const upCominggIndex = (currentIndex % TotalVideos) + 1 
  const nextVideoRef = useRef(null);
  ///function to handle use clicks
  const handleClick = () => {
    sethasClicked(true)
    setcurrentIndex(upCominggIndex)
  };

  // function to handle video source 
  const getVideoSrc= (index)=>`videos/hero-${index}.mp4`

  // function to handle video loading
  const handleVideoLoad = () => {
    setloadedVideos((prev)=> prev + 1)
  }
  useEffect(() => {
    if (loadedVideos === TotalVideos - 1) {
      setisLoading(false);
    }
  }, [loadedVideos]);
  useGSAP(()=>{

    if(hasClicked){
      gsap.set('#next-video' , {visibility:'visible '})

      gsap.to('#next-video',{
        transformOrigin:"center center",
        scale:1,
        width:"100%",
        height:"100%",
        duration:1,
        ease:"power1.inOut",
        onStart : ()=> nextVideoRef.current.play(),



      })
      gsap.from('#current-video',{
        transform:"center center",
        scale:0,
        duration:1.5,
        ease:"power1.inOut"
      })
    }

  },{dependencies:[currentIndex], revertOnUpdate: true})

  useGSAP(() => {
    gsap.set("#VideoPlayer", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#VideoPlayer", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#VideoPlayer",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });


  return (


    <div id="hero" className="relative h-dvh w-screen overflow-x-hidden">
     {isLoading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          {/* https://uiverse.io/G4b413l/tidy-walrus-92 */}
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      <div
        id="VideoPlayer"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg"
      >
        <div id="structure">
          <div
            id="custom-css-divs"
            className="polygon-shape center-div absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg "
          >
            <div onClick={handleClick} className="Minivideoplayer origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:opacity-100 hover:scale-100">
              <video 
              src={getVideoSrc(upCominggIndex)}
              loop muted id="current-video"
              className="size-64 origin-center rounded-lg scale-50 object-cover object-center "
              onLoadedData={handleVideoLoad}
              />
            </div>
          </div>
          <video className="center-div invisible absolute object-cover object-center z-20 size-64" ref={nextVideoRef} loop muted onLoadedData={handleVideoLoad}  id="next-video" src={getVideoSrc(currentIndex)}></video>

          <video src={getVideoSrc(currentIndex === TotalVideos - 1 ? 1 :currentIndex )}
          autoPlay
          muted loop className="absolute left-0 top-0 size-full object-cover object-center "
          onLoadedData={handleVideoLoad}
          >
          </video>
          <h1 className="headings text-3xl hero-heading absolute text-[#DFDFF2] z-40 right-5 bottom-5">
            G<b>a</b>ming
          </h1>
          <div className="absolute left-0 top-0 z-40 size-full ">
              <div className=" px-5 mt-24 sm:px-10">
                <h1 className="headings hero-heading text-[#DFDFF2] ">redifi<b>n</b>e</h1>
                <p className="mb-5 max-w-64 text-xs font-[gilroy] text-white">Enter the Metagame Layer <br /> Unleash the Play Economy </p>
                <Button id="watch-trailer" title="Watch Trailer" leftIcon={<TiLocationArrow/>} containerClass="!bg-yellow-300 flex-center gap-1" />
              </div>
          </div>
        </div>
        
      </div>
      <h1 className=" hero-heading absolute bottom-5 right-5 text-black">
        G<b>A</b>MING
      </h1>
    </div>
  );
};

export default Hero;
