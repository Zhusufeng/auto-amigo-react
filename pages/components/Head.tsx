import Head from "next/head";

type Props = {
  title: string;
};

export default function MainHead({ title }: Props) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content="Auto Amigo" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
