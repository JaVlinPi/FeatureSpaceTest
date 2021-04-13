import React from "react";
import PostcodeError from "./PostcodeError";

function PostcodeInfo(props)
{
    if ( props.status === 200 ) {
        return (
            <div className={''}>
                {props.result.map((postcodeInfo,index)=>{
                    return([
                        <div key={index} className={'postcodeInfo '+(index===0?'':'nearest')}>
                            <div>{'Postcode: '+postcodeInfo.postcode}</div>
                            <div>{'Country: '+postcodeInfo.country}</div>
                            <div>{'Region: '+postcodeInfo.region}</div>
                        </div>
                        , index === 0 ? <div key={-1} className='postcodeInfo subheader'>Nearest Postcodes</div> : null
                    ])
                })}
            </div>
        );
    }
    return (<PostcodeError/>);
}

export default PostcodeInfo;