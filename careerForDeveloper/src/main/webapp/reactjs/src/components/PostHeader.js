import { Link } from 'react-router-dom';
import './PostHeader.css'

const PostHeader = props => {
    const { headersName, children } = props;

    return (
        <div className="voc-header">
            <h2 align="left">게시판</h2>
            <Link to="/posts/new">
                <button align="right" className="voc-view-go-list-btn">
                    게시글 작성
                </button>
            </Link>
        </div>
    )
}

export default PostHeader;