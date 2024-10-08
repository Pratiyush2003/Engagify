import React, { useEffect, useState } from "react";
import counterData from "../Data/CounterData.json";

const Counter = () => {
  const [specialists, setSpecialists] = useState(0);
  const [experience, setExperience] = useState(0);
  const [projectsDelivered, setProjectsDelivered] = useState(0);

  const startCount = (target, setCounter, duration) => {
    let start = 0;
    const end = target;
    const increment = end / (duration / 50);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCounter(end);
        clearInterval(timer);
      } else {
        setCounter(Math.round(start));
      }
    }, 30);
  };

  const startCounter = () => {
    startCount(counterData.counters[0].value, setSpecialists, 1000);
    startCount(counterData.counters[1].value, setExperience, 1000);
    startCount(counterData.counters[2].value, setProjectsDelivered, 1000);
  };

  useEffect(() => {
    const countSection = document.getElementById("js-section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startCounter();
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(countSection);
    return () => observer.disconnect();
  }, []);

  return (
    <article className="flex items-center justify-center flex-col max-w-7xl mx-auto mt-14 px-6 rounded-2xl" id="Achivement">

      <div className="font-bold text-center mb-4">
        <div className="flex flex-wrap justify-center items-center md:px-0">
          <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl" data-aos="fade-left">
            Delivering Innovative, Growth-Focused <br /> App and Web Development <br /> Solutions
          </h1>
        </div>
      </div>


      <div>
        <p className="text-center mb-4 px-4 max-w-2xl">
          {counterData.description}
        </p>
      </div>


      <div className="flex flex-col md:flex-row items-center justify-between p-6 mt-8" id="js-section">
        {counterData.counters.map((counter, index) => (
          <div
            key={counter.id}
            className={`w-full md:w-1/3 text-center p-6 ${index < counterData.counters.length - 1 ? "border-b md:border-b-0 md:border-r border-green" : ""
              }`}
          >
            <h1 className="text-green text-7xl mt-3 font-bold">
              {index === 0 ? specialists : index === 1 ? experience : projectsDelivered}+
            </h1>
            <p className="w-full md:w-64 mx-auto mt-3">{counter.title}</p>
            <div className="flex items-center justify-center text-green text-3xl mt-3">
              <span className="ml-2">
                <img
                  src={counter.image}
                  alt={counter.altText}
                  className="w-20 h-20 object-contain"
                />
              </span>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
};

export default Counter;
