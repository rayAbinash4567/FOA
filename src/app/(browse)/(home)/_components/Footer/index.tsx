import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-700 w-full  rounded-m shadow dark:bg-gray-900 ">
      <div className="w-full  mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Pinnacle Partnerships
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link
                href="/about"
                className="hover:underline dark:text-white me-4 md:me-6"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="hover:underline dark:text-white me-4 md:me-6"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/licensing"
                className="hover:underline dark:text-white me-4 md:me-6"
              >
                Licensing
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline dark:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{' '}
          <a
            href="https://flowbite.com/"
            className="hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pinnacle Partnerships
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
