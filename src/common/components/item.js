let propTypes ={
    todo: PT.object,
    onDelete: PT.func,
    onToggle: PT.func
}

export default class Item extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        let {todo, onDelete, onToggle} = this.props;
        return(
            <li>
                <div className="view">
                    <input type="checkbox" className="toggle"
                           checked={todo.hasCompleted}
                        onChange={ev => {onToggle(todo)}}
                    />
                    <label>
                        {todo.value}
                    </label>
                    <button className="destroy" onClick={(event) => onDelete(todo)}></button>
                    <input type="text" className="edit" />
                </div>
            </li>
        )
    }
}

Item.prototypes = propTypes;