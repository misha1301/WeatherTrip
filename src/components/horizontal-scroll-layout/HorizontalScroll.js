import React, {useEffect} from "react";
import './horizontal_scroll.css';
import left_arrow from '../../assets/left-arrow.svg';
import right_arrow from '../../assets/right-arrow.svg';

const HorizontalScroll = ({children, disableArrow = false}) => {

    const [rightArrow, setRightArrow] = React.useState(true);
    const [leftArrow, setLeftArrow] = React.useState(true);

    const scrollNav = React.useRef(null);

    useEffect(() => {
        arrowVisible();
        const navEvent = scrollNav.current;
        navEvent.addEventListener("scroll", arrowVisible);
        return () => {
            navEvent.removeEventListener("scroll", arrowVisible);
        }
    }, [children]);

    const arrowVisible = () => {
        if (!disableArrow) {
            if (Math.floor(scrollNav.current.scrollWidth - scrollNav.current.clientWidth) !== 0) {
                setLeftArrow(scrollNav.current.scrollLeft <= 0);
                setRightArrow(scrollNav.current.scrollWidth - scrollNav.current.clientWidth <= Math.ceil(scrollNav.current.scrollLeft));
            }else {
                setLeftArrow(true);
                setRightArrow(true);
            }
        }
    }

    const scrollHandler = (direction) =>{
        scrollNav.current.scrollLeft += direction === "right" ? +scrollNav.current.clientWidth : -scrollNav.current.clientWidth;
        setTimeout(()=>arrowVisible(),500);
    }
    const scrollHandlerActive = () =>{

        setTimeout(()=>arrowVisible(),500);
    }

    return (
        <section className={children ? 'horizontal_scroll-section' : 'horizontal_scroll-section empty'}>
            <button  onClick={() =>scrollHandler("left")} disabled={!disableArrow ? leftArrow : disableArrow}
                    className="left-arrow arrow-btn">
                <img src={left_arrow} alt="left arrow"/>
            </button>
            <nav ref={scrollNav} className='horizontal_scroll-nav'>
                {children}
            </nav>
            <button  onClick={() =>scrollHandler("right")} disabled={!disableArrow ? rightArrow : disableArrow}
                    className="right-arrow arrow-btn">
                <img src={right_arrow} alt="right arrow"/>
            </button>
        </section>

    );

}

export default HorizontalScroll;