function CustomErrorMessage({ message }: { message?: string }) {
  if (!message) return <></>;
  return <div className="text-xs text-red-500">{message}</div>;
}

export default CustomErrorMessage;
