import React, { Component } from "react";
import NewsItem from "./NewsItem";
import "./News.css";
// import Articles from "./articles";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";

require("dotenv").config();

class News extends Component{
    constructor(props){
        super(props);
        this.state = {
            articles : [],
            loading: false,
            totalArticles: 0,
            page : 1,
            maxPage : 1,
            pageSize:8,
        }
    }

    async fetchNews(){
        this.setState({
            loading: true
        })
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${process.env.REACT_APP_API_KEY1}&page=${this.state.page}&pageSize=${this.state.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            loading: false,
            articles : parsedData.articles, 
            totalArticles: parsedData.totalResults
        })
    }

    async componentDidMount(){
        this.setState({
            maxPage: Math.ceil(this.state.totalArticles/this.state.pageSize)
        });
        await this.fetchNews();
    }

    fetchMoreData = async ()=>{
        this.setState({
            page: this.state.page < this.state.maxPage ? this.state.page + 1 : this.state.page
        }, async () => {
            let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${process.env.REACT_APP_API_KEY1}&page=${this.state.page}&pageSize=${this.state.pageSize}`;
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                articles: this.state.articles.concat(parsedData.articles),
                totalArticles: parsedData.totalResults
            })
        });
    }


    render(){
        return(
            <>
                {
                    !this.state.loading
                    ? <div className="news-container">
                        <h5>{this.state.totalArticles} {this.props.category} Articles</h5>
                        <InfiniteScroll
                            dataLength={this.state.articles.length}
                            next={this.fetchMoreData}
                            hasMore={this.state.articles.length!=this.state.totalArticles}
                            loader={<Spinner />}
                        >
                        {
                                this.state.articles.map((article)=>{
                                return <NewsItem key = {article.url} news={article} />
                            })
                        }
                        </InfiniteScroll>
                    </div>
                    : <Spinner />
                }
            </>
        );
    }
}

export default News;
