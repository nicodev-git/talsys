import React from 'react'
import { Link } from 'react-router-dom';
import { Form, Input, DatePicker, Select, Button, Row, Col } from 'antd';

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
      className="mt-4"
    >
      <Form.Item
        label="Document word or phrase"
        name="q"
        className="mb-2"
      >
        {getFieldDecorator('q')(
          <Input />
        )}
      </Form.Item>
      <Form.Item
        label="Company name, CIK number or individual's name"
        name="entityName"
        className="mb-2"
      >
        {getFieldDecorator('entityName')(
          <Input />
        )}
      </Form.Item>
      <Form.Item
        label="Filed Date Range"
        name="daterange"
        className="mb-2"
      >
        {getFieldDecorator('daterange')(
          <DatePicker.RangePicker />
        )}
      </Form.Item>

      <Form.Item
        label="Location"
        name="location"
        className="mb-2"
      >
        {getFieldDecorator('location')(
          <Input />
        )}
      </Form.Item>
      
      <Row className="mt-4">
        <Col lg={12}>
          <Form.Item >
            <Button type="primary" htmlType="submit" icon="search">
              Search
            </Button>
            <Button type="secondary" htmlType="button" className="ml-3" onClick={() => clearForm()}>
              Clear
            </Button>
          </Form.Item>
        </Col>
        <Col lg={12} className="text-right">
          <Form.Item >
            <Button type="secondary" htmlType="button">
              Save Filter
            </Button>
          </Form.Item>
        </Col>
      </Row>
      
    </Form>
	)
}

export default Form.create({ name: 'FilterForm' })(FilterForm);