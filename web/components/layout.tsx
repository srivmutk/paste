interface LayoutProps {
  children: React.ReactNode;
}

export default function Navbar({ children }: LayoutProps) {
  return (
    <>
      <div className="py-10 flex flex-col items-center pr-20 pl-20 pb-80 mb-96">
        {children}
      </div>
    </>
  );
}
