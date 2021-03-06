import React, { PropTypes } from 'react';
import Comment from '../comment/Comment';
import './CommentList.css';

function CommentList (props) {
  return (
    <div className="CommentList">
      {props.comments.map((comment, idx) => <Comment className="Comment" key={idx} comment={comment}/>)}
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.array.isRequired
};

export default CommentList;
