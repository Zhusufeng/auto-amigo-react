import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { Form, Button, Input } from "antd";

type FormValues = {
  previousMileage: string;
  currentMileage: string;
  gallons: string;
  pricePerGallon: string;
};

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
};

export default function GasForm() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const [form] = Form.useForm();

  const mutation = useMutation({
    mutationFn: (values: FormValues) => {
      try {
        const { previousMileage, currentMileage, gallons, pricePerGallon } =
          values;
        return axios.post("api/gas", {
          userId: session?.user?.userId,
          previousMileage,
          currentMileage,
          gallons,
          pricePerGallon,
        });
      } catch (mutationError) {
        throw mutationError;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "gasLogData" });
      form.resetFields();
    },
  });

  return (
    <div>
      <div style={{ padding: "0 0 10px 0" }}>
        Keep track of your gas history!
      </div>
      <Form
        name="basic"
        onFinish={vals => {
          mutation.mutate(vals);
        }}
        form={form}
        {...formItemLayout}
        style={{ maxWidth: 600 }}
      >
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
    </div>
  );
}
