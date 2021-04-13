function PostcodeError(props)
{
    return (
        <div className='postcodeError'>
            <div>Unable to obtain information for that postcode. Ensure that it is typed in correctly.</div>
        </div>
    );
}

export default PostcodeError;