import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";


const son = new Audio('/son.wav');


const Game = () => {
    const [nbreClic, setnbreClic] = useState(0)
    const [top, setTop] = useState(0)
    const [left, setLeft] = useState(0)
    const [tempsDebut, setTempsDebut] = useState(Date.now())
    const [accumulateur, setAccumulateur] = useState(0)
    const [pause, setPause] = useState(false)
    const [city, setCity] = useState('')
    


    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null)
    const navigate = useNavigate()


    const getCity = async (url: string)  => {
        
        const response = await fetch(url)
        const data = await response.json()
        console.log("data", data.city);
        setCity(data.city)

    }


    useEffect(() => {
        const id = setInterval(() => setAccumulateur(Date.now() - tempsDebut), 120)
        setIntervalId(id)
        navigator.geolocation.getCurrentPosition((position) => {         

            const latitude = position.coords.latitude
            const longitude = position.coords.longitude
            const jsonLocation = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`

            getCity(jsonLocation)          
        })
    }, []);

    const showNotification = useCallback(() => {

        Notification.requestPermission().then(function (result) {

            if (result === 'granted') {
                new Notification('Partie terminée', {
                    body: `Ceci est une notification`
                });
            }
        });

    }, []);


    const incrementerConteurcompteur = useCallback(() => {
        if (pause === false) {

            son.pause()
            son.currentTime = 0
            son.play()

            window.navigator.vibrate([1000, 100, 1000])


            const elapsedTime = Date.now() - tempsDebut
            if (nbreClic === 2) {
                clearInterval(intervalId!)
                showNotification()
                navigate("/end/" + elapsedTime)

            }
            else {
                let topCss = Math.floor(Math.random() * (90));
                let leftCss = Math.floor(Math.random() * (90));
                setTop(topCss)
                setLeft(leftCss)
                setnbreClic(nbreClic + 1)
            }
        }
        else {
            alert("la partie est en pause")
        }
    }, [top, left, nbreClic, showNotification, pause]);


    const pauseHandler = useCallback(() => {

        if (pause === true) {
            son.pause()
            clearInterval(intervalId!)
            console.log(pause);
            setAccumulateur(accumulateur + (Date.now() - tempsDebut))

        }
        else {

            setTempsDebut(Date.now())

        }
        setPause(!pause)

    }, [son, intervalId, pause, accumulateur, tempsDebut, setAccumulateur]);



    //------------------  Install App ---------------



    //-----------------------------------------------



    return (
        <div className="game_container">
            <div className="compteurTemps">Temps : {(accumulateur) / 1000}</div>
            <div className="game_nbreClic">Nombre de click : {nbreClic}</div>
            <div>Ville :{city}</div>
            <button id="btnPause" onClick={pauseHandler}>Pause</button>
            {/* <button id="installApp" onClick={installApp}>Installer</button> */}
            <div className="game" style={{ top: top + '%', left: left + '%' }} onClick={incrementerConteurcompteur}></div>
        </div>
    )
}
export default Game