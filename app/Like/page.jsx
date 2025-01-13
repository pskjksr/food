import React from "react";

const RecipeCard = ({ image, title, buttonText }) => {
  return (
    <div style={{ 
      width: "200px", 
      padding: "16px", 
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)", 
      borderRadius: "8px", 
      textAlign: "center",
      backgroundColor: "#fff"
    }}>
      <img 
        src={image} 
        alt={title} 
        style={{
          width: "100%", 
          borderRadius: "8px",
          marginBottom: "8px"
        }}
      />
      <h3 style={{
        fontSize: "16px", 
        fontWeight: "bold", 
        margin: "8px 0"
      }}>
        {title}
      </h3>
      <button style={{
        padding: "8px 16px",
        backgroundColor: "#FFC107",
        border: "none",
        borderRadius: "4px",
        color: "#fff",
        cursor: "pointer",
        fontWeight: "bold"
      }}>
        {buttonText}
      </button>
    </div>
  );
};

const RecipeGrid = () => {
  const recipes = [
    { image: "/path/to/ramen.jpg", title: "Ramen: ラーメン", buttonText: "RECIPE" },
    { image: "/path/to/ramen.jpg", title: "Ramen: ラーメン", buttonText: "RECIPE" },
    { image: "/path/to/ramen.jpg", title: "Ramen: ラーメン", buttonText: "RECIPE" },
    { image: "/path/to/ramen.jpg", title: "Ramen: ラーメン", buttonText: "RECIPE" },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <h2 style={{
        fontWeight: "bold", 
        fontSize: "18px", 
        marginBottom: "16px", 
        display: "flex", 
        alignItems: "center",
        color: "#000"
      }}>
        <span style={{
          width: "8px", 
          height: "8px", 
          backgroundColor: "#FFC107", 
          borderRadius: "50%", 
          display: "inline-block", 
          marginRight: "8px"
        }}></span>
        Like
      </h2>
      <div style={{
        display: "flex", 
        gap: "16px", 
        flexWrap: "wrap", 
        justifyContent: "center"
      }}>
        {recipes.map((recipe, index) => (
          <RecipeCard 
            key={index} 
            image={recipe.image} 
            title={recipe.title} 
            buttonText={recipe.buttonText} 
          />
        ))}
      </div>
    </div>
  );
};

export default RecipeGrid;
