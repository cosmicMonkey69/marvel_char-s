import {useHttp} from '../hooks/http.hook'

const useMarvelService = () => {

    const {request, clearError, process, setProcess} = useHttp()

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    const _apiKey = 'apikey=2843e6dfca0578c39b03b4b837002b34'
    const _baseOffset = 210

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformCharacter)
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`)
        return _transformCharacter(res.data.results[0])
    }

    const getAllComics = async (offset = 0) => {
        const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformComic)
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`)
        return _transformComic(res.data.results[0])
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const _transformComic = (comic) => {
        return {
            id: comic.id,
            title: comic.title,
            price: comic.prices.price ? `${comic.prices.price}$` : 'not available',
            description: comic.description ? comic.description.slice(0, 300) : 'No description',
            pageCount: comic.pageCount>0 ? comic.pageCount+' pages' : 'Numbers of pages unknown',
            language: comic.textObjects.length>0 ? comic.textObjects[0].language : 'language unknown',
            thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension
        }
    }

    return {getAllCharacters, getCharacter, clearError, getAllComics, getComic, getCharacterByName, process, setProcess}
}

export default useMarvelService