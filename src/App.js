import React from 'react';
import './index.scss';
import Collection from './Collection';

const categorys = [
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Горы" },
  { "name": "Архитектура" },
  { "name": "Города" }
]
function App() {
  const [collection, setCollection] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [page, setPage] = React.useState(1)
  const [searh, setSearch] = React.useState('')
  const [category, setCategory] = React.useState(0)
  React.useEffect(() => {
    setIsLoading(true)
    const categoryId = category ? `category=${category}`: ''
    fetch(`https://63454359dcae733e8fed9d44.mockapi.io/photos?page=${page}&limit=3&${categoryId}`)
    .then(result => result.json())
    .then(json => {
      setCollection(json)
    })
    .catch(err => {
      console.warn(err)
      alert('Error!')
    }).finally(() => {
      setIsLoading(false)
    })
  }, [category, page])
  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {categorys.map((key, i) => <li className={category === i ? 'active' : ''}
          key = {key.name} onClick={() => setCategory(i)}>{key.name}</li>)}
        </ul>
        <input value = {searh} onChange = {(e) => setSearch(e.target.value)} className="search-input" placeholder="Поиск по названию" />
      </div>
      <div className="content">
        {
         isLoading ? <h2>Loading...</h2> :  collection.filter((key) => {
          return key.name.toLowerCase().includes(searh.toLowerCase())
        }).map((key, index) => (
          <Collection
        key={index}
        name={key.name}
        images={key.photos}
      />
        ))
        }
      </div>
      <ul className="pagination">
        {
          [...Array(5)].map((_,i)=> <li onClick={() => setPage(i + 1)} className={page === (i + 1) ? 'active' : ''} >{i + 1}</li>)
        }
      </ul>
    </div>
  );
}

export default App;