import React, { useState, useEffect } from 'react';
import gsap from 'gsap'; // Make sure to import the gsap library
import './LoadingPage.css';

const LoadingPage = () =>{
    const maoriNumbers = ['kore','tahi','rua','toru','whā','rima','ono','whitu','waru','iwa','tekau','tekau mā tahi',
                            'tekau mā rua','tekau mā toru','tekau mā whā','tekau mā rima','tekau mā ono','tekau mā whitu',
                            'tekau mā waru','tekau mā iwa','rua tekau','rua tekau mā tahi','rua tekau mā rua','rua tekau mā toru',
                            'rua tekau mā whā','rua tekau mā rima','rua tekau mā ono','rua tekau mā whitu','rua tekau mā waru','rua tekau mā iwa',
                            'toru tekau','toru tekau mā tahi','toru tekau mā rua','toru tekau mā toru','toru tekau mā whā','toru tekau mā rima',
                            'toru tekau mā ono','toru tekau mā whitu','toru tekau mā waru','toru tekau mā iwa',
                            'whā tekau','whā tekau mā tahi','whā tekau mā rua','whā tekau mā toru','whā tekau mā whā',
                            'whā tekau mā rima','whā tekau mā ono','whā tekau mā whitu','whā tekau mā waru','whā tekau mā iwa',
                            'rima tekau','rima tekau mā tahi','rima tekau mā rua','rima tekau mā toru','rima tekau mā whā',
                            'rima tekau mā rima','rima tekau mā ono','rima tekau mā whitu','rima tekau mā waru',
                            'rima tekau mā iwa','ono tekau','ono tekau mā tahi','ono tekau mā rua','ono tekau mā toru',
                            'ono tekau mā whā','ono tekau mā rima','ono tekau mā ono','ono tekau mā whitu','ono tekau mā waru',
                            'ono tekau mā iwa','whitu tekau','whitu tekau mā tahi','whitu tekau mā rua','whitu tekau mā toru','whitu tekau mā whā',
                            'whitu tekau mā rima','whitu tekau mā ono','whitu tekau mā whitu','whitu tekau mā waru',
                            'whitu tekau mā iwa','waru tekau','waru tekau mā tahi','waru tekau mā rua','waru tekau mā toru',
                            'waru tekau mā whā','waru tekau mā rima','waru tekau mā ono','waru tekau mā whitu',
                            'waru tekau mā waru','waru tekau mā iwa','iwa tekau','iwa tekau mā tahi','iwa tekau mā rua','iwa tekau mā toru',
                            'iwa tekau mā whā','iwa tekau mā rima','iwa tekau mā ono','iwa tekau mā whitu','iwa tekau mā waru','iwa tekau mā iwa','kotahi rau'
                        ];

    const [counterValue, setCounterValue] = useState(0);
    const [teReoCounterValue, setTeReoCounterValue] = useState('kore');
    const [transition, setTransition] = useState(true);

    useEffect(() => {
        if (!transition) {
          return;
        }
    
        const updateCounter = () => {
          if (counterValue === 100) {
            return;
          }
    
          let newValue = counterValue + Math.floor(Math.random() * 10) + 1;
    
          if (newValue > 100) {
            newValue = 100;
            setTransition(false);
          }
    
          setCounterValue(newValue);
          setTeReoCounterValue(maoriNumbers[newValue]);
    
          const delay = Math.floor(Math.random() * 200) + 50;
          setTimeout(updateCounter, delay);
        };
    
        updateCounter();

        gsap.to('.bar', 1.5, {
            delay: 0.0,
            height: 0,
            stagger: {
              amount: 0.5,
            },
            ease: 'power4.inOut',
          });
      
          gsap.to('.counter', 0.25, {
            delay: 3.5,
            opacity: 0,
          });
      
          gsap.to('.te-reo-counter', 0.25, {
            delay: 3.5,
            opacity: 0,
          });
      
          // Clean up function
          return () => {
            // You might want to cancel any ongoing timers here if needed
          };
        }, [counterValue, transition]);

        return (
            <div>
{/*               <h1 className="counter">{counterValue}</h1>
              <h1 className="te-reo-counter">{teReoCounterValue}</h1> */}
              <div class="overlay">
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
            </div>
            </div>
          );
};

export default LoadingPage;