function Container({
  children,
  className = "",
  size = "default",
}) {
  const sizes = {
    default: "max-w-7xl",
    wide: "max-w-[1440px]",
    narrow: "max-w-5xl",
  };

  return (
    <div
      className={`mx-auto w-full ${sizes[size]} px-6 sm:px-8 lg:px-12 xl:px-16 ${className}`}
    >
      {children}
    </div>
  );
}

export default Container;