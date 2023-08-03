import { useEffect, useState } from 'react';
import './PaymentStatus.scss';
import { gql, useQuery } from '@apollo/client';

interface PaymentStatusProps {
  hasCheckedOut: boolean;
}

const PaymentStatus: React.FC<PaymentStatusProps> = ({ hasCheckedOut }) => {
  // GraphQL query to fetch orders and their payment status
  const GET_ORDERS = gql`
    {
      orders {
        id
        paymentStatus
      }
    }
  `;

  const [paymentStatus, setPaymentStatus] = useState<'paid' | 'not paid'>(
    'not paid',
  );

  const { data } = useQuery(GET_ORDERS);

  //  update the payment status when hasCheckedOut or data changes
  useEffect(() => {
    if (hasCheckedOut && data) {
      const order = data.orders[data.orders.length - 1];
      if (order) {
        // Set the payment status to the value from the fetched data
        setPaymentStatus(order.paymentStatus);
      }
    }
  }, [hasCheckedOut, data]);

  return (
    <div className="payment-status">
      <p>
        {paymentStatus === 'paid'
          ? 'Bezahlung erfolgreich'
          : 'Bezahlung wird noch bearbeitet'}
      </p>
    </div>
  );
};

export default PaymentStatus;
