import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import {getUnpaidLessons} from '../../../ducks/payments';

class Payments extends Component{
    componentDidMount(){
        this.props.getUnpaidLessons(this.props.match.params.user_id)
    }
    render(){
        console.log(this.props)
        return(
            <div>
                <h2>Pending Lesson Payments Here</h2>
                <div>

                </div>
                <Link to={`/dashboard/${this.props.match.params.user_id}/payment-history`}>Payment History</Link>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        payments: state.payments.unpaidPayments,
    }
}

export default connect(mapStateToProps, {getUnpaidLessons})(Payments)