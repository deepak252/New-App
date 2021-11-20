import React, { Component } from "react";
import NewsItem from "./NewsItem";
import "./News.css";
require("dotenv").config();

class News extends Component{
    constructor(){
        super();
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
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${process.env.REACT_APP_API_KEY1}&page=${this.state.page}&pageSize=${this.state.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            loading: false,
            articles : parsedData.articles, 
            totalArticles: parsedData.totalResults
        })
    }

    handlePrev = async () => {
        this.setState({
            page: this.state.page > 1 ? this.state.page - 1 : this.state.page
        },async ()=>{
            await this.fetchNews();
        });
    }

    handleNext = async () =>{
        this.setState({
            page: this.state.page < this.state.maxPage ? this.state.page + 1 : this.state.page
        }, async () => {
            await this.fetchNews();
        });
        // await this.fetchNews();
    }
    
    async componentDidMount(){
        await this.fetchNews();
        this.setState({
            maxPage: Math.ceil(this.state.totalArticles/this.state.pageSize)
        });
        // console.log("max pages", this.state.maxPage);
        // console.log("total articles", this.state.totalArticles);
        // console.log("page size", this.state.pageSize);
    }


    render(){
        return(
            <>
                <h1 className="app-title">News App</h1>
                {
                    !this.state.loading
                    ? <div className="news-container">
                        <h5>{this.state.totalArticles} Articles</h5>
                        {
                                // this.state.articles
                                this.state.articles.map((article)=>{
                                return <NewsItem key = {article.url} news={article} />
                            })
                        }
                        <div className="btn-container">
                            <button disabled ={this.state.page <= 1} onClick={this.handlePrev} className="btn prev" >PREV.</button>
                            <span>Page : {this.state.page} ... {this.state.maxPage}</span>
                            <button disabled ={this.state.page >= this.state.maxPage} onClick={this.handleNext} className="btn next" >NEXT</button>
                        </div>
                     </div>
                    : <h4>Loading...</h4>
                }
            </>
        );
    }
}

export default News;
