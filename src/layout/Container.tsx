type Props = {
  children: React.ReactNode;
};

const Container: React.FC<Props> = ({ children }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex w-full flex-col">
      {children}
    </div>
  );
};

export default Container;
