
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [play, setPlay] = useState(false);
  const [timingType, setTimingType] = useState('SESSION');
  const [timeLeft, setTimeLeft] = useState(1500);

  const timeout = setTimeout(() => {
    if (timeLeft && play){
      setTimeLeft(timeLeft - 1);
    }
  }, 1000);
  

  const handleBreakIncrease = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1)
    }
  };

  const handleBreakDecrease = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1)
    }
  };

  const handleSessionIncrease = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      setTimeLeft(timeLeft + 60);
    }
  };

  const handleSessionDecrease = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      setTimeLeft(timeLeft - 60);
    }
  };

  const timeFormatter = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - minutes * 60;
    const formattedSeconds = seconds < 10 ? '0'+ seconds : seconds;
    const formattedMinutes = minutes < 10 ? '0'+ minutes : minutes;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const title = timingType === 'SESSION' ? 'Session' : 'Break';

  const  handlePlay = () => {
    setPlay(!play);

  };

  const handleReset = () => {
    clearTimeout(timeout);
    setPlay(false);
    setTimeLeft(1500);
    setBreakLength(5);
    setSessionLength(60);
    setTimingType('SESSION');
    const audio = document.getElementById('beep');
    audio.pause();
    audio.currentTime = 0;

  }

  const resetTimer = () => {
    const audio = document.getElementById('beep');
    if(!timeLeft && timingType === 'SESSION'){
      setTimeLeft(breakLength * 60);
      setTimingType('BREAK');
      audio.play();
    }
    if(!timeLeft && timingType === 'BREAK'){
      setTimeLeft(sessionLength * 60);
      setTimingType('SESSION');
      audio.pause();
      audio.currentTime = 0;
    }
  };

  const clock = () => {
    if(play) {
      timeout;
      resetTimer();
    }
    else{
      clearTimeout(timeout);
    }
  };

  useEffect(() => {
    clock()
  }, [play, timeLeft, timeout]);
 

  return (
    <div className="App">
      <div className='wrapper'>
        <h2>25 + 5 Clock</h2>
        <div className='break-session-length'>
          <div>
            <h3 id='break-label'>Break Length</h3>
            <button disabled={play} onClick={handleBreakIncrease} id='break-increament'>Increase</button>
            <strong>{breakLength}</strong>
            <button disabled={play} onClick={handleBreakDecrease} id='break-decreament'>Decrease</button>
          </div>

          <div>
            <h3 id='break-label'>Session Length</h3>
            <button disabled={play} onClick={handleSessionIncrease} id='session-increament'>Increase</button>
            <strong>{sessionLength}</strong>
            <button disabled={play} onClick={handleSessionDecrease} id='session-decreament'>Decrease</button>
          </div>  
        </div>

        <div className='timer-wrapper'>
          <div className='timer'>
            <h2 id='timer-label'>{title}</h2>
            <h3 id='time-left'>{timeFormatter()}</h3>
          </div>
          <button onClick={handlePlay} id='start-stop'>Start/Stop</button>
          <button onClick={handleReset} id='reset'>Reset</button>
        </div>

      </div>

      <audio id='beep' preload='auto' src='https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav'/>
    </div>
  );
}

export default App;
