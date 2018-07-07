import withRouter from 'umi/withRouter';
import BasicLayout from './BasicLayout';
import {LocaleProvider} from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'

export default withRouter((props) => {
  return (
    <LocaleProvider locale={zh_CN}>
      <BasicLayout>
        {props.children}
      </BasicLayout>
    </LocaleProvider>
  )
})
