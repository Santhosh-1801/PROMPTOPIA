"use client"

import { useEffect,useState } from "react"
import PromptCard from "./PromptCard"


const PromptCardList=({data,handleTagClick})=>{
  return(
    <div className="mt-16 prompt_layout">
      {
        data.map((post)=>(
          <PromptCard key={post._id} post={post} handleTagClick={handleTagClick}></PromptCard>
        ))
      }
    </div>
  )

}


const Feeds = () => {

  const [searchText,setSearchText]=useState("");
  const [posts,setPosts]=useState([]);
  const [searchResults,setsearchResults]=useState([]);

  const handleSearchChange=(e)=>{
    e.preventDefault();
    setSearchText(e.target.value);
    searchPosts(e.target.value);


  }
  const handleTagClick=(tagName)=>{
    setSearchText(tagName);
    searchPosts(tagName);
  }

  
  const searchPosts = (text) => {
    const regex = new RegExp(text, "i"); // 'i' flag for case-insensitive search
    const searchResult = posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
    setsearchResults(searchResult);
  };

  useEffect(()=>{
    const fetchPosts=async()=>{
      const response=await fetch('/api/prompt');
      const data=await response.json();
      console.log(data);
      setPosts(data)
    }
    fetchPosts()
    console.log(posts)
  },[])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input type="text" placeholder="Search for tag or username" value={searchText} onChange={handleSearchChange} required className="search_input peer"/>
      </form>
      {searchText ? (
        <PromptCardList
          data={searchResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  )
}

export default Feeds