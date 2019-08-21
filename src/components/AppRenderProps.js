import React from 'react';

import './styles.css';

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

class DataFetcher extends React.Component {
  state = {
    isLoading: false,
    error: null,
    posts: []
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch(this.props.url)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw Error("Error fetching posts!")
        }
      })
      .then(posts => {
        console.log(posts);
        this.setState({ posts, isLoading: false });
      })
      .catch(error => this.setState({ 
       error:error }))
  }

  render() {
    return this.props.children(this.state);
  }
}

class AppRenderProps extends React.Component {
  render() {
    return (
      <div>
        <h1>With Render Props</h1>
        <DataFetcher url={BASE_URL}>
          {({isLoading, error, posts}) => {
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
          }}
        </DataFetcher>
      </div>
    )
  }
}

export default AppRenderProps;


