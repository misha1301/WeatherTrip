import './search.css';
import React, {useRef} from "react";
import searchIcon from '../../assets/search.svg'

const Search = ({setState, ...inputProps}) => {

    const labelRef = useRef(null);
    const onInputAction = (show) => {
        if(labelRef.current !== null) {
            show
                ? labelRef.current.style.border = "1px solid black"
                : labelRef.current.style.border = "1px solid rgba(242, 244, 248, 0)" ;
        }
    }
    return (
        <label ref={labelRef} id="search-field">
            <img src={searchIcon} alt={'search'}/>
            <input
                {...inputProps}
                onFocus={()=>onInputAction(true)}
                onBlur={()=>onInputAction(false)}
                type='text'
                onChange={(e) => {
                    setState?.(e.target.value);
                }}
            />
        </label>
    );
}

export default Search;
