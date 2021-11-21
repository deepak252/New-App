import React, { Component } from "react";
import "./NewsItem.css";
// import image from "../bg.jpg";

class NewsItem extends Component{

    render(){
        var { urlToImage, title, description, url, publishedAt, source:{name}} = this.props.news;
        return(
            <>
                <div className="card">
                    <img src={urlToImage} alt="error" />
                    <p className="source"> {name}</p>
                    <p className="published-at">{new Date(publishedAt).toGMTString()}</p>

                    <div className = "card-body">

                        <h3 className="title">
                            {title}
                        </h3>
                        <p className="description">
                            {description}
                        </p>

                        <a target="_blank" rel="noreferrer" className="read-more" href={url}>Read More</a>
                    </div>
                </div>
            </>
        );
    }
}

export default NewsItem;


