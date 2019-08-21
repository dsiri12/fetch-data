import React from 'react';

import './styles.css';

function useDataFetcher(url) {
    const [posts, setPosts] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
  
    React.useEffect(() => {
      setIsLoading(true);
      fetch(url)
        .then(res => {
            if (res.ok) {
            return res.json();
            } else {
            throw Error("Error fetching posts!")
            }
        })
        .then(posts => {
          setPosts(posts);
          setIsLoading(false)
        })
        .catch(error => {
          setError(error)
        })
    }, [url]);

    return { posts, isLoading, error };
  }


function AppHooks() {
    const BASE_URL = "https://jsonplaceholder.typicode.com/posts";
    const { posts, isLoading, error } = useDataFetcher(BASE_URL);

    if (error) {
        return <p style={{ color: 'red' }}>{error.message}</p>
    }

    if (isLoading) {
        return <p>Loading posts...</p>
    }

    return (
        <div>
        <h1>App  -- Fetch Data using hooks </h1>
        {posts.map(post => (
            <>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            </>
        ))}
        </div>
        );
  }

export default AppHooks;


