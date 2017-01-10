import React, { PropTypes } from 'react';
import { ReplaceLineBreaks } from '../../helpers';
import './Comment.css';

const Comment = (props) => {
  props.comment.created_at = new Date(props.comment.created_at).toLocaleString();
	return (
    <div className="Comment">
      <div className="title">
        <img src={props.comment.user.avatar_url} alt={props.comment.user.login}/>
        <span><strong>{props.comment.user.login}</strong> commented at {props.comment.created_at}:</span>
      </div>
      <div className="body">{ReplaceLineBreaks(props.comment.body)}</div>
    </div>
  );
};

Comment.propTypes = {
	comment: PropTypes.object.isRequired
};

export default Comment;