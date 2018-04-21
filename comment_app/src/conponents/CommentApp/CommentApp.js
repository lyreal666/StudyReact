"use strict";

import React, {Component} from 'react';
import CommentInput from '../CommentInput/CommentInput';
import CommentList from '../CommentList/CommentList';
import styles from './style.scss';

const debug = (...args) => {
    console.log(args.reduce((x, y) => x + y + ' ', ''));
};

class CommentApp extends Component{
    constructor(props) {
        super(props);
        this.state = {
            comments: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentWillMount() {
        let comments = this._loadComments();
        if (comments) {
            this.setState({
                comments: comments
            })
        }
    }

    handleSubmit(comment) {
        this.state.comments.push(comment);
        this.setState({
            comments: this.state.comments
        });
        this._saveComments(this.state.comments)
    }

    handleDelete(index) {
        const comments = this.state.comments;
        comments.splice(index, 1);
        this.setState({
            comments: comments
        });
        this._saveComments(this.state.comments)
    }

    _saveComments(comments) {
        localStorage.setItem('comments', JSON.stringify(this.state.comments));
    }

    _loadComments() {
        return JSON.parse(localStorage.getItem('comments'));
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <CommentInput onSubmit={this.handleSubmit}/>
                <CommentList comments={this.state.comments} onDelete={this.handleDelete}/>
            </div>
        )
    }


}

export default CommentApp;