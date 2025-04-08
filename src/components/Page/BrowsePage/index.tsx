import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { addDays, format } from 'date-fns';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'basicui';
import './style.scss';
import ReceiptModel from '../../../model/ReceiptModel';
import ExpenseModel from '../../../model/ExpenseModel';
import BillDetails from './BillDetails';
import ExpenseItems from './ExpenseItems';
import { newId } from '../../../events/MessageService';
import { isEmptyAttributes, isEmptyOrSpaces } from '../../Utils';
import { saveBill, getBillById } from './service';
import {
  NEURALWEB_PREF_ADDBILL_ANOTHER,
  NEURALWEB_PREF_ADDBILL_DATE,
} from '../../../constants/SessionStorageConstants';
import Topbar from '../../Topbar';
import { updateExpenseItems } from '../../../store/actions/ExpenseActions';
import { updateReceiptItems } from '../../../store/actions/ReceiptActions';
import { useSearchParams } from 'react-router-dom';

const EMPTY_EXPENSE: ExpenseModel = {
  amount: undefined,
  billDate: '',
  category: '',
  description: '',
  tagId: [],
};

const EMPTY_BILL: ReceiptModel = {
  billDate: format(new Date(), 'yyyy-MM-dd'),
  items: [{ ...EMPTY_EXPENSE }],
  number: '',
  total: 0,
  description: '',
};

interface Props {
  space: string;
  location: any;
}

const BrowsePage = (props: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);

  useEffect(() => {
    if (authorization.isAuth) {
    }

  }, [authorization]);

  return (
    <div className="browse-page page-animate">
      <Topbar title="Browse">right</Topbar>
      <div className="browse-page__main main-section">
        <div className="content-section">
          Content</div>
      </div>
    </div>
  );
};

export default BrowsePage;
