import React from 'react';

import './styles.css';

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

class App extends React.Component {
  state = {
    isLoading: false,
    error: null,
    posts: []
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch(BASE_URL)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw Error("Error fetching posts!123")
        }
      })
      .then(posts => {
        console.log(posts);
        this.setState({ posts, isLoading: false });
      })
      .catch(error => this.setState({ 
       error }))
  }

render() {
  const { error, isLoading, posts } = this.state;

  if (error) {
    return <p style={{ color: 'red' }}>{error.message}</p>
  }

  if (isLoading) {
    return <p>Loading posts...</p>
  }

  return (
    <div>
      <h1>App  -- Fetch Data using state </h1>
      {posts.map(post => (
        <>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </>
      ))}
    </div>
    );
  }
}

export default App;


