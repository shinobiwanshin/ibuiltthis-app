export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t py-6 mt-8">
      <div className="wrapper mx-auto text-center text-sm text-gray-500">
        © {year} iBuiltThis Inc. All rights reserved.
      </div>
    </footer>
  );
}
