import './comicsList.scss';
import useMarvelService from '../../services/MarvelService';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const ComicsList = () => {

    const {loading, error, getAllComics} = useMarvelService()
    const [comics, setComics] = useState([])
    const [offset, setOffset] = useState(0)
    
    useEffect(() => {
        onRequest(offset)
    }, [])

    const onRequest = (offset) => {
        getAllComics(offset)
            .then(onComicsListLoaded)
    }

    const onComicsListLoaded = newComics => {
        setComics([...comics, ...newComics])
        setOffset(offset+8)
    }

    function renderItems (arr) {
        const items = arr.map((item, i) => {
            return (
                <li className="comics__item" key={i}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt="x-men" className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(comics)
    
    return (
        <div className="comics__list">
            {error ? <ErrorMessage/> : null}
            {items}
            {loading ? <Spinner/> : null}
            <button className="button button__main button__long">
                <div className="inner" onClick={() => onRequest(offset)}>load more</div>
            </button>
        </div>
    )
}

export default ComicsList;