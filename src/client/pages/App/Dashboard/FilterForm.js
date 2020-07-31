import React from 'react'
import { Link } from 'react-router-dom';
import { Form, Input, DatePicker, Select, Button } from 'antd';


const FilterForm = (props) => {

	const onhandleSubmit = (e) => {
		e.preventDefault();
	    props.form.validateFields((err, values) => {
	      if (!err) {
	        props.callback(values)
	      }
	    });
	}

	const { getFieldDecorator } = props.form;

	return(
		<Form
      name="basic"
      onSubmit={onhandleSubmit}
      className="mt-4"
    >
      <Form.Item
        label="Company Name, CIK, SIC"
        name="company"
        className="mb-2"
      >
      	{getFieldDecorator('company')(
        	<Input />
        )}
      </Form.Item>
      <Form.Item
        label="Filed Date Range"
        name="username"
        className="mb-2"
      >
        {getFieldDecorator('date')(
          <DatePicker.RangePicker />
        )}
      </Form.Item>
      <Form.Item
        label="Person"
        name="person"
        className="mb-2"
      >
      	{getFieldDecorator('person')(
        	<Input />
        )}
      </Form.Item>
      <Form.Item
        label="Location"
        name="username"
        className="mb-2"
      >
      	{getFieldDecorator('location')(
        	<Input />
        )}
      </Form.Item>
      
      <Form.Item
        label="Position"
        name="username"
        className="mb-2"
      >
      	{getFieldDecorator('position')(
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Please select"
            initialValue={['cto', 'ceo']}
          >
            <Select.Option key="ceo">CEO</Select.Option>
            <Select.Option key="cto">CFO</Select.Option>
            <Select.Option key="cfo">CTO</Select.Option>
            <Select.Option key="co">CEO</Select.Option>
          </Select>
       )}
      </Form.Item>
      <Form.Item className="mt-4">
      	<Button type="secondary" htmlType="button" className="mr-3">
        	Save Filter
      	</Button>
      	<Button type="primary" htmlType="submit" icon="search">
        	Search
      	</Button>
      </Form.Item>
    </Form>
	)
}

export default Form.create({ name: 'FilterForm' })(FilterForm);