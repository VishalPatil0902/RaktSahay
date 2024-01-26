import React from 'react';
import { Hearts } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div style={{height: '100%', width: '100%', display:'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
      <Hearts
      height="80"
      width="80"
      color="red"
      ariaLabel="hearts-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      />
      <p style={{marginTop: '10px'}}>Please Wait</p>
    </div>
  )
}

export default Loader;
