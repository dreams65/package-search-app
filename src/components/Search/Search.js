import React, { useState } from 'react';
import { useEffect } from 'react';
import algoliasearch from 'algoliasearch';
import ListItem from '../ListItem/ListItem';
import usePagination from '../../hooks/usePagination'

const client = algoliasearch('OJUKRLYP6T', '74a869145bc5fb70711d9e09bdbdcd6c');
const index = client.initIndex('dev_INDEX');
let objects = [];

const Search = (props) => {
    const [inputVal, setInputVal] = useState('');
    const [result, setResult] = useState([]);
    const {
        firstContentIndex,
        lastContentIndex,
        nextPage,
        prevPage,
        page,
        setPage,
        totalPages,
    } = usePagination({
        contentPerPage: 10,
        count: 100,
    });

    props.items.map(item => item.objectID = `${Math.floor(Math.random() * 1000)}`)

    useEffect(() => {
        objects = props.items;
    },[objects]);

    useEffect(() => {

        index
            .saveObjects(objects)
            .then(({ objectIDs }) => {
                console.log(objectIDs);
            })
            .catch(err => {
                console.log(err);
            });
        index
            .search(`${inputVal}`)
            .then(({ hits }) => {
                setResult(hits)
            })
            .catch(err => {
                console.log(err);
            });
    }, [inputVal])

    return (
        <div className='container'>
            <input className='search-input' onChange={e => setInputVal(e.target.value)} type="text" placeholder='Enter the name of the package' />
            <ul className='results'>
                {
                    result
                        .slice(firstContentIndex, lastContentIndex)
                        .map(el =>
                            <ListItem key={el.objectID} name={el.name} type={el.type} hits={el.hits}></ListItem>
                        )
                }
            </ul>

            <div className="pagination">
                <button onClick={prevPage} className="pagination__page">
                    &larr;
                </button>
                {/* @ts-ignore */}
                {[...Array(totalPages).keys()].map((el) => (
                    <button
                        onClick={() => setPage(el + 1)}
                        key={el}
                        className={`pagination__page ${page === el + 1 ? "pagination__page_active" : ""}`}
                    >
                        {el + 1}
                    </button>
                ))}
                <button onClick={nextPage} className="pagination__page">
                    &rarr;
                </button>
            </div>
        </div>
    )
}

export default Search;