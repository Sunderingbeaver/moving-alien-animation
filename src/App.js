import React, { useState, useRef } from 'react';
import './App.css';

const App = () => {
  const [animation, setAnimation] = useState(null);
  const [currentFrame, setCurrentFrame] = useState(1);
  const [animationInterval, setAnimationInterval] = useState(null);
  const [bottomOffset, setBottomOffset] = useState(0);
  const [animationStarted, setAnimationStarted] = useState(false);
  const animationFrames1 = 10;
  const animationDuration = 180; 
  const jumpButtonRef = useRef(null);
  const leftButtonRef = useRef(null);
  const rightButtonRef = useRef(null);
  const dockButtonRef = useRef(null);

  const startJumpAnimation = () => {
    if (animationStarted || animation === 'jump') return; 
    setAnimation('jump');
    setCurrentFrame(1);
    setBottomOffset(0);

    const intervalId = setInterval(() => {
      setCurrentFrame((prevFrame) => {
        let nextFrame;
        switch (prevFrame) {
          case 1:
          case 2:
          case 3:
            nextFrame = prevFrame + 1; 
            break;
          case 4:
          case 5:
            nextFrame = prevFrame + 1;
            setBottomOffset((prevOffset) => prevOffset + 40);
            break;
          case 6:
          case 7:
            nextFrame = prevFrame === animationFrames1 ? 1 : prevFrame + 1; 
            setBottomOffset((prevOffset) => prevOffset - 40); 
            break;
          case 8:
            nextFrame = 1;
            break;
          case 9:
          case 10:
          case 11:
            prevFrame = 0;
            break;
          default:
            nextFrame = prevFrame;
        }
        return nextFrame;
      });
    }, animationDuration);

    setAnimationInterval(intervalId);
    setAnimationStarted(true);
  };

  const startLeftAnimation = () => {
    if (animationStarted || animation === 'left') return;
    setAnimation('left');
    setCurrentFrame(1);
    setBottomOffset(0);
    
    let isForward = true;
    let leftOffset = 0; 
    
    const intervalId = setInterval(() => {
      setCurrentFrame((prevFrame) => {
        let nextFrame;
        if (isForward) {
          nextFrame = prevFrame === 6 ? 1 : prevFrame + 1;
          leftOffset -= 12;
        } else {
          nextFrame = prevFrame === 1 ? 6 : prevFrame - 1;
          leftOffset += 12;
        }
        if (prevFrame === 6) {
          isForward = false;
        } else if (prevFrame === 1 && !isForward) {
          isForward = true;
        }
        
        const animationElement = document.querySelector('.animation');
        if (animationElement) {
          animationElement.style.left = `${leftOffset}px`;
        }
        
        return nextFrame;
      });
    }, animationDuration);
  
    setAnimationInterval(intervalId);
    setAnimationStarted(true);
  };
  
  const startRightAnimation = () => {
    if (animationStarted || animation === 'right') return;
    setAnimation('right');
    setCurrentFrame(1);
    setBottomOffset(0);
    
    let isForward = true;
    let rightOffset = 0;
    
    const intervalId = setInterval(() => {
      setCurrentFrame((prevFrame) => {
        let nextFrame;
        if (isForward) {
          nextFrame = prevFrame === 6 ? 1 : prevFrame + 1;
          rightOffset += 18;
        } else {
          nextFrame = prevFrame === 1 ? 6 : prevFrame - 1;
          rightOffset -= 18;
        }
        if (prevFrame === 6) {
          isForward = false;
        } else if (prevFrame === 1 && !isForward) {
          isForward = true;
        }
        
        
        const animationElement = document.querySelector('.animation');
        if (animationElement) {
          animationElement.style.left = `${rightOffset}px`;
        }
        
        return nextFrame;
      });
    }, animationDuration);
  
    setAnimationInterval(intervalId);
    setAnimationStarted(true);
  };
  
  const startDockAnimation = () => {
    if (animationStarted || animation === 'dock') return;
    setAnimation('dock');
    setCurrentFrame(1);

    const intervalId = setInterval(() => {
      setCurrentFrame((prevFrame) => {
        const nextFrame = prevFrame === 6 ? 1 : prevFrame + 1;
        return nextFrame;
      });
    }, animationDuration);
    
    setAnimationInterval(intervalId);
    setAnimationStarted(true);
  };

  const stopAnimation = () => {
    setAnimation(null);
    clearInterval(animationInterval);
    setAnimationStarted(false);
  };

  return (
    <div className="container">
      <div className="buttons">
        <button
          ref={jumpButtonRef}
          onMouseEnter={startJumpAnimation}
          onMouseLeave={stopAnimation}
          style={{ backgroundColor: animation === 'jump' ? 'darkgreen' : '' }}
        >
          Jump
        </button>
        <button
          ref={leftButtonRef}
          onMouseEnter={startLeftAnimation}
          onMouseLeave={stopAnimation}
          style={{ backgroundColor: animation === 'left' ? 'darkgreen' : '' }}
        >
          Left
        </button>
        <button
          ref={rightButtonRef}
          onMouseEnter={startRightAnimation}
          onMouseLeave={stopAnimation}
          style={{ backgroundColor: animation === 'right' ? 'darkgreen' : '' }}
        >
          Right
        </button>
        <button
          ref={dockButtonRef}
          onMouseEnter={startDockAnimation}
          onMouseLeave={stopAnimation}
          style={{ backgroundColor: animation === 'dock' ? 'darkgreen' : '' }}
        >
          Dock
        </button>
      </div>
      <div className="grid-container">
        <div className="square">
        <div className="animation-container">
            {animation && (
              <div className="animation" style={{ bottom: `${bottomOffset}px` }}>
                <img
                  src={`/${animation}-${currentFrame}.png`}
                  alt={`${animation} animation`}
                />
              </div>
            )}
            {!animation && ( 
              <div className="animation" style={{ bottom: `${bottomOffset}px` }}>
                <img src="/idle-1.png" alt="idle" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
