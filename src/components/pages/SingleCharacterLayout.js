import './singleCharacterLayout.scss';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {Helmet} from "react-helmet";

import useMarvelService from '../../services/MarvelService';
import AppBanner from "../appBanner/AppBanner";
import setContent from '../../utils/setContent';


const SingleCharacterLayout = () => {

    const {id} = useParams();
    const [data, setData] = useState(null);
    const {process, setProcess, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateData()
    }, [id])

    const updateData = () => {
        clearError()
        getCharacter(id)
            .then(onDataLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onDataLoaded = (data) => {
        setData(data)
    }

    return (
        <>
            <AppBanner/>
            {setContent(process, View, data)}
        </>
    )
}

const View = ({data}) => {
    const {name, description, thumbnail} = data;
    return (
        <div className="single-comic">
            <Helmet>
                <meta   
                    name="description"
                    content={`${name} - character data`}
                />
                <title>{`${name} - Marvel Information Portal`}</title>
            </Helmet>
            <img src={thumbnail} alt={name} className="single-comic__char-img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
        </div>
    )
}

export default SingleCharacterLayout;