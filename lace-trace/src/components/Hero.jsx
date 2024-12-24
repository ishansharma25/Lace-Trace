import React, { useState, useContext } from 'react';
import shoepic from "../assets/shoepic.jpg";
import { UserContext } from '../../context/userContext';
import { Link } from 'react-router-dom';
const Hero = () => {
     const { user } = useContext(UserContext);
    return (
      <main className="bg-gradient-to-r from-violet-950 to-violet-900 pt-20 dark:bg-violet-950">
        <section className="container flex h-[650px] flex-col items-center justify-center md:h-[500px]">
          <div className="grid grid-cols-1 items-center gap-8 dark:text-white md:grid-cols-2">
            <div
              data-aos="fade-right"
              data-aos-duration="400"
              data-aos-once="true"
              className="flex flex-col items-center gap-4 text-center text-white md:items-start md:text-left"
            >
              <h1 className="text-4xl">
                Authenticate Your Sneakers with AI Precision
              </h1>
              <p>
                Lace-Trace: Your Ultimate Tool for Sneaker Authentication and Personalized Recommendations
              </p>
                            <div className="space-x-4">
                            {user ? (
   <>
   <p>You are already logged in Chat with us</p>
   <Link to="/streamlit">
     <button className="rounded-md border-2 border-primary bg-primary px-4 py-2 text-sm text-white transition-colors duration-300 hover:bg-primary/80">
       Chat...
     </button>
   </Link>
 </>
  ) : (
    <Link to="/login">
      <button className="rounded-md border-2 border-primary bg-primary px-4 py-2 text-sm text-white transition-colors duration-300 hover:bg-primary/80">
        Login
      </button>
    </Link>
  )}
</div>
            </div>
            <div
              data-aos="fade-left"
              data-aos-duration="400"
              data-aos-once="true"
              className="mx-auto flex justify-center p-4"
            >
              <img src={shoepic} alt="No image" className=" object-cover hover:drop-shadow-md" />
            </div>
          </div>
        </section>
      </main>
    );
  };
  
  export default Hero;
 