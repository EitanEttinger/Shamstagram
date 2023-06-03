export function CommentForm({ comment, setComment, addStoryComment }) {
    function handleChange({ target }) {
        let { value, name } = target
        setComment(prevComment => {
            return { ...prevComment, [name]: value }
        })
    }

    return (
    <form onSubmit={addStoryComment} className='comment-add' action="#">
        <input type="text"
        name='txt' 
        className='comment-input' 
        onChange={handleChange}
        value={comment.txt}
        placeholder='Add a comment...' />
    </form>)
}