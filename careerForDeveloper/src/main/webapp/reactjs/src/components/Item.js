import React, { useState } from 'react';

function Item({ item }) {
    return (
        <div>
            <span>{item.title}</span>
            <span>{item.nickname}</span>
            <span>{item.commentCount}</span>
        </div>
    );
}

export default Item;