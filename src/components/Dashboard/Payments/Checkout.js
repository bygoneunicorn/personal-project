import React, {Component} from 'react';
import {connect} from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import {completePayment} from '../../../ducks/payments';


class Checkout extends Component{
   render(){
       const {user_id} = this.props.user
   return(
       <div>
           <StripeCheckout
               token = {() => this.props.completePayment(user_id)}
               stripeKey = {process.env.REACT_APP_STRIPE_KEY}
               amount = {this.props.amount}
               />
       </div>
   )
}
}
function mapStateToProps(state){
    return{
        user: state.user.user
    }
}

export default connect(mapStateToProps, {completePayment})(Checkout);