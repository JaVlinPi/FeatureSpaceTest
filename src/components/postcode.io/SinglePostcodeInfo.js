import React from "react";

function SinglePostcodeInfo(props)
{
    return(
        <div key={props.index} className={'postcodeInfo '+(props.index===0?'':'nearest')}>
            <div>{'Postcode: '+props.postcode}</div>
            <div>{'Country: '+props.country}</div>
            <div>{'Region: '+props.region}</div>
        </div>
    );
}

export default SinglePostcodeInfo;