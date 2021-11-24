import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import "./News.css";
// import Articles from "./articles";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";

require("dotenv").config();

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalArticles, setTotalArticles] = useState(0);
    const [page, setPage] = useState(1);
    const [maxPages, setMaxPages] = useState(1);
    const [pageSize,setPageSize]= useState(8);

    const fetchNews = async () => {
        setLoading(true);

        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${process.env.REACT_APP_API_KEY1}&page=${page}&pageSize=${pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(parsedData.articles);
        setTotalArticles(parsedData.totalResults);
        setMaxPages(Math.ceil(parsedData.totalResults / pageSize));
        setPage(page + 1);

        console.log("fetchNews parsedData.totalResults=", parsedData.totalResults);
        console.log("fetchNews page=", page);
        console.log("fetchNews maxPages=", maxPages);
        console.log("fetchNews totalArticles=", totalArticles);

        setLoading(false);
    }
    useEffect( ()  => {
        fetchNews();
        
    },[]);

    // async componentDidMount(){
    //     this.setState({
    //         maxPages: Math.ceil(totalArticles/pageSize)
    //     });
    //     await this.fetchNews();
    // }

    const fetchMoreData = async () => {
        // setPage(page < maxPages ? page + 1 : page);
        setPage(page < maxPages ? page + 1 : page);
        console.log("fetchMoreData page=",page);
        console.log("fetchMoreData maxPages=", maxPages);
        console.log("fetchMoreData totalArticles=", totalArticles);
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${process.env.REACT_APP_API_KEY1}&page=${page}&pageSize=${pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setTotalArticles(parsedData.totalResults);
    }


    return (
        <>
            {
                !loading
                    ? <div className="news-container">
                        <h5>{totalArticles} {props.category} Articles</h5>
                        <InfiniteScroll
                            dataLength={articles.length}
                            next={fetchMoreData}
                            hasMore={articles.length !== totalArticles}
                            loader={<Spinner />}
                        >
                            {
                                articles.map((article) => {
                                    return <NewsItem key={article.url} news={article} />
                                })
                            }
                        </InfiniteScroll>
                    </div>
                    : <Spinner />
            }
        </>
    );
}

export default News;
