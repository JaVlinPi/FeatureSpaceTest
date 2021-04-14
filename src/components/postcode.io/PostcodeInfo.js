import React from "react";
import PostcodeError from "./PostcodeError";
import SinglePostcodeInfo from "./SinglePostcodeInfo";

function PostcodeInfo(props)
{
    if ( props.status === 200 ) {
        return (
            <div className={''}>
                {props.result.map((postcodeInfo,index)=>{
                    return([
                        <SinglePostcodeInfo index={index} {...postcodeInfo}/>
                        , index === 0 ? <div key={-1} className='postcodeInfo subheader'>Nearest Postcodes</div> : null
                    ]);
                })}
            </div>
        );
    }
    return (<PostcodeError/>);
}

export default PostcodeInfo;