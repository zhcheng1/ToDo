import Item from './common/components/item';
import Footer from './common/components/footer';

require('./common/style/base.css');
require('./common/style/index.css');

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todosData: [],
            inputVal: ''
        };
        this.handleInput = this.handleInput.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.clearCompleted = this.clearCompleted.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.toggleAll = this.toggleAll.bind(this);
        this.onToggle = this.onToggle.bind(this);
    }

    inputChange(event) {
        this.setState({
            inputVal: event.target.value
        })
    }

    handleInput(event) {
        if(event.keyCode != 13) {
            return;
        }

        let {inputVal} = this.state;
        let value = inputVal.trim();

        if(value=='') {
            return;
        }

        let todo={};
        todo.id = new Date().getTime();
        todo.value = value;
        todo.hasCompleted = false;

        let {todosData} = this.state;

        todosData.push(todo);

        this.setState({
            todosData,
            inputVal: ""
        });
    }

    onDelete(todo) {
        let todosData = this.state.todosData;
        todosData = todosData.filter((el) =>{
            return todo.id != el.id; // true delete
        });
        this.setState({todosData});
    }

    toggleAll(event) {
        let {checked} = event.target;
        let{todosData} = this.state;
        todosData.map((el)=> {
            el.hasCompleted = checked;
            return el;
        });

        this.setState({todosData});
    }

    onToggle(todo) {
        let {todosData} = this.state;
        todosData.map((el)=> {
            if(el.id = todo.id) {
                el.hasCompleted = !el.hasCompleted;
            }
            return el;
        });
        this.setState({todosData});
    }

    clearCompleted() {
        let {todosData} = this.state;
        todosData = todosData.filter((el) =>{
            return !el.hasCompleted;
        });
        this.setState({todosData});
    }

    render() {
        let {inputChange, handleInput, onDelete, clearCompleted, toggleAll, onToggle} = this;

        let {todosData, inputVal} = this.state;

        let items = null,
        footer = null,
        itemBox = null;

        let leftCount = todosData.length;


        items = todosData.map((el, i)=>{
            if(el.hasCompleted) {
                leftCount--;
            }
            return (
                <Item onDelete={onDelete} todo={el} onToggle={onToggle}
                    key={i}
                />
            );
        });

        if(todosData.length) {
            itemBox = (
                <section className="main">
                    <input type="checkbox" className="toggle-all"
                           checked={leftCount == 0}
                           onChange={toggleAll}
                    />
                    <ul className="todo-list">
                        {items}
                    </ul>
                </section>
            )
            footer = (<Footer
                {...{
                    leftCount,
                    showClearButton: leftCount < todosData.length,
                    clearCompleted
                }}
            />)
        }

        return(
            <div>
                <header className="header">
                    <h1>todos</h1>
                    <input type="text" className="new-todo"
                           value={inputVal}
                           onChange={inputChange}
                           onKeyDown={handleInput}/>
                </header>
                {itemBox}
                {footer}
            </div>
        )
    }
}

const app = document.getElementById('app');
ReactDOM.render(

        <div>
            <App></App>
        </div>,
    app);

if (module.hot) {
    module.hot.accept();
}

