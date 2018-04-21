"use strict";

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';

const debug = (...args) => {
    console.log(args.reduce((x, y) => x + y + ' ', ''));
};


class Comment extends Component{
    static propTypes = {
        index: PropTypes.number.isRequired,
        onDelete: PropTypes.func.isRequired,
        comment: PropTypes.object.isRequired
    };

    constructor() {
        super();
        this.state = {
            timeString: ''
        };

        this._updateTimeString = this._updateTimeString.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentWillMount() {
        this._updateTimeString();
        this._timer = setInterval(this._updateTimeString, 5000)
    }

    componentDidMount() {

    }


    componentWillUnmount() {
        clearInterval(this._timer);
    }

    _updateTimeString() {
        const createTime = this.props.comment.createTime;
        const duration = (+new Date() - createTime)  / 1000;
        this.setState({timeString: duration > 60 ? `${Math.round(duration % 60)}分钟前` : `${Math.round(Math.max(duration, 1))}秒前`});
    }

    _getProcessedContent(content) {
        return content
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;")
            .replace(/`([\S\s]+?)`/g, '<code>$1</code>')
    }

    handleDelete() {
        this.props.onDelete(this.props.index);
    }

    render() {
        return (
            <div className={styles.comment}>
                <div className={styles["comment-user"]}>
                    <span>{this.props.comment.userName} </span>：
                </div>
                <p dangerouslySetInnerHTML={{__html: this._getProcessedContent(this.props.comment.content)}}/>
                <span className={styles["comment-createdtime"]}>
                {this.state.timeString}
                </span>
                <span className={styles["comment-delete"]} onClick={this.handleDelete}>
                    删除
                </span>
            </div>
        )
    }
}

export default Comment;