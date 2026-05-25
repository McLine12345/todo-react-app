import { useState, useEffect } from "react"
export default function Racedata () {
    const [session, setSession] = useState(null);
    const [tyres, setTyres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [drivers, setDrivers] = useState({})
    const [currentLap, setCurrentLap] = useState(1)
    const [allLaps, setAllLaps] = useState([]);
    const [isTesting, setIsTesting] = useState(false);

     useEffect(() => {
        const getF1Data = async () => {
            try {
                setLoading(true); 
                const sessionRes = await fetch("https://api.openf1.org/v1/sessions?year=2026&session_name=Race")
                const sessions = await sessionRes.json()
                const lastSession = sessions[sessions.length - 18];
                setSession(lastSession)

                if (lastSession) {
                    const [driversRes, stintsRes, lapsRes] = await Promise.all([
                        fetch(`https://api.openf1.org/v1/drivers?session_key=${lastSession.session_key}`),
                        fetch(`https://api.openf1.org/v1/stints?session_key=${lastSession.session_key}`),
                        fetch(`https://api.openf1.org/v1/laps?session_key=${lastSession.session_key}`)
                    ])
                    const driversData = await driversRes.json();
                    const stintsData = await stintsRes.json();
                    const lapsData = await lapsRes.json();
                    
                    const driversMap = {};
                    driversData.forEach(d => {
                        driversMap[d.driver_number] = d
                    })
                setDrivers(driversMap)
                setAllLaps(lapsData);
                const latestStints = stintsData.reduce((acc, current) => {
                    acc[current.driver_number] = current;
                    return acc;
     }, {})
            setTyres(Object.values(latestStints))

                }
            } catch (error) {
                console.log("F1 pit wall error Brah", error)
            }finally{
                setLoading(false)
            }
        };
        getF1Data()
    }, []);

        useEffect(() => {
            let timer;
            if (isTesting && currentLap < 60) {
                timer = setInterval(() => {
                    setCurrentLap(prev => prev + 1);
                }, 1000)
            } return () => clearInterval(timer)},
        [isTesting, currentLap]
        )

        if (loading) return <h2 className="!text-white text-center mt-10">Fetching Paddock Data...</h2>;
            return (
            <div className="p-8"> 
            <header className="mb-10 border-b border-gray-700 pb-5">
                <div>
            <h1 className="text-4xl font-black italic !text-white uppercase tracking-tighter">
            {session?.location} <span className="text-red-600">Grand Prix</span>
            </h1>
         <p className="text-white-400 font-mono mt-2 underline">{session?.circuit_short_name}</p>
         </div>
            <div>
            <div>
            Lap: <span className="text-red-600 font-bold">{currentLap}</span>    
            </div>    
            <button onClick={() => setIsTesting(!isTesting)} className={`px-6 py-2 font-black italic uppercase transition-all ${isTesting ? `bg-white text-black` : `bg-red-600 text-white`}`}> {isTesting ? "PAUSE" : "START RACE"}</button>
            <button onClick={() => {setCurrentLap(1); setIsTesting(false)}} className="text-zinc-500 hover:text-white underline text-sm">Reset</button>
         </div>
         </header>
         <div className="grid gap-2 max-w-2xl">
        {allLaps
          .filter(lap => lap.lap_number === currentLap)
          .sort((a, b) => a.position - b.position)
          .map((lapData) => {
            const info = drivers[lapData.driver_number];
            return (
                <div key={lapData.driver_number}
                className="flex justify-between items-center bg-zinc-900 p-3 border-l-4 transition-all duration-500"
                style={{ borderColor: `#${info?.team_colour || '555'}` }}>

                    <div>
                        <span>{lapData.position}</span>
                        <div>
                            <p>{info?.last_name}</p>
                            <p>{info?.team_name}</p>
                        </div>
                    </div>
                    <div>
                        <p>{lapData.lap_duration ? `${lapData.lap_duration.toFixed(3)}s` : "PIT"}

                        </p>
                    </div>
                </div>
         );
          })}
          </div>
          </div>
            )
        }