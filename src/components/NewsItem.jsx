import React, { Component } from "react";
import "./NewsItem.css";
// import image from "../bg.jpg";

class NewsItem extends Component{

    render(){
        return(
            <>
                <div className="card">
                    <img src={this.props.news.urlToImage} alt="error" />
                    {/* <img src={image} alt="error" /> */}
                    <h3 className = "card-heading">
                        {this.props.news.title}
                    </h3>
                    <p className = "card-description">
                        {this.props.news.description}
                    </p>
                </div>
            </>
        );
    }
}

export default NewsItem;


