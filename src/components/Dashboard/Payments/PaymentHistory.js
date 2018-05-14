import React, {Component} from 'react';
import {connect} from 'react-redux'
import {getPaymentLessons} from '../../../ducks/payments';
import Moment from 'react-moment';

import './Payment.css'

class PaymentHistory extends Component{
    componentDidMount(){
        this.props.getPaymentLessons(this.props.match.params.user_id)
    }
    render(){
        const unpaidList = this.props.payments.filter( e => {
            return e.paid === 'paid'
        }).map( e => {
            return(
                <div key={e.lesson_id}>
                    <h3>{e.first_name} ${e.price}</h3>
                    <Moment format="MMM DD YYYY" date={e.date_of_lesson} />
                    <br />
                    <Moment format="hh:mm a" date={e.date_of_lesson} />
                </div>
            )
        })
        console.log(this.props)
        return(
            <div>
                <p>Payment history</p>
                <div className='payment-history-container'>                    
                    {unpaidList}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        payments: state.payments.payments,
    }
} 

export default connect(mapStateToProps, {getPaymentLessons})(PaymentHistory)