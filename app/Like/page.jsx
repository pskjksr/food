import React from "react";
import "./Like.css";

function Like() {
    return (
        <div className="container">
            <span className="like-label">&#x2b50; Like</span>
            <div className="grid">
                {Array(4).fill(null).map((_, index) => (
                    <div className="card" key={index}>
                        <img
                            src="https://via.placeholder.com/300"
                            alt="Ramen"
                        />
                        <h3>Ramen: ラーメン</h3>
                        <button className="recipe-button">Recipe</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Like;
