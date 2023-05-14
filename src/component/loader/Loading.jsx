import React from 'react'
import loader from '../../assets/loader.json'
import Lottie from 'react-lottie';

const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: loader,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

 console.log(window.location.pathname) 


function Loading() {
  return (
    <div>
        <Lottie 
                style={{padding:'-70px auto'}}
                options={defaultOptions}
                height={250}
                width={400}
            //   isStopped={this.state.isStopped}
            //   isPaused={this.state.isPaused}
              />

         <h5 style={{textAlign:'center'}}>
            {window.location.pathname === "/" && "Please wait we are getting the best prices for you ....."}
            {window.location.pathname === "/search_results" && "Please wait we are getting the best packages as per your request ....."}
           </h5>     
    </div>
  )
}

export default Loading