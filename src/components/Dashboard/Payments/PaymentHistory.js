import React, {Component} from 'react';
import {connect} from 'react-redux'

class PaymentHistory extends Component{
    render(){
        console.log(this.props)
        return(
            <div>
                <p>Payment history</p>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        paidPayments: state.payments.paidPayments,
    }
}

export default connect(mapStateToProps)(PaymentHistory)