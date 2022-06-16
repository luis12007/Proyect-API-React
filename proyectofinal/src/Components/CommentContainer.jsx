import React from "react";

const CommentCardContainer = (props) => {// seccion para los comentarios
    return (
        <div className="py-2">
            <h1 className="font-bold text-lg text-blue-600">{props.username}:</h1>
            <p>{props.description}</p>
        </div>
    )
}

export default CommentCardContainer;