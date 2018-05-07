import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import {getUnpaidLessons, addToCheckout} from '../../../ducks/payments';
import CheckOut from './Checkout';

class Payments extends Component{
    componentDidMount(){
        this.props.getUnpaidLessons(this.props.match.params.user_id)
    }
    render(){
        var total = 0;
        var tempCheckout = this.props.readyForCheckout
        for(let i=0; i< tempCheckout.length; i++){
            total += +tempCheckout[i].price
        }
        const unpaidList = this.props.unpaidPayments.map( (e, i) => {
            return(
                <div key={e.lesson_id}>
                    <h3>{e.first_name} {e.price}</h3>
                    <button onClick={() => this.props.addToCheckout(e, i)}>Add to Cart</button>
                </div>
            )
        })
        const checkoutList = this.props.readyForCheckout.map( e => {
            return(
                <div key={e.lesson_id}>
                    <h3>{e.first_name} {e.price}</h3>
                </div>
            )
        })
        return(
            <div>
                <h2>Pending Lesson Payments Here</h2>
                <div>
                    {unpaidList}
                    <h2>Total: {total}</h2>
                    {checkoutList}
                </div>
                <CheckOut total = {total}/>
                <Link to={`/dashboard/${this.props.match.params.user_id}/payment-history`}>Payment History</Link>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        unpaidPayments: state.payments.unpaidPayments,
        readyForCheckout: state.payments.readyForCheckout
    }
}

export default connect(mapStateToProps, {getUnpaidLessons, addToCheckout})(Payments)