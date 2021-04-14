import React, { useState, useEffect } from "react";
import {
    useParams,
} from "react-router-dom";
import PostcodeError from "./PostcodeError";
import PostcodeInfo from "./PostcodeInfo";

function PostcodeLookup(props)
{
    let paramsPC = useParams().postcode;
    const [postcode, setPostcode] = useState(paramsPC || '');
    const [info, setInfo] = useState({});

    const handleSubmit = (evt) => {
        evt.preventDefault();
        loadPostcode();
    }

    const loadPostcode = async () => {
        setInfo({});
        window.history.replaceState(null, "Postcode Info for "+postcode, "/"+postcode);
        const isValidRes = await fetch('http://api.postcodes.io/postcodes/'+postcode+'/validate');
        const isVaildJSON = await isValidRes.json();
        if ( isVaildJSON && isVaildJSON.status === 200 && isVaildJSON.result ) {
            const response = await fetch('http://api.postcodes.io/postcodes/'+postcode+'/nearest');
            const myJson = await response.json();
            setInfo(myJson);
        }
        else {
            setInfo({status:404});
            alert('The postcode '+postcode+' does not exist.');
        }
    }
    
    useEffect(()=>{
        if ( postcode !== '' ) loadPostcode();
    },[]);


    return (
        <div className={''}>
            <form onSubmit={handleSubmit} className='postcodeLookup'>
                <label>
                    {'Enter Postcode: '}
                    <input
                        type="text"
                        aria-label="input"
                        value={postcode}
                        onChange={(e) => {
                            setPostcode(e.target.value);
                        }}
                    />
                </label>
                <input type="submit" value="Look up postcode" />
            </form>
            {
                info.status ?
                    info.status === 200 ?
                        <PostcodeInfo {...info} />
                    :
                <PostcodeError/>
                : null
            }
        </div>
    );
}

export default PostcodeLookup;