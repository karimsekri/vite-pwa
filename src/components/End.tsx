import { useParams } from "react-router-dom"
const End = () => {

    const params = useParams()

    return (
        <div> temps passé: {params.time} </div>
    )
}
export default End