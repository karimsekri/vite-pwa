import { useCallback, useEffect,  useState } from "react"
import { useNavigate } from "react-router-dom";


const son = new Audio('/son.wav');

const Game = () => {
    const [nbreClic, setnbreClic] = useState(0)
    const [top, setTop] = useState(0)
    const [left, setLeft] = useState(0)
    const [tempsDebut] = useState(Date.now())
    const [_, setTempsPasser] = useState(0)
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null)
    const navigate = useNavigate()

   
    


    useEffect(() => {
        const id = setInterval(() => setTempsPasser(Date.now() - tempsDebut), 120)
        setIntervalId(id)
    }, []);

    const incrementerConteurcompteur = useCallback(() => {
        
        son.pause()
        son.currentTime = 0
        son.play()

        window.navigator.vibrate([1000,100,1000])

        const elapsedTime = Date.now() - tempsDebut
        if (nbreClic === 2) {
            clearInterval(intervalId!)
            navigate("/end/" + elapsedTime)
        }
        else {
            let topCss = Math.floor(Math.random() * (90));  
            let leftCss = Math.floor(Math.random() * (90));
            setTop(topCss)
            setLeft(leftCss)
            setnbreClic(nbreClic + 1)
        }
    }, [top, left, nbreClic]);

    return (
        <div className="game_container">
            <div className="compteurTemps">Temps : {(Date.now() - tempsDebut) / 1000}</div>
            <div className="game_nbreClic">Nombre de click : {nbreClic}</div>
            <div className="game" style={{ top: top + '%', left: left + '%' }} onClick={incrementerConteurcompteur}></div>
        </div>
    )
}
export default Game