function ErrorFallback(err) {
  console.log(err);

  return (
    <p className="flex h-screen items-center justify-center text-3xl">
      Something went wrong.
    </p>
  );
}

export default ErrorFallback;
