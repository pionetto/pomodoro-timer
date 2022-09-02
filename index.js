function App() {

    const [displayTime, setDisplayTime] = React.useState(25*60);
    const [breakTime, setBreakTime] = React.useState(5*60);
    const [sessionTime, setSessionTime] = React.useState(25*60);
    const [timerOn, setTimerOn] = React.useState(false);

    const formatTime = (time) => {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        return ( 
            (minutes < 10 ? "0" + minutes : minutes) +
            ":" +
            (seconds < 10 ? "0" + seconds : seconds)
        );

    }

    const changeTime = (amount, type) => {
        if (type == "break") {
            if (breakTime <= 60 && amount < 0) {
                return;
            }
            setBreakTime ((prev) => prev + amount);
        } else {
            if (breakTime <= 60 && amount < 0) {
                return;
            }
            setSessionTime((prev) => prev + amount);

            if (!timerOn) {
                setDisplayTime(sessionTime + amount);
            }
        }
    }
    const controlTime = () => {

    }
    return ( 
    <div className="center-align">
        <h1>Pomodoro Clock</h1>
        <div className="dual-container">
        <Length 
            title={"break length"} 
            changeTime={changeTime} 
            type={"break"} 
            time={breakTime} 
            formatTime={formatTime}
        />

        <Length 
            title={"session length"} 
            changeTime={changeTime} 
            type={"session"} 
            time={sessionTime} 
            formatTime={formatTime}
        />
        </div>
     <h1>{formatTime(displayTime)}</h1>
     <button className="btn-large deep-purple lighten-2" onClick={controlTime}>
        {timerOn ? (
            <i className="material-icons">pause_circle_filled</i>
        ): (
            <i className="material-icons">play_circle_filled</i>
        )}
     </button>
     <button className="btn-large deep-purple lighten-2">
        <i className="material-icons">autorenew</i>
     </button>
    </div>
    );
}

function Length({title, changeTime, type, time, formatTime}) {
    return (
        <div>
            <h3>{title}</h3>
            <div className="time-sets">
                <button className="btn-small deep-purple lighten-2"
                    onClick={() => changeTime(-60, type)}
                > 
                    <i className="material-icons">arrow_downward</i>
                </button>
                <h3>{formatTime(time)}</h3>
                <button className="btn-small deep-purple lighten-2"
                onClick={() => changeTime(60, type)}
                > 
                    <i className="material-icons">arrow_upward</i>
                </button>
            </div>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));