import React from 'react';

const Error = ({error}) => {
    return ( 
        <div className='my-3 p-4 text-center  alert alert-primary'>{error}</div>
     );
}
 
export default Error;