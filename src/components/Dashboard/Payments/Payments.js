import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import {getPaymentLessons, addToCheckout, removeFromCheckout} from '../../../ducks/payments';
import CheckOut from './Checkout';

import './Payment.css';

class Payments extends Component{
    componentDidMount(){
        this.props.getPaymentLessons(this.props.match.params.user_id)
    }
    render(){
        var total = 0;
        var tempCheckout = this.props.payments.filter( e => {
            return e.paid === 'pending'
        })
        for(let i=0; i< tempCheckout.length; i++){
            total += +tempCheckout[i].price
        }

        const unpaidList = this.props.payments.filter( e => {
            return e.paid === 'unpaid'
        }).map( (e, i) => {
            return(
                <div key={e.lesson_id} className='unpaid-list-item' onClick={() => this.props.addToCheckout(e, i)}>
                    <h3>{e.first_name} {e.price}</h3>
                </div>
            )
        })


        const checkoutList = this.props.payments.filter( e => {
            return e.paid === 'pending'
        }).map( (e, i) => {
            return(
                <div key={e.lesson_id} className='unpaid-list-item' onClick={() => this.props.removeFromCheckout(e, i)}>
                    <h3>{e.first_name} {e.price}</h3>
                </div>
            )
        })
        return(
            <div className='payment-main-container'>
                <p className='full-width-grid'>This page shows all the unpaid lessons on your account: 
                    Click on any item on the left to move it to the checkout cart on the right.
                    To remove any item from your cart click on it. Select "Pay With Card" when ready to pay.
                </p>
                <div>
                    <h2>Payments Due</h2>                         
                    <div className='list-container'>
                        {unpaidList}
                    </div>
                </div>
                <div>
                    <h2>Cart</h2>
                    <div className='list-container'>
                        {checkoutList}
                    </div>
                </div>
                <h2 className='full-width-grid' >Total: {total}</h2>
                <div  className='full-width-grid'><CheckOut amount = {total * 100}/></div>
                <Link className='full-width-grid' to={`/dashboard/${this.props.match.params.user_id}/payment-history`}>Payment History</Link>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        payments: state.payments.payments,
    }
}

export default connect(mapStateToProps, {getPaymentLessons, addToCheckout, removeFromCheckout})(Payments)