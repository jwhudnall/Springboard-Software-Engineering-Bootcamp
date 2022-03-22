const Alert = ({ variant = "success", children }) => {
  const colors = {
    success: "green",
    danger: "red",
    caution: "yellow"
  };
  return (
    <div style={{ border: "1px solid purple", backgroundColor: colors[variant] }}>{children}</div>
  );
};

export default Alert;
