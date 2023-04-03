import React from 'react';
import ReactDOM from 'react-dom';
import './WishList.css';


export default class WishList extends React.Component{

    list = [];

    constructor(props){
        super(props);
        this.sortList();
        this.state = {wishlist: this.list};
        this.item = React.createRef();
        this.priority = React.createRef();
    }

    comparePriority=(a,b)=>{
        if (a.priority < b.priority)
            return -1;
        else if (a.priority === b.priority)
            return 0;
        else
            return 1;
    }

    sortList=()=>{
        this.list.sort(this.comparePriority)
    }

    addItem=()=>{
        //alert("hi");
        var newItem = {priority: this.priority.current.value, item: this.item.current.value};

        if (!newItem.priority || !newItem.item || newItem.item.trim().length === 0)
        {
            alert("Please fill valid data in both fields!");
            return;
        }

        if (newItem.priority <= 0)
        {
            alert("Priority must be positive!");
            return;
        }

        //alert(newItem.item);
        this.list.push(newItem);
        this.sortList();
        this.setState({wishlist: this.list});

        this.priority.current.value = "";
        this.item.current.value = "";
    }

    removeItem=(event)=>{
        var li = event.target.parentNode.parentNode.parentNode;
        var lbl = li.childNodes[0].childNodes[1].innerText;
        var temp = lbl.split(": ");
        var p = temp[1];
        //alert(lbl + " " + p);
        var it = li.childNodes[0].childNodes[0].innerText;
        //var arr = lbl.innerText.split(" : ");

        //alert(p+" "+it);
        for (var i = 0; i < this.list.length; i++)
        {
            if (this.list[i].priority == p && this.list[i].item == it)
            {
                //alert("hi");
                this.list.splice(i,1);
                break;
            }
        }

        this.sortList();
        this.setState({wishlist: this.list});
    }

    updatePriority=(event)=>{
        var li = event.target.parentNode.parentNode.parentNode;
        var lbl = li.childNodes[0].childNodes[1].innerText;
        var temp = lbl.split(": ");
        var p = temp[1];
        var it = li.childNodes[0].childNodes[0].innerText;

        var newpriority = prompt("Please enter the new priority:",p);

        for (var i = 0; i < this.list.length; i++)
        {
            if (this.list[i].priority == p && this.list[i].item == it)
            {
                this.list[i].priority = newpriority;
                break;
            }
        }

        this.sortList();
        this.setState({wishlist: this.list});
    }

    moveToTop=(event)=>{
        var li = event.target.parentNode.parentNode.parentNode;
        var lbl = li.childNodes[0].childNodes[1].innerText;
        var temp = lbl.split(": ");
        var p = temp[1];
        var it = li.childNodes[0].childNodes[0].innerText;

        for (var i = 0; i < this.list.length; i++)
        {
            if (this.list[i].priority == p && this.list[i].item == it)
            {
                this.list[i].priority = 1;
                var temp2 = this.list[i];
                this.list.splice(i,1);
                this.list.unshift(temp2);
                break;
            }
           /* else if (this.list[i].priority != p) // if need to update others' priority
                this.list[i].priority++;*/
        }

       // this.sortList();
        this.setState({wishlist: this.list});
    }

    render(){
        var li;
        if (this.list.length > 0)
        {
            li =  <ul id="list">{this.state.wishlist.map((list_item)=>
                <li class="listitem">
                    <div class="txt">
                        <label class="item">{list_item.item}</label>
                        <label class="priority">Priority: {list_item.priority}</label> 
                    </div>
                    <div class="btnout"><div class="btnin">
                        <button class="btn" onClick={this.removeItem}>Remove</button>
                        <button class="btn" onClick={this.updatePriority}>Edit Priority</button>
                        <button class="btn" onClick={this.moveToTop}>Move to top</button>
                    </div></div>
                </li>
            )}
            </ul>;
        }
        else
            li = <h2 id="msg">No items in wish list!</h2>;

        return(
            <div id="container">
                <h1 id="title">Wish List</h1>
                <div id = "add">
                    <h3>Add Item to List</h3>
                    <label class="lbl">Item: </label>
                    <input type="text" ref={this.item} class="tf"></input>
                    <label class="lbl">Priority: </label>
                    <input type="number" ref={this.priority} class="num"></input>
                    <button class="btn" id="addbtn" onClick={this.addItem}>Add to List</button>
                </div>
                {li}
            </div>
        );
    }
}

