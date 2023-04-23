import React from "react";
import { Layout } from "antd";
import NavBar from "./NavBar";
const { Header, Footer, Content } = Layout;

const layoutStyle: React.CSSProperties = {
  height: "100vh",
  width: "100%",
};

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
};

const contentStyle: React.CSSProperties = {
  minHeight: 120,
  padding: "20px",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  height: 64,
};

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>
        <NavBar />
      </Header>
      <Content style={contentStyle}>{children}</Content>
      <Footer style={footerStyle}>Insert Footer Here</Footer>
    </Layout>
  );
};

export default MainLayout;
