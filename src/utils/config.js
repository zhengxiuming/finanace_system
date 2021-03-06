module.exports = {
  openPages: ['/login'],
  footerText: 'Finance System  © 2018 linkpet.com.cn',
  menu: [{
    key: '1',
    pathname: '/accountSum',
    icon: 'bank',
    title: '账户汇总'
  }, {
    key: '2',
    pathname: '/recordedDetail',
    icon: 'bars',
    title: '入账明细'
  }, {
    key: '3',
    pathname: '/staySettleSum',
    icon: 'database',
    title: '待结算汇总'
  }, {
    key: '4',
    pathname: '/staySettleDetail',
    icon: 'schedule',
    title: '待结算明细'
  }, {
    key: '5',
    pathname: '/settlePayDetail',
    icon: 'profile',
    title: '结算支出明细'
  }],
  tableColumns: {
    accountDetail: [{
      title: '订单号',
      dataIndex: 'order_id',
      key: 'order_id'
    }, {
      title: '交易流水号',
      dataIndex: 'trade_num',
      key: 'trade_num'
    }, {
      title: '相关产品',
      dataIndex: 'product',
      key: 'product'
    }, {
      title: '医院编号',
      dataIndex: 'hospital_num',
      key: 'hospital_num'
    }, {
      title: '医院名称',
      dataIndex: 'hospital_name',
      key: 'hospital_name'
    }, {
      title: '医院省份',
      dataIndex: 'hospital_area',
      key: 'hospital_area'
    }, {
      title: '医院城市',
      dataIndex: 'hospital_province',
      key: 'hospital_province'
    }, {
      title: '经销商',
      dataIndex: 'business',
      key: 'business'
    }, {
      title: '经销商区域',
      dataIndex: 'business_area',
      key: 'business_area'
    }, {
      title: '产品总价',
      dataIndex: 'price',
      key: 'price'
    }, {
      title: '实付金额',
      dataIndex: 'pay_price',
      key: 'pay_price'
    }, {
      title: '返点金额',
      dataIndex: 'rebate_price',
      key: 'rebate_price'
    }, {
      title: '手续费',
      dataIndex: 'charge',
      key: 'charge'
    }, {
      title: '支付方式',
      dataIndex: 'pay_type',
      key: 'pay_type'
    }, {
      title: '生成时间',
      dataIndex: 'add_time',
      key: 'add_time'
    }, {
      title: '支付时间',
      dataIndex: 'pay_time',
      key: 'pay_time'
    }],
    staySettleDetail: [
      {
        title: '订单号',
        dataIndex: 'order_id',
        key: 'order_id'
      }, {
        title: '交易流水号',
        dataIndex: 'trade_num',
        key: 'trade_num'
      }, {
        title: '相关产品',
        dataIndex: 'product',
        key: 'product'
      }, {
        title: '医院编号',
        dataIndex: 'hospital_num',
        key: 'hospital_num'
      }, {
        title: '医院名称',
        dataIndex: 'hospital_name',
        key: 'hospital_name'
      }, {
        title: '医院省份',
        dataIndex: 'hospital_area',
        key: 'hospital_area'
      }, {
        title: '医院城市',
        dataIndex: 'hospital_province',
        key: 'hospital_province'
      }, {
        title: '经销商',
        dataIndex: 'business',
        key: 'business'
      }, {
        title: '经销商区域',
        dataIndex: 'business_area',
        key: 'business_area'
      }, {
        title: '产品总价',
        dataIndex: 'price',
        key: 'price'
      }, {
        title: '实付金额',
        dataIndex: 'pay_price',
        key: 'pay_price'
      }, {
        title: '返点金额',
        dataIndex: 'rebate_price',
        key: 'rebate_price'
      }, {
        title: '手续费',
        dataIndex: 'charge',
        key: 'charge'
      }, {
        title: '支付方式',
        dataIndex: 'pay_type',
        key: 'pay_type'
      }, {
        title: '生成时间',
        dataIndex: 'add_time',
        key: 'add_time'
      }, {
        title: '支付时间',
        dataIndex: 'pay_time',
        key: 'pay_time'
      }, {
        title: '确认收货时间',
        dataIndex: 'shipping_time',
        key: 'shipping_time'
      }
    ],
    settlePayDetail: [
      {
        title: '交易流水号',
        dataIndex: 'trade_no',
        key: 'trade_no'
      }, {
        title: '经销商编号',
        dataIndex: 'business_id',
        key: 'business_id'
      }, {
        title: '经销商',
        dataIndex: 'business_name',
        key: 'business_name'
      }, {
        title: '经销商区域',
        dataIndex: 'area_code',
        key: 'area_code'
      }, {
        title: '实际待结算',
        dataIndex: 'actual_stay_settle',
        key: 'actual_stay_settle'
      }, {
        title: '实际结算',
        dataIndex: 'actual_settle',
        key: 'actual_settle'
      }, {
        title: '手续费',
        dataIndex: 'service_charge',
        key: 'service_charge'
      }, {
        title: '剩余待结算',
        dataIndex: 'remain_settle',
        key: 'remain_settle'
      }, {
        title: '结算方式',
        dataIndex: 'settle_type',
        key: 'settle_type'
      }, {
        title: '结算时间',
        dataIndex: 'settle_time',
        key: 'settle_time'
      }
    ]
  }
};
