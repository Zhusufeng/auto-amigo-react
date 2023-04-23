import { FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Form, Button, Input } from "antd";

type Props = {
  getData: () => void;
};

export default function GasForm(props: Props) {
  const { getData } = props;
  const { data: session } = useSession();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios.post("api/gas", {
      userId: session?.user?.userId,
      previousMileage,
      currentMileage,
      gallons,
      pricePerGallon,
    });
    // Clear form
    await getData();
  };

  return (
    <Form name="basic" onFinish={onSubmit}>
      <Form.Item
        label="Previous Mileage"
        name="previousMileage"
        rules={[
          { required: true, message: "Please input your previous mileage!" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Current Mileage"
        name="currentMileage"
        rules={[
          { required: true, message: "Please input your current mileage!" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Gallons"
        name="gallons"
        rules={[{ required: true, message: "Please input your gallons!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Price Per Gallon"
        name="pricePerGallon"
        rules={[
          { required: true, message: "Please input the price per gallon!" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
