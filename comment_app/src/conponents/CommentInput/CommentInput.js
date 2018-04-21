"use strict";

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';

const debug = (...args) => {
    console.log(args.reduce((x, y) => x + y + ' ', ''));
};

class CommentInput extends Component{
    static propTypes = {
        onSubmit: PropTypes.func.isRequired
    };

    constructor() {
        super();
        this.state = {
            userName: '',
            content: '',
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    componentWillMount() {
        let userName = this._loadUserName();
        if (userName) {
            this.setState({
                userName: userName
            })
        }
    }

    componentDidMount() {
        this.textarea.focus();
    }

    onSubmit(eve) {
        this.props.onSubmit({
            userName: this.state.userName,
            content: this.state.content,
            createTime: +new Date()
        });

       this.setState({
           content: ''
       });
    }

    handleUserNameChange(eve) {
        this.setState({
            userName: eve.target.value
        })
    }

    handleContentChange(eve) {
        this.setState({
            content: eve.target.value
        })
    }

    handleBlur(event) {
        this._saveUserName(event.target.value);
    }

    _saveUserName(userName) {
        localStorage.setItem('userName', userName);
    }

    _loadUserName() {
        return localStorage.getItem('userName');
    }

    render() {
        return (
            <div className={styles['comment-input']}>
                <div className={styles["comment-field"]}>
                    <label htmlFor={'uName'} className={styles["comment-field-name"]}>用户名:</label>
                    <div className={styles["comment-field-input"]}>
                        <input id={'uName'} value={this.state.userName} onChange={this.handleUserNameChange} onBlur={this.handleBlur}/>
                    </div>
                </div>
                <div className={styles["comment-field"]}>
                    <label htmlFor={'ct'} className={styles["comment-field-name"]}>评论内容:</label>
                    <div className={styles["comment-field-input"]}>
                        <textarea id={'ct'} value={this.state.content} ref={(textarea) => this.textarea = textarea} onChange={this.handleContentChange}/>
                    </div>
                </div>
                <div className={styles["comment-field-button"]}>
                    <button onClick={this.onSubmit}>
                        发布
                    </button>
                </div>
            </div>
        )
    }
}

export default CommentInput;