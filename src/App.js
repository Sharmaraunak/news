import React ,{ useState, useEffect } from 'react';


export const App = () =>{

  const [ news,setNews ] = useState([]);
  const [ searchQuery,setSearchQuery] = useState("react");
  const [ url, setURL ] = useState('http://hn.algolia.com/api/v1/search?query=react')

  const [ loading, setLoading ] = useState(false);


  const fetchNews = () =>{

    //setLoading True
    setLoading(true);

    fetch(url)
    .then(result => result.json())
    .then(data => (setNews(data.hits),setLoading(false)))
    .catch(error => console.log(error))
  }

  useEffect( () =>{
    fetchNews();
  },[url])

  const handleChange = (event) =>{
    setSearchQuery(event.target.value);
  }

  const handleSubmit = e =>{
    e.preventDefault();
    setURL(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`);


  }

  return (
    <div>
      {loading 
      ? <h2>Loading......</h2>
      : <div>
          <h2>News</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="" id="" placeholder="Search topic" value={searchQuery} onChange={handleChange}/>
            <button type="submit">Search</button>
          </form>
          { news.map( (n,i) => (
            <p key={i}>{n.title}</p>
          ))}
      </div>
      }
      
    </div>
  );


}
