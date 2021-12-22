import $ from 'jquery';
import { Link, useParams } from "@reach/router";
import React, { useEffect, useState } from "react";

const Posts = () => {
  const { user } = useParams()
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://twitter-api.shivambang.workers.dev/posts")
    .then(resp => 
      resp.json()
      .then(pr => setPosts(pr)))
  const interval = setInterval(() => (
      fetch("https://twitter-api.shivambang.workers.dev/posts")
      .then(resp => 
        resp.json()
        .then(pr => setPosts(pr)))
    ), 1000*60);
    return () => {
      clearInterval(interval);
    };
    }, []);

  return (
    <div class="container m-3">
      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <h4>{user}</h4>
        <Link to="/"><button class="btn btn-primary btn-sm" type="button">Logout</button></Link>
      </div>      
      <div class="card m-3 p-3">
        <h5 class="card-header">New Post</h5>
        <div class="card-body">
          <form
          onSubmit={(e) => {
            e.preventDefault();   
            $.ajax({
            url: 'https://twitter-api.shivambang.workers.dev/posts',
            type: 'post',
            data: $(e.target).serialize(),
            success: function(resp){
                alert("Success!\nNote: The changes are reflected after a minute.");
                console.log(resp)
            },
            error: function(xhr, resp, text) { 
              alert("Error: " + text); 
            }             
            });
          }} 
          >
          <input type="text" readonly class="form-control-plaintext" id="uid" name="uid" value={user}/>
          <textarea type="text" class="form-control mb-3" id="content" name="content"/>
          <button type="submit" class="btn btn-primary mb-3 float-end">Submit</button>
          </form>
        </div>
      </div>
      {console.log(posts)}
      <h2>Popular</h2>
      {posts.map((post) => ( post != null && 
          <div class="card m-3 p-3" key={post.id}>
            <h5 class="card-header">{post.uid}</h5>
            <div class="card-body">
              <p class="card-text">{post.content}</p>
              <div class="row">
              <form class="form-inline col-auto"
                onSubmit={(e) => {
                  e.preventDefault();    
                  $.ajax({
                  url: 'https://twitter-api.shivambang.workers.dev/upvote',
                  type: 'post',
                  data: $(e.target).serialize(),
                  success: function(resp){
                      alert("Success!\nNote: The changes are reflected after a minute.");
                      console.log(resp)
                  },
                  error: function(xhr, resp, text) { 
                    alert("Error: " + text); 
                  }             
                  });
                }} 
                >
                <input type="hidden" readonly class="form-control-plaintext" id="id" name="id" value={post.id}/>
                <button type="submit" class="btn btn-outline-success btn-sm">
                <i class="bi bi-arrow-up"></i>
                </button>
              </form>
              <span class="col-auto">{`\t${post.votes}\t`}</span>
              <form class="form-inline col-auto"
                onSubmit={(e) => {
                  e.preventDefault();    
                  $.ajax({
                  url: 'https://twitter-api.shivambang.workers.dev/downvote',
                  type: 'post',
                  data: $(e.target).serialize(),
                  success: function(resp){
                      alert("Success!\nNote: The changes are reflected after a minute.");
                      console.log(resp)
                  },
                  error: function(xhr, resp, text) { 
                    alert("Error: " + text); 
                  }             
                  });
                }} 
                >
                <input type="hidden" readonly class="form-control-plaintext" id="id" name="id" value={post.id}/>
                <button type="submit" class="btn btn-outline-danger btn-sm">
                <i class="bi bi-arrow-down"></i>
              </button>
              </form>
              <a href="#" class="btn btn-outline-primary col-auto ms-auto" data-bs-toggle="collapse" href={`#comments-${post.id}`} role="button" aria-expanded="false" aria-controls={`comments-${post.id}`}>Comments</a>
              </div>
            </div>
            <div class="collapse" id={`comments-${post.id}`}>
              <div class="card card-body">
                <form class="row g-3"
                onSubmit={(e) => {
                  e.preventDefault();    
                  $.ajax({
                  url: 'https://twitter-api.shivambang.workers.dev/comment',
                  type: 'post',
                  data: $(e.target).serialize(),
                  success: function(resp){
                      alert("Success!\nNote: The changes are reflected after a minute.");
                      console.log(resp)
                  },
                  error: function(xhr, resp, text) { 
                    alert("Error: " + text); 
                  }             
                  });
                }} 
                >
                <input type="hidden" readonly class="form-control-plaintext" id="id" name="id" value={post.id}/>
                <input type="hidden" readonly class="form-control-plaintext" id="uid" name="uid" value={user}/>

                  <div class="col-auto flex-fill">
                    <input type="text" class="form-control" id="comment" name='comment' placeholder="Comment"/>
                  </div>
                  <div class="col-auto">
                    <button type="submit" class="btn btn-primary mb-3">Submit</button>
                  </div>
                </form>
              </div>
              
              {post.comments.map((c) => (
              <div class="card m-3">  
              <h5 class="card-header">{c.uid}</h5>
              <div class="card-body">
                <p class="card-text">{c.comment}</p>
              </div>
              </div>
              ))}
            </div>
          </div>        
      )).sort((a, b) => a.votes > b.votes ? 1 : -1)}
    </div>
  );
};

export default Posts;