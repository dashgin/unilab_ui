import React, { useState, useEffect, useReducer, useRef } from "react";
import { NavLink } from "react-router-dom";
import {config} from "../Config/config";
import fetchContent from "./HelperFunctions/fetchContent";
// STYLES
import "./Slider.css";
// IMAGES
import microsoft_icon from "../Assets/img/ms.jpg";
import google_icon from "../Assets/img/google-logo.webp";
import SliderCard from "./SliderCard";
import BoxGrid from "./HomeComponents/BoxGrid";
import {useAuthState} from "../Context";

function Slider(props) {
    const authState = useAuthState()
    const contentType = props.contentType
    const slider = useRef(null);
    const moreBtn = useRef(null);
    const [cards, setCards] = useState([])
    const [page, setPage] = useState(1)

    function toggleSlide(direction) {
        var currentLeft = parseInt(slider.current.style.left);
        var sliderChildren = (slider.current.childElementCount - 1);
        var maxSlides = parseInt(sliderChildren / 4);
        var maxWidth = maxSlides * 80;
        if (sliderChildren % 4 === 0) {
            maxSlides = maxSlides - 1;
        }
        if (direction === "prev") {
            if (currentLeft >= 0) {
                return 0;
            }
            var newLeft = currentLeft + 80;
        } else {
            if (currentLeft <= -maxWidth) {
                return 0;
            }
            var newLeft = currentLeft - 80;
        }
        slider.current.style.left = `${newLeft}rem`;
    }



    useEffect(() => {
        if ((slider.current.childElementCount - 1) < 10) {
            moreBtn.current.classList.add('hidden');
        } else {
            moreBtn.current.classList.remove('hidden');
        }

        var sliderWidth = slider.current.childElementCount * 20;
        slider.current.style.width = `${sliderWidth}rem`;
        slider.current.style.left = "0rem";
    });

    useEffect( () => {
        fetchContent(contentType, page, authState.token).then(data => {
            const items = data.results
            let newCards = []
            console.log(items)
            for (let i=0;i<items.length;i++){
                let icard = <SliderCard key={i} contentType={contentType} content={items[i]}/>
                newCards.push(icard)
            }
            setCards(oldCards => oldCards.concat(newCards))
        })
    }, [page])

    // TODO: Pagination
    return (
        <div className={`slider-wrapper`}>

            <div className={`slider-title normal flex-row a-i-c j-c-s-b`}>
                <h2>Discover Jobs</h2>
                <span className={`filter-btn noselect`}>Filter</span>
            </div>

            <button className={`arrow-btn arrow-prev`} onClick={() => toggleSlide("prev")}/>
            <button className={`arrow-btn arrow-next`} onClick={() => toggleSlide("next")}/>

            <div className={`slider`} ref={slider}>

                {cards}

                <button className={`more-jobs uni-button`} ref={moreBtn}>More Jobs</button>

            </div>

        </div>
    )
}

export default Slider;