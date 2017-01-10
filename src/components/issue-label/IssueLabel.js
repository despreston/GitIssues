import React, { PropTypes } from 'react';
import './IssueLabel.css';

const IssueLabel = (props) => {
	return (
    <div style={{backgroundColor: `#${props.label.color}`}} className="IssueLabel">
      {props.label.name}
    </div>
  )
};

IssueLabel.propTypes = {
	label: PropTypes.object.isRequired
};

export default IssueLabel;