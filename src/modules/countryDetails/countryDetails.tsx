import { useLayoutEffect } from 'react'
import { useParams } from 'react-router-dom'

const CountryDetails = () => {
    const params = useParams()
    useLayoutEffect(() => {
    },[])
    return (
        <div>{params.id}</div>
    )
}

export default CountryDetails