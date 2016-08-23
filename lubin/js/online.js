var Board=React.createClass({
    getInitialState: function () {
        return {messages:['你好，我想问一下你家的集装箱都有哪些种类？','你好，我现在急需一批集装箱，想问一下你家批量生产产能是多少？','我只关心质量，是要质量好，价钱好商量！']};
    },
    handleClick: function (event) {
        return  event.target.value='';
    },
    addMsg: function () {
        var message=document.querySelector('#txtMsg').value;
        var messages=this.state.messages;
        messages.push(message);
        localStorage.setItem('messages',JSON.stringify(this.state.messages))
        this.setState({messages:messages})
    },
    render: function () {
        return <div className="panel panel-success">
            <div className='panel-heading'>
            <div className='row'>
            <div className='col-xs-8'>
            <input type="text" defaultValue={this.props.msg} className='form-control' id="txtMsg"  onClick={this.handleClick}/>
        </div>
        <div className='col-xs-4'>
            <button onClick={this.addMsg} className='btn btn-primary'>留言</button>
            </div>
            </div>
            </div>
            <div className='panel-body'>
            <ul className='list-group'>
            {
                this.state.messages.map(function (item,index) {
                return <li className='list-group-item' key={index}>{item}</li>
            })
    }
        </ul>
        </div>
        </div>
    }
});
var data={
    msg:'请留言',
    messages:localStorage.getItem('message')?JSON.parse(localStorage.getItem('message')):[]
};
ReactDOM.render(
<Board  {...data}/>,
document.getElementById('app')
);
