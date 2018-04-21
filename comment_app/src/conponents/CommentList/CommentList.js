"use strict";

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Comment from '../Comment/Comment';
import styles from './style.scss';

const debug = (...args) => {
    console.log(args.reduce((x, y) => x + y + ' ', ''));
};

class CommentList extends Component{
    static propTypes = {
        onDelete: PropTypes.func.isRequired,
        comments: PropTypes.array
    };

    static defaultProps = {
        comments: []
    };

    constructor() {
        super();
        this.state = {

        }

        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(index) {
        this.props.onDelete(index)
    }

    render(){
        return (
            <div className={styles["comment-list"]}>
                {
                    (() => {
                        return  this.props.comments.map((ele, index) => {
                                    return <Comment key={index} comment={ele} onDelete={this.handleDelete} index={index}/>
                                })
                    })()
                }
            </div>
        )
    }
}

export default CommentList;