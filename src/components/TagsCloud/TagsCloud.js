import React from "react";

const TagsCloud = ({tags,tagsRemoveAction}) => {

    let Tags;

    if (tags) {
        Tags = tags.map(tag =>
            <div className={'tag'}>
                <span style={{fontSize:"10px", fontWeight: 600, padding:'10px'}}>{tag}</span>
                <button className={'tagDeleteButton'} onClick={()=>tagsRemoveAction(tag)}>X</button>
            </div>
        )
    }

    return (
        <div className={'tagCloud'}>
            {Tags}
        </div>
    )
};

export default TagsCloud;
