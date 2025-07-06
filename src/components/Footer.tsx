const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">Anonymous Feedback System</h3>
            <p className="text-gray-400 text-sm mt-1">
              Making schools better through honest communication
            </p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-400">
              Your privacy is our priority. All submissions are 100% anonymous.
            </p>
            <p className="text-sm text-gray-400 mt-1">
              © {new Date().getFullYear()} School Feedback System
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
};
export default Footer;