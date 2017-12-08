let propTypes ={
    clearCompleted: PT.func,
    leftCount: PT.number,
    showClearButton: PT.bool
}

export default class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {leftCount, showClearButton, clearCompleted} = this.props;

        let clearBtn = null;

        if(showClearButton) {
            clearBtn = (
                <button className="clear-completed" onClick={clearCompleted}>
                    clear all completed
                </button>
            );
        }

        return(
            <footer className="footer">
                <span className="todo-count">
                    <strong>{leftCount}</strong>
                    <span>item left</span>
                </span>
                <ul className="filters">
                    <li>
                        <a href="#/all">All</a>
                    </li>
                    <li>
                        <a href="#/all">Active</a>
                    </li>
                    <li>
                        <a href="#/all">Completed</a>
                    </li>
                </ul>
                {clearBtn}
            </footer>
        )
    }
}

Footer.prototypes = propTypes;