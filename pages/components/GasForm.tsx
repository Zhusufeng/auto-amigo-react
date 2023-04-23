import { useSession } from "next-auth/react";
import axios from "axios";
import { Form, Button, Input } from "antd";

type Props = {
  getData: () => void;
};

type FormValues = {
  previousMileage: string;
  currentMileage: string;
  gallons: string;
  pricePerGallon: string;
};

export default function GasForm(props: Props) {
  const { getData } = props;
  const { data: session } = useSession();
  const [form] = Form.useForm();

  const onSubmit = async (values: FormValues) => {
    const { previousMileage, currentMileage, gallons, pricePerGallon } = values;
    await axios.post("api/gas", {
      userId: session?.user?.userId,
      previousMileage,
      currentMileage,
      gallons,
      pricePerGallon,
    });
    form.resetFields();
    await getData();
  };

  return (
    <Form name="basic" onFinish={onSubmit} form={form}>
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
