import React from 'react'
import { Link } from 'react-router-dom';
import { Form, Input, DatePicker, Select, Button, Row, Col} from 'antd';

const FilterForm = (props) => {

	const onhandleSubmit = (e) => {
		e.preventDefault();
	    props.form.validateFields((err, values) => {
	      if (!err) {
	        props.callback(values)
	      }
	    });
	}


  const clearForm = () => {
    props.form.resetFields()
    props.callback({clear: true})
  }

	const { getFieldDecorator } = props.form;

	return(
		<Form
      name="basic"
      onSubmit={onhandleSubmit}
      className="mt-4 filter-form"
    >
      <Form.Item
        label="Document word or phrase"
        name="q"
        className="mb-2"
      >
        {getFieldDecorator('q')(
          <Input size="large"/>
        )}
      </Form.Item>
      <hr className="mb-1"/>
      <Form.Item
        label="Company name, CIK or individual's name"
        name="entityName"
        className="mb-2"
      >
        {getFieldDecorator('entityName')(
          <Input size="large"/>
        )}
      </Form.Item>
      <hr className="mb-1"/>
      <Form.Item
        label="Filed Date Range"
        name="daterange"
        className="mb-2"
      >
        {getFieldDecorator('daterange')(
          <DatePicker.RangePicker size="large"/>
        )}
      </Form.Item>
      
      <Row className="mt-4">
        <Col lg={24}>
          <Form.Item className="mb-0">
            <Button type="primary" shape="round" block htmlType="submit" style={{height: 45, fontSize: 16}}>
              Apply Filters & Search
            </Button>
            
          </Form.Item>
          <Form.Item className="text-center">
            <Button shape="link" htmlType="button" className="mx-auto" style={{height: 4, fontSize: 12}} onClick={() => clearForm()}>
              <u>Clear all Filter</u>
            </Button>
          </Form.Item>
        </Col>
      </Row>
      
    </Form>
	)
}

export default Form.create({ name: 'FilterForm' })(FilterForm);