import React, { Component } from 'react';
import { processPayment } from '../services/paymentService';

class PaymentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: '',
            cardNumber: '',
            expiryDate: '',
            cvv: '',
            error: '',
            success: false,
        };
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const { amount, cardNumber, expiryDate, cvv } = this.state;

        if (!amount || !cardNumber || !expiryDate || !cvv) {
            this.setState({ error: 'All fields are required' });
            return;
        }

        try {
            await processPayment({ amount, cardNumber, expiryDate, cvv });
            this.setState({ success: true, error: '' });
        } catch (error) {
            this.setState({ error: 'Payment processing failed' });
        }
    };

    render() {
        const { amount, cardNumber, expiryDate, cvv, error, success } = this.state;

        return (
            <div>
                <h2>Payment Form</h2>
                {success && <p>Payment successful!</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Amount:</label>
                        <input
                            type="text"
                            name="amount"
                            value={amount}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <label>Card Number:</label>
                        <input
                            type="text"
                            name="cardNumber"
                            value={cardNumber}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <label>Expiry Date:</label>
                        <input
                            type="text"
                            name="expiryDate"
                            value={expiryDate}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <label>CVV:</label>
                        <input
                            type="text"
                            name="cvv"
                            value={cvv}
                            onChange={this.handleChange}
                        />
                    </div>
                    <button type="submit">Submit Payment</button>
                </form>
            </div>
        );
    }
}

export default PaymentForm;