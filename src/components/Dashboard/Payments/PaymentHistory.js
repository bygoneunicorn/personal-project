import React, {Component} from 'react';
import {connect} from 'react-redux'
import {getPaidLessons} from '../../../ducks/payments';

class PaymentHistory extends Component{
    componentDidMount(){
        this.props.getPaidLessons(this.props.match.params.user_id)
    }
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

export default connect(mapStateToProps, {getPaidLessons})(PaymentHistory)