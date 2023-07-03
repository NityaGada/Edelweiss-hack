import './index.css';

export default function LearningCard(props) {
    return (
        <div>
            <div className='heading'>
                <h2>{props.head}</h2>
            </div>
            <p>{props.content}</p>
        </div>
    )
}
