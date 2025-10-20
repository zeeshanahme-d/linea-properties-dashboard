interface Props {
  children: React.ReactNode;
}

function Container({ children }: Props) {
  return <div className={`max-w-screen-4xl px-3 lg:px-5`}>{children}</div>;
}

export default Container;
