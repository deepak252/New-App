import React, { Component } from "react";
import NewsItem from "./NewsItem";
import "./News.css";
// import Articles from "./articles";


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
    }
    
    async componentDidMount(){
        this.setState({
            maxPage: Math.ceil(this.state.totalArticles/this.state.pageSize)
        });
        await this.fetchNews();
    }


    render(){
        return(
            <>
                {
                    !this.state.loading
                    ? <div className="news-container">
                            <h5>{this.state.totalArticles} {this.props.category} Articles</h5>
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
                    : <h4 className="loading">Loading...</h4>
                }
            </>
        );
    }
}

export default News;
