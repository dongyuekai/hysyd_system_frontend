import React, { useCallback } from "react";
import { Button, Form, Input, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useNavigate } from 'react-router-dom';
import './update_password.css';
import { updatePasswordAction, updatePasswordCaptcha } from "../../interface/interfaces.ts"; // 修复导入路径

export interface UpdatePasswordInterface {
  username: string;
  email: string;
  captcha: string;
  password: string;
  confirmPassword: string;
}
const layout1 = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
}

export function UpdatePasswordCom() {
  const [form] = useForm();
  const navigate = useNavigate();

  const onFinish = useCallback(async (values: UpdatePasswordInterface) => {
    if (values.password !== values.confirmPassword) {
      return message.error('两次密码不一致');
    }
    const res = await updatePasswordAction(values);

    if (res.status === 201 || res.status === 200) {
      message.success('密码修改成功');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } else {
      message.error(res.data.data || '系统繁忙，请稍后再试');
    }
  }, [navigate])

  const sendCaptcha = useCallback(async () => {
    const address = form.getFieldValue('email');
    if (!address) {
      return message.error('请输入邮箱地址');
    }
    const res = await updatePasswordCaptcha(address);
    if (res.status === 201 || res.status === 200) {
      message.success(res.data.data);
    } else {
      message.error(res.data.data || '系统繁忙，请稍后再试');
    }

  }, [form])

  return (
    <div id='updatePassword-container'>
      <h1>会议室预订系统</h1>
      <Form
        form={form}
        {...layout1}
        onFinish={onFinish}
        colon={false}
        autoComplete="off"
      >
        <Form.Item
          label='用户名'
          name='username'
          rules={[{ required: true, message: '请输入用户名！' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='邮箱'
          name='email'
          rules={[
            { required: true, message: '请输入邮箱！' },
            { type: 'email', message: '请输入正确的邮箱格式！' }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='验证码'
          name='captcha'
          rules={[{ required: true, message: '请输入验证码！' }]}
        >
          <Input />
          <Button type='primary' onClick={sendCaptcha}>发送验证码</Button>
        </Form.Item>
        <Form.Item
          label='密码'
          name='password'
          rules={[{ required: true, message: '请输入新密码！' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label='确认密码'
          name='confirmPassword'
          rules={[{ required: true, message: '请确认密码！' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          {...layout1}
          label=''
        >
          <Button className='btn' type="primary" htmlType="submit">
            修改
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}